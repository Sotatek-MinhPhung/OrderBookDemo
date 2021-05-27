import {useState, useEffect} from 'react';
import { widget } from '../../charting_library/charting_library.min';
import Datafeed from './datafeed';


function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
const Chart = (props) => {

	useEffect(() => {
		const widgetOptions = {
			symbol: props.symbol,
			datafeed: Datafeed,
			interval: props.interval,
			container_id: props.containerId,
			library_path: props.libraryPath,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings', 'header_symbol_search'],
			enabled_features: ['study_templates'],
			charts_storage_url: props.chartsStorageUrl,
			charts_storage_api_version: props.chartsStorageApiVersion,
			client_id: props.clientId,
			user_id: props.userId,
			fullscreen: props.fullscreen,
			autosize: props.autosize,
			studies_overrides: props.studiesOverrides,
			theme: props.theme,
		};

		const tvWidget = new widget(widgetOptions);
		return () => {
			tvWidget.onChartReady(() => {
				console.log('Chart has loaded!')
				
			});
		}
	}, [props])
	return(
		<div id={ props.containerId } className={ 'Chart' }></div>
	)
}

Chart.defaultProps = {
	symbol:'BTC/USDT',
	interval: '1',
	containerId: 'tv_chart_container',
	datafeedUrl: 'https://api.binance.com/api',
	libraryPath: '../../charting_library/',
	chartsStorageApiVersion: '1.1',
	clientId: 'tradingview.com',
	userId: 'public_user_id',
	fullscreen: true,
	autosize: true,
	studiesOverrides: {},
	theme: "light"
}
export default Chart;