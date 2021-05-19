import React, {useEffect, useState} from "react"
import {Button} from "reactstrap"
import Web3 from "web3";

// TODO: Using store to check connected
const Connect = () => {
    const [accounts, setAccounts] = useState([])

    // store web3
    const connect = async () => {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert("Non-Ethereum browser detected!")
        }

        checkConnected()
    }

    // use store to check connected
    const checkConnected = async () => {
        if(window.web3.eth) {
            setAccounts(await window.ethereum.request({ method: 'eth_requestAccounts' }))
        }
    }

    useEffect(() => {
        checkConnected()
    }, [])

    return (
        <>
            {
                accounts[0] ?
                    <p className="py-2 mb-0 fw-bold">{accounts[0]}</p> :
                    <Button onClick={connect}>Connect with MetaMask</Button>
            }
        </>
    )
}

export default Connect