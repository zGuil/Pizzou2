import axios from "axios"


const api = axios.create({
    baseURL: "http://3.229.118.108:8000/"
})

export default api