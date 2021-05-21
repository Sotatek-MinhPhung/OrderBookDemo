import * as React from 'react';
import {widget} from '../../charting_library/charting_library.min';
import Datafeed from './datafeed';

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class Chart extends React.Component {
	tvWidget = null;

	INTERVAL = {
		MINUTE: '1',
		MINUTES_5: '5',
		MINUTES_15: '15',
		MINUTES_30: '30',
		HOUR: '60',
		HOURS_3: '180',
		HOURS_6: '360',
		HOURS_12: '720',
		DAY: 'D',
		WEEK: 'W',
	  }
	  
	TIME_FRAMES = [
		{ text: '3y', resolution: INTERVAL.WEEK, description: '3 Years' },
		{ text: '1y', resolution: INTERVAL.DAY, description: '1 Year' },
		{ text: '3m', resolution: INTERVAL.HOURS_12, description: '3 Months' },
		{ text: '1m', resolution: INTERVAL.HOURS_6, description: '1 Month' },
		{ text: '7d', resolution: INTERVAL.HOUR, description: '7 Days' },
		{ text: '3d', resolution: INTERVAL.MINUTES_30, description: '3 Days' },
		{ text: '1d', resolution: INTERVAL.MINUTES_15, description: '1 Day' },
		{ text: '6h', resolution: INTERVAL.MINUTES_5, description: '6 Hours' },
		{ text: '1h', resolution: INTERVAL.MINUTE, description: '1 Hour' },
	  ]

	componentDidMount() {
		const widgetOptions = {
			symbol: this.props.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			time_frames:TIME_FRAMES,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			theme: this.props.theme
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
            <div id={ this.props.containerId } className={ 'TVChartContainer' }></div>
        )
    }
}

Chart.defaultProps = {
	symbol:'BTC/USD',
	interval: '1',
	containerId: 'tv_chart_container',
	datafeedUrl: 'https://demo_feed.tradingview.com',
	libraryPath: '../../charting_library/',
	chartsStorageUrl: 'https://saveload.tradingview.com',
	chartsStorageApiVersion: '1.1',
	clientId: 'tradingview.com',
	userId: 'public_user_id',
	fullscreen: true,
	height: 80,
	autosize: true,
	studiesOverrides: {},
	theme: "dark"
}
export default Chart;