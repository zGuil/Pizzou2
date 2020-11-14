import axios from "axios"


const api = axios.create({
    baseURL: "http://ec2-3-237-10-2.compute-1.amazonaws.com:8080"
})

export default api