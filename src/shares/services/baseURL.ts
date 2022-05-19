import axios from "axios"
const instance = axios.create({
    // baseURL: "https://novelkingdom.test/api/",
    // baseURL: "https://novelkingdom.co/api/", // server
    // baseURL: "http://novelkingdom.test/api", // server testhttp://119.59.97.111/api/login
     baseURL: "https://119.59.97.111/api/", // server testhttp://119.59.97.111/api/login
    // baseURL: "http://localhost:8000/api",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        
    }
})

export default instance
