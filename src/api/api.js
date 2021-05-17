import axios from "axios"

// TODO: set variable environment
const axiosClient = axios.create({
    baseUrl: `http://localhost:1234/api/v1`,
    timeout: 5000,
    responseType: 'json'
})

axiosClient.interceptors.request.use(async (config) => {
    // Handle config
    return config
})

axiosClient.interceptors.response.use(async (response) => {
    if (response && response.data) {
        // Handle response data
        return response.data
    }

    return response
})

export default axiosClient