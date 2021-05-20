import React, {useEffect, useState} from "react"
import {Button} from "reactstrap"
import Web3 from "web3";

const Connect = () => {
    const [account, setAccount] = useState(localStorage.curentAccount)
    const [isConnected, setIsConnected] = useState(false)

    const connect = async () => {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            // set account
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            localStorage.setItem("currentAccount", accounts[0])
            setAccount(accounts[0])
            setIsConnected(true)
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            // set account
            const accounts = window.web3.eth.getAccounts()
            localStorage.setItem("currentAccount", accounts[0])
            setAccount(accounts[0])
            setIsConnected(true)
        } else {
            window.alert("Non-Ethereum browser detected!")
        }
    }

    const handleAccountsChanged = () => {
        window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0])
            localStorage.setItem("currentAccount", accounts[0])
            setIsConnected(false)
        })
    }

    const handleDisconnect = async () => {
        await window.ethereum.on('disconnect', () => {
            localStorage.removeItem("currentAccount")
            setIsConnected(false)
        })
    }

    useEffect(() => {
        setAccount(localStorage.currentAccount)

        // check web3 and auto initialize web3.eth if web3 exist
        if (window.web3){
            window.web3 = new Web3(window.web3.currentProvider)
            if (window.web3.eth) {
                setIsConnected(true)
            }
        }

        // account change event (can put anywhere)
        handleAccountsChanged()
        handleAccountsChanged()
    })

    return (
        <>
            {
                (account && account !== "undefined" && isConnected )?
                    <p className="py-2 mb-0 fw-bold">{account}</p> :
                    <Button onClick={connect}>Connect with MetaMask</Button>
            }
        </>
    )
}

export default Connect