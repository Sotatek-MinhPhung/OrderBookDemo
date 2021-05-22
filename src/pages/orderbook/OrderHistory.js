import React, { useEffect, useState } from "react"
import DataTable from "react-data-table-component";

import Chart from "../../components/chart/Chart";
const OrderHistory = () => {
    const [pageSize, setPageSize] = useState(5);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // useEffect(() => {
    //     // fetch("http://10.2.14.46:3000/list-order")
    //     fetch('http://localhost:3000/order/list', {
    //         method: 'post',
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //             "pageSize": 20,
    //             "pageNumber": 1,
    //             "sortField": "id",
    //             "sortDirection": "DESC"
    //         }),
    //         credentials: "same-origin"
    //     })
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             setIsLoaded(true);
    //             setItems(result.data.orderResponses);
    //             console.log(">>>>>>>>>> result" + result.data.orderResponses);
    //         },
    //         (error) => {
    //             setIsLoaded(true);
    //             setError(error);
    //         }
    //     )
    // }, [items]);

    const columns = [
        {
            name: 'id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Taker Address',
            selector: 'takerAddress',
            sortable: true,
        },
        {
            name: 'Maker Address',
            selector: 'makerAddress',
            sortable: true,
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
        },
      ];

    const customStyles = {
        rows: {
                style: {
                minHeight: '50px', // override the row height
                background: '#669999'
            }
        },
        headCells: {
                style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                background: '#000066'
            },
        },
        cells: {
                style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };
    // if (error) {
    //     return <div>Error: {error.message}</div>
    // } else if (!isLoaded) {
    //     return <div>Loading...</div>
    // } else {
        return (
            <div className="container">
                {/* <DataTable
                    columns={columns}
                    data={items}
                    customStyles={customStyles}
                    pagination={true}
                    paginationRowsPerPageOptions={[2,5,10]}
                /> */}
                <Chart theme="light" containerId="tv_chart_container"/>
            </div>
        )
    // }
}

export default OrderHistory