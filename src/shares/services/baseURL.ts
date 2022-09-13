import axios from "axios"

const hostname = window.location.hostname 
const cleck =()=> {
  if (hostname === 'novelkingdom.co' || hostname === 'www.novelkingdom.co') {
    return 'https://novelkingdom.co/api/'
  }
  else if(hostname === 'novelkingdom-80a1d.firebaseapp.com'){
    return 'https://119.59.97.111/api/'
  }
  else{
    if(localStorage.getItem('server')){
      return localStorage.getItem('server') as string
    }else{
      return 'https://119.59.97.111/api/'
    }
    
  }
}
const instance = axios.create({
    // baseURL: "https://novelkingdom.test/api/",
    // baseURL: "https://novelkingdom.co/api/", // server
    // baseURL: "http://novelkingdom.test/api", //
    // baseURL :"https://4d0c-2403-6200-8837-c862-b812-8c5-fde0-991.ngrok.io/api/",
     baseURL:cleck(), 
    timeout: 300000,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': "referer, range, accept-encoding, x-requested-with"
        
    }
})


instance.interceptors.response.use(response => {
    return Promise.resolve(response)
  },  (error) => {
    // if(error.message === "Network Error"){
    //     window.open("https://119.59.97.111/api/guest/index/novel-hot");
    // }
    return Promise.reject(error);
  })
export default instance
