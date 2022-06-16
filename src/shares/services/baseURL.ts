import axios from "axios"
const instance = axios.create({
    // baseURL: "https://novelkingdom.test/api/",
    // baseURL: "https://novelkingdom.co/api/", // server
    // baseURL: "http://novelkingdom.test/api", // server testhttp://119.59.97.111/api/login
     baseURL: "https://119.59.97.111/api/", // server testhttp://119.59.97.111/api/login
    // baseURL: "http://localhost:8000/api",
    timeout: 300000,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': "referer, range, accept-encoding, x-requested-with"
        
    }
})
instance.interceptors.response.use(response => {
    // console.log(response);
    return Promise.resolve(response)
    

  },  (error) => {
    console.log();
    if(error.message === "Network Error"){
        window.open("https://119.59.97.111/api/guest/index/novel-hot");
    }
    return Promise.reject(error);
  })
export default instance
