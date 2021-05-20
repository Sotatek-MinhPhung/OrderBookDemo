import React, {useState} from 'react'
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {signatureUtils, generatePseudoRandomSalt} from "@0x/order-utils";
import {MetamaskSubprovider} from "@0x/subproviders";
import axios from "axios";
import {sendOrderWithSignature} from "../../api/OrderApi";
import { BigNumber } from "@0x/utils";
import {Web3Wrapper} from "@0x/web3-wrapper";

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000"
const ZERO_VALUE = new BigNumber(0)
const TEN_MINUTES_MS = 10*60*1000
const ONE_SECOND_MS = 1000
const DECIMALS = 18

const RequestOrder = () => {
    const [token1, setToken1] = useState('')
    const [amountToken1, setAmountToken1] = useState(0)
    const [token2, setToken2] = useState('')
    const [amountToken2, setAmountToken2] = useState(0)

    const handleToken1Change = event => {
        setToken1(event.target.value)
    }
    const handleAmountToken1Change = event => {
        setAmountToken1(event.target.value)
    }
    const handleToken2Change = event => {
        setToken2(event.target.value)
    }
    const handleAmountToken2Change = event => {
        setAmountToken2(event.target.value)
    }

    const signOrder = async (config) => {
        const order = {
            chainId: parseInt(config.chainId),
            exchangeAddress: config.exchangeAddress,
            makerAddress: localStorage.currentAccount,
            takerAddress: NULL_ADDRESS,
            feeRecipientAddress: NULL_ADDRESS,
            senderAddress: NULL_ADDRESS,
            makerAssetAmount: Web3Wrapper.toBaseUnitAmount(new BigNumber(amountToken1), DECIMALS),
            takerAssetAmount: Web3Wrapper.toBaseUnitAmount(new BigNumber(amountToken2), DECIMALS),
            makerFee: ZERO_VALUE,
            takerFee: ZERO_VALUE,
            expirationTimeSeconds: new BigNumber(Date.now() + TEN_MINUTES_MS).div(ONE_SECOND_MS).integerValue(BigNumber.ROUND_CEIL),
            salt: generatePseudoRandomSalt(),
            makerAssetData: config.key1AssetData,
            takerAssetData: config.key2AssetData,
            makerFeeAssetData: '0x',
            takerFeeAssetData: '0x'
        }

        return await signatureUtils.ecSignOrderAsync(
            new MetamaskSubprovider(window.web3.currentProvider),
            order,
            localStorage.currentAccount
        )
    }

    const approve = async (config) => {
        // ERC20 Proxy
        const spender = "0x3880ef725db203c2ebebf432cdf3db2e243c479d"

        if (window.web3.eth) {
            const contract = new window.web3.eth.Contract(config.key1ABI, config.key1Address)
            console.log(await contract.methods.approve(spender, Web3Wrapper.toBaseUnitAmount(new BigNumber(amountToken1), DECIMALS))
                .send({from: localStorage.currentAccount}))
        } else {
            console.log("Not connected")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(token1 + " - " + amountToken1 + " - " + token2 + " - " + amountToken2)
        // get config value
        const config = await axios.get(`http://192.168.1.208:5000/config?key1=${token1}&key2=${token2}`)
        // log config data
        console.log(config.data)
        // approve
        await approve(config.data)
        // sign order and get order with signature
        const orderWithSignature = await signOrder(config.data)
        // Add 2 more values
        orderWithSignature.fromToken = token1
        orderWithSignature.toToken = token2

        // console.log(await sendOrderWithSignature(orderWithSignature))
        console.log(orderWithSignature)
    }

    return (
        <>
            <div className="container order_table d-block mt-5 bg-light rounded-3">
                <div className="p-4">
                    <Form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row justify-content-center">
                            <div>
                                <FormGroup className="m-3">
                                    <Label for="token1">Token 1: </Label>
                                    <Input type="select" name="token1" id="token1" onChange={handleToken1Change}>
                                        <option value={null}>Chose Your Token</option>
                                        <option value="btc">BTC</option>
                                        <option value="eth">ETH</option>
                                        <option value="doge">DOGE</option>
                                        <option value="zrx">ZRX</option>
                                        <option value="hat">HAT</option>
                                    </Input>
                                </FormGroup>

                                <FormGroup className="m-3">
                                    <Label for="number">Amount Token 1: </Label>
                                    <Input type="number" name="amountToken1" id="amountToken1" placeholder="Amount"
                                           onChange={handleAmountToken1Change}/>
                                </FormGroup>
                            </div>

                            <div>
                                <FormGroup className="m-3">
                                    <Label htmlFor="token2">Token 2:</Label>
                                    <Input type="select" name="token2" id="token2" onChange={handleToken2Change}>
                                        <option value={null}>Chose Your Token</option>
                                        <option value="btc">BTC</option>
                                        <option value="eth">ETH</option>
                                        <option value="doge">DOGE</option>
                                        <option value="zrx">ZRX</option>
                                        <option value="hat">HAT</option>
                                    </Input>
                                </FormGroup>

                                <FormGroup className="m-3">
                                    <Label htmlFor="amountToken2">Amount Token 2: </Label>
                                    <Input type="number" name="amountToken2" id="amountToken2" placeholder="Amount"
                                           onChange={handleAmountToken2Change}/>
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