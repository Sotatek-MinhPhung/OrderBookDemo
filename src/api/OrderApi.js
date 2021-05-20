import axiosClient from "./api";

const url = "/order"

export const sendOrderWithSignature = (orderWithSignature) => {
    return axiosClient.post(url, orderWithSignature)
}

const OrderApi = {sendOrderWithSignature}

export default OrderApi