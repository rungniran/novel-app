import axios from "axios"

const instance = axios.create({
    // baseURL: "https://novelkingdom.test/api/",
    // baseURL: "https://novelkingdom.co/api/", // server
    // baseURL: "http://novelkingdom.test/api", //
    // baseURL :"https://4d0c-2403-6200-8837-c862-b812-8c5-fde0-991.ngrok.io/api/",
     baseURL:'https://119.59.97.111/', 
    timeout: 300000,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': "referer, range, accept-encoding, x-requested-with"
        
    }
})

export default instance