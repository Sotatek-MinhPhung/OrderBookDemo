import {CONNECT} from "../constant";
import Web3 from "web3";

const initialState = {
    accounts: []
}

const connectToMetaMask = async () => {
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        window.alert("Non-Ethereum browser detected!")
    }
}

const connectReducer = async (state = initialState, action) => {
    switch (action.type){
        case CONNECT:
            await connectToMetaMask()
            return {
                ...state,
                accounts: await window.ethereum.request({ method: 'eth_requestAccounts' })
            }
        default:
            return state
    }
}

export default connectReducer