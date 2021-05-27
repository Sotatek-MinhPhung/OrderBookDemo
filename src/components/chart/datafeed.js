import { w3cwebsocket as W3CWebsocket } from 'websocket';
import {
	generateSymbol, makeApiRequest
} from './helpers.js';
const BASE_SOCKET = "wss://stream.binance.com:9443/ws/";

const channelToSubscription = new Map();

const lastBarsCache = new Map();

const configurationData = {
	supports_search: true,
    supports_marks: true,
    exchanges: [
        {value: "", name: "All Exchanges", desc: ""},
        {value: "XETRA", name: "XETRA", desc: "XETRA"},
        {value: "NSE", name: "NSE", desc: "NSE"}
    ],
    symbols_types: [
        {name: "All types", value: ""},
        {name: "Stock", value: "stock"},
        {name: "Index", value: "index"}
    ],
    supported_resolutions: [ "1", "3", "5", "15", "30", "60", "1D", "2D", "3D", "1W", "3W", "1M", '6M' ]
}
function convertResolution(resolution) {
	let interval = {
		'1': '1m',
		'3': '3m',
		'5': '5m',
		'15': '15m',
		'30': '30m',
		'60': '1h',
		'120': '2h',
		'240': '4h',
		'360': '6h',
		'480': '8h',
		'720': '12h',
		'D': '1d',
		'1D': '1d',
		'3D': '3d',
		'W': '1w',
		'1W': '1w',
		'M': '1M',
		'1M': '1M',
	}[resolution];
	return interval;
}

export async function getAllSymbols() {
	const data = await makeApiRequest('v3/exchangeInfo');
	let allSymbols = [];

	data.symbols.map((symbol) => {
		const symbolAfterGenerate = generateSymbol(symbol.symbol, symbol.baseAsset, symbol.quoteAsset);
		allSymbols.push(symbolAfterGenerate);
	})
	return allSymbols;
}

export default {
	onReady: (callback) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
	},

	searchSymbols: async (
		userInput,
		exchange,
		symbolType,
		onResultReadyCallback,
	) => {
		console.log('[searchSymbols]: Method call');
		const symbols = await getAllSymbols();
		const newSymbols = symbols.filter(symbol => symbol.full_name.includes(userInput));
		onResultReadyCallback(newSymbols);
	},

	resolveSymbol: async (
		symbolName,
		onSymbolResolvedCallback,
		onResolveErrorCallback,
	) => {
		console.log('[resolveSymbol]: Method call', symbolName);
		const symbols = await getAllSymbols();
		const symbolItem = symbols.find(sym => sym.full_name === symbolName);
		if (!symbolItem) {
			console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
			onResolveErrorCallback('cannot resolve symbol');
			return;
		}
		const symbolInfo = {
			ticker: symbolItem.ticker,
			name: symbolItem.full_name,
			description: symbolItem.description,
			type: symbolItem.type,
			session: '24x7',
			timezone: 'Etc/UTC',
			exchange: symbolItem.exchange,
			minmov: 1,
			pricescale: 1000,
			has_intraday: true,
			has_no_volume: true,
			has_weekly_and_monthly: true,
      		intraday_multipliers: ['1', '60'],
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: 0
		};
		console.log('[resolveSymbol]: Symbol resolved', symbolName);
		onSymbolResolvedCallback(symbolInfo);
	},

	getBars: async (symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
		console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
		const interval = convertResolution(resolution);
		let urlParameters = {}
		if (to*1000 >= Date.now()) {
			urlParameters = {
				symbol: symbolInfo.exchange,
				interval: interval
			}
		} else {
			urlParameters = {
				symbol: symbolInfo.exchange,
				interval: interval,
				startTime: from*1000,
				endTime: to*1000,
				limit: 1000,
			}
		}
		const query = Object.keys(urlParameters)
			.map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
			.join('&');
		try {
      		const url = 'v3/klines';
			const data = await makeApiRequest(`${url}?${query}`);
			if (data.length === 0) {
				// "noData" should be set if there is no data in the requested period.
				onHistoryCallback([], {
					noData: true,
				});
				return;
			}
			let bars = [];
			data.forEach(bar => {
				var time = bar[0]/1000;
				if (time >= from && time <= to) {
					bars = [...bars, {
						time: bar[0],
						close: parseFloat(bar[4]),
						open: parseFloat(bar[1]),
						high: parseFloat(bar[2]),
						low: parseFloat(bar[3]),
					}];
				}
			});
			if (firstDataRequest) {
				lastBarsCache.clear();
				lastBarsCache.set(symbolInfo.full_name, {
					...bars[bars.length - 1],
				});
			}
			console.log(`[getBars]: returned ${bars.length} bar(s)`);

			onHistoryCallback(bars, {nonData: true});
		} catch (error) {
			console.log('[getBars]: Get error', error);
			onErrorCallback(error);
		}
	},

	subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscribeUID,
		onResetCacheNeededCallback,
	) => {
		console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
		const interval = convertResolution(resolution);
		if (channelToSubscription.has(subscribeUID)) {
			console.log("[subscribeBars]: Check subscribeUID")
		}
		const socket = new W3CWebsocket(`${BASE_SOCKET}${symbolInfo.exchange.toLowerCase()}@kline_${interval}`);
		socket.onopen = () => {
			console.log('[socket] Connected');
		}
		socket.onmessage = (data) => {
			let message = JSON.parse(data.data);
			let candlestick = message.k;
			console.log(message)
			console.log(candlestick)
			onRealtimeCallback({
					time: message.E,
					open: parseFloat(candlestick.o),
					high: parseFloat(candlestick.h),
					low: parseFloat(candlestick.l),
					close: parseFloat(candlestick.c)
				});
		}
	},

	unsubscribeBars: (subscriberUID) => {
		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		// unsubscribeFromStream(subscriberUID);
	}
}

