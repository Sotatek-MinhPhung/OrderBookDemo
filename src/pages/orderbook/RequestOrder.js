import React, {useState} from 'react'
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

const RequestOrder = () => {
    const [coin1, setCoin1] = useState('')
    const [amount, setAmount] = useState(0)
    const [coin2, setCoin2] = useState('')
    const [price, setPrice] = useState(0)

    const handleCoin1Change = event => {
        setCoin1(event.target.value)
    }
    const handleAmountChange = event => {
        setAmount(event.target.value)
    }
    const handleCoin2Change = event => {
        setCoin2(event.target.value)
    }
    const handlePriceChange = event => {
        setPrice(event.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(coin1 + " - " + amount + " - " + coin2 + " - " + price)
        await approve()
        await signOrder()
    }

    // TODO: Sign order
    const signOrder = async () => {
        console.log("signOrder")
    }

    // TODO: Approve
    const approve = async () => {
        console.log("approve")
    }

    return (
        <>
            <div className="container order_table d-block mt-5 bg-light rounded-3">
                <div className="p-4">
                    <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row justify-content-center">
                            <div>
                                <FormGroup className="m-3">
                                    <Label for="coin1">Coin 1: </Label>
                                    <Input type="select" name="coin1" id="coin1" onChange={handleCoin1Change}>
                                        <option value={null}>Chose Your Coin</option>
                                        <option value="BTC">BTC</option>
                                        <option value="ETH">ETH</option>
                                        <option value="DOGE">DOGE</option>
                                    </Input>
                                </FormGroup>

                                <FormGroup className="m-3">
                                    <Label for="number">Amount: </Label>
                                    <Input type="number" name="amount" id="amount" placeholder="Amount" onChange={handleAmountChange}/>
                                </FormGroup>
                            </div>

                            <div>
                                <FormGroup className="m-3">
                                    <Label htmlFor="coin2">Coin 2:</Label>
                                    <Input type="select" name="coin2" id="coin2" onChange={handleCoin2Change}>
                                        <option value={null}>Chose Your Coin</option>
                                        <option value="BTC">BTC</option>
                                        <option value="ETH">ETH</option>
                                        <option value="DOGE">DOGE</option>
                                    </Input>
                                </FormGroup>

                                <FormGroup className="m-3">
                                    <Label htmlFor="amount">Price: </Label>
                                    <Input type="number" name="price" id="price" placeholder="Price" onChange={handlePriceChange}/>
                                </FormGroup>
                            </div>
                        </div>

                        <Button className="m-3" type="submit" onClick={handleSubmit}>Buy</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default RequestOrder