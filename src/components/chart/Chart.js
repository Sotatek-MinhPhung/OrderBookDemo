import * as React from 'react';
import { widget } from '../../charting_library/charting_library.min';
import Datafeed from './datafeed';


function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
class Chart extends React.Component {
	constructor(props) {super()}

	tvWidget = null;
	componentDidUpdate() {
		const widgetOptions = {
			symbol: this.props.symbol,
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings', 'header_symbol_search'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			theme: this.props.theme,
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;

		tvWidget.onChartReady(() => {
			console.log('Chart has loaded!')
			
		});
	}
	componentWillUnmount() {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

    render() {
        return(
			<div id={ this.props.containerId } className={ 'Chart' }></div>
        )
    }
}

Chart.defaultProps = {
	symbol:'BTC/USDT',
	interval: '1',
	containerId: 'tv_chart_container',
	datafeedUrl: 'https://api.binance.com/api',
	libraryPath: '../../charting_library/',
	// chartsStorageUrl: 'https://saveload.tradingview.com',
	chartsStorageApiVersion: '1.1',
	clientId: 'tradingview.com',
	userId: 'public_user_id',
	fullscreen: true,
	autosize: true,
	studiesOverrides: {},
	theme: "light"
}
export default Chart;