import axios from "axios"


const api = axios.create({
    baseURL: "http://3.214.217.77:8000/"
})

export default api