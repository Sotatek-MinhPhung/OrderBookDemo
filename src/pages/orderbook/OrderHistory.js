import { InputLabel, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import { getAllSymbols } from '../../components/chart/datafeed';
import './OrderHistory.css';

const OrderHistory = () => {
    const [symData, setSymData] = useState([]);
    const [propSymbol, setPropSymbol] = useState("BTC/USDT");

    const initSym = async () => {
        const symbols = await getAllSymbols()
        setSymData(symbols)
    }

    useEffect(() => {
        if (symData.length == 0) {
            initSym();
        }
    })

    const handleOnChange = (event) => {
        setPropSymbol(event.target.innerText)
	}
    return (
        <div className="container">
                <div className="row toolbar">
                    <div className="col-4">
                        <Autocomplete
                            id="symbolAutoComplete"
                            options={symData}
                            getOptionLabel={(option) => option.full_name}
                            renderInput={(params) => <TextField {...params} label="Symbol:" variant="outlined" />}
                            onChange={(event) => handleOnChange(event)}
                        />
                    </div>
                    <div className="col-4">
                    </div>
                    <div className="col-4">
                    </div>
                </div>
            <Chart theme="light" containerId="tv_chart_container" symbol={propSymbol}/>
        </div>
    )
}
export default OrderHistory;