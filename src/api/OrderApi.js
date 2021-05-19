import api from "./api";

const url = "/order"

const sendOrderWithSignature = (orderWithSignature) => {
    return api(url, orderWithSignature)
}

const OrderApi = {sendOrderWithSignature}

// TODO: false
export default OrderApi