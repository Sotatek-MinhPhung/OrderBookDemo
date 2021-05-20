import React, {useState} from 'react'
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {signatureUtils} from "@0x/order-utils";
import {MetamaskSubprovider} from "@0x/subproviders";
import zrxAbi from "../../abis/zrxAbi.json"
import {sendOrderWithSignature} from "../../api/OrderApi";

const zrxAddress = "0x5a1830Ebe15f422C1A9dFC04e2C7ad496cecA12a"

// TODO: remove all console.log
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
    }

    const signOrder = async () => {
        const takerAddress = "0x041E7912541745A67F8c652a6bEe3CBAd131481d"

        // TODO: replace fixed order with inserted value
        const order = {
            chainId: 15,
            exchangeAddress: '0x198805e9682fceec29413059b68550f92868c129',
            makerAddress: '0x041E7912541745A67F8c652a6bEe3CBAd131481d',
            takerAddress: takerAddress,
            feeRecipientAddress: '0x0000000000000000000000000000000000000000',
            senderAddress: '0x0000000000000000000000000000000000000000',
            makerAssetAmount: 1000000000000000000,
            takerAssetAmount: 2000000000000000000,
            makerFee: 0,
            takerFee: 0,
            expirationTimeSeconds: 1621227432,
            salt: 58607550732964590110595439505801883021839261307660472970772029207960142953111,
            makerAssetData: '0xf47261b00000000000000000000000008ad3aa5d5ff084307d28c8f514d7a193b2bfe725',
            takerAssetData: '0xf47261b00000000000000000000000008080c7e4b81ecf23aa6f877cfbfd9b0c228c6ffa',
            makerFeeAssetData: '0x',
            takerFeeAssetData: '0x'
        }

        return await signatureUtils.ecSignOrderAsync(
            new MetamaskSubprovider(window.web3.currentProvider),
            order,
            // get from accounts
            "0x041E7912541745A67F8c652a6bEe3CBAd131481d"
        )
    }

    const approve = async () => {
        console.log("approve")
        let contract
        const spender = "0xeCE39b520C0d8B5Baa74819a42b87778B77B6B1f"

        if (window.web3.eth) {
            contract = new window.web3.eth.Contract(zrxAbi, zrxAddress)
            // TODO: set value
            console.log(await contract.methods.approve(spender, "100000000000")
                .send({from: "0x041E7912541745A67F8c652a6bEe3CBAd131481d"}))
        } else {
            // TODO: resolve this case
            console.log("Not connected")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(coin1 + " - " + amount + " - " + coin2 + " - " + price)
        await approve()
        const orderWithSignature = await signOrder()
        orderWithSignature.fromToken = coin1
        orderWithSignature.toToken = coin2

        //// with base axios
        // console.log((await axios.post("http://10.2.40.240:3000/order", orderWithSignature)).data)

        console.log(await sendOrderWithSignature(orderWithSignature))
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
                                    <Input type="number" name="amount" id="amount" placeholder="Amount"
                                           onChange={handleAmountChange}/>
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
                                    <Input type="number" name="price" id="price" placeholder="Price"
                                           onChange={handlePriceChange}/>
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