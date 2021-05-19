import React, {useEffect, useState} from "react"
import {Button} from "reactstrap"
import store from "../store/store";
import connectAction from "../store/action/connectAction";
import selectAccounts from "../store/selector/selectAccounts";
import {generatePseudoRandomSalt} from "@0x/order-utils";

const Connect = () => {
    const [account, setAccount] = useState()

    const connect = async () => {
        await store.dispatch(connectAction())
        const accounts = await selectAccounts()
        setAccount(accounts[0])
    }

    const print = async () => {
        console.log(await selectAccounts())
    }

    useEffect(() => {
        connect()
    })

    return (
        <>
            {
                account ?
                    <p className="py-2 mb-0 fw-bold">{account}</p> :
                    <Button onClick={connect}>Connect with MetaMask</Button>
            }
        </>
    )
}

export default Connect