import axios from "axios"


const api = axios.create({
    baseURL: "http://3.237.10.2:8000"
})

export default api