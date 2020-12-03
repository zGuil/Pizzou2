import axios from "axios"


const api = axios.create({
    baseURL: "http://100.24.122.62:8000/"
})

export default api
