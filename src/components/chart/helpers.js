// Make requests to CryptoCompare API
export async function makeApiRequest(path) {
	try {
		let response = await fetch(`https://api.binance.com/api/${path}`);
		return response.json();
	} catch (error) {
		throw new Error(`request error: ${error.status}`);
	}
}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
	return {
		symbol: fromSymbol,
		full_name: `${fromSymbol}/${toSymbol}`,
		description: `${fromSymbol}/${toSymbol}`,
		exchange: exchange,
		ticker: `${fromSymbol}/${toSymbol}`,
		type: 'stock'
	};
}

export function parseFullSymbol(fullSymbol) {
	const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
	if (!match) {
		return null;
	}

	return {
		exchange: match[1],
		fromSymbol: match[2],
		toSymbol: match[3],
	};
}
