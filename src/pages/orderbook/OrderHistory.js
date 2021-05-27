import React from "react";
import Chart from "../../components/chart/Chart";
import './OrderHistory.css';
import {getAllSymbols} from '../../components/chart/datafeed';
import {Select, Button, InputLabel, MenuItem, TextField} from '@material-ui/core';

class OrderHistory extends React.Component {
    
	constructor(props) {
		super();
		this.state = {
			symData: [],
			propSymbol: "BTC/USDT"
		}
	}

    async getSymbol() {
        this.setState({
			symData: await getAllSymbols()
		})
    }

    componentDidMount() {
        this.getSymbol();
    }

    handleOnChange(event) {
		this.setState({
			propSymbol: event.target.value
		})
        console.log(this.state.propSymbol);
	}
    render() {
        return (
            <div className="container">
                    <div className="row toolbar">
                        <div className="col-4">
                            <InputLabel id="label">Symbol:</InputLabel>
                            <Select name="symbol" id="symbol" defaultValue="" onChange={(event) => this.handleOnChange(event)}>
                                {this.state.symData.map((item, i) => {
                                    return (<MenuItem value={item.full_name}>{item.full_name}</MenuItem>)
                                })}
                            </Select>
                        </div>
                        <div className="col-4">
                            <Select />
                        </div>
                        <div className="col-4">
                            <Button />
                        </div>
                    </div>
                <Chart theme="light" containerId="tv_chart_container" symbol={this.state.propSymbol}/>
            </div>
        )
    }
}
export default OrderHistory;