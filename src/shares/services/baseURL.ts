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
        
    }
})
instance.interceptors.response.use(response => {
    // console.log("debug",response);
    // debugger

    
    // if (!response.data.status) {
    // //   codeError(response.data)
      
    //   return Promise.reject(response)
    // }
  
    return Promise.resolve(response)
//   }, error => {
//     if (error.response.status === 401) {
//       localStorage.removeItem('accessToken')
//       localStorage.removeItem('refreshToken')
//       localStorage.removeItem('userData')
//       location.reload()
//     } else if (error.response.status === 403) {
//       const spUrl = (document.URL).split('/')
//       if (spUrl[spUrl.length - 1] != 'emailVerifyNoti') {
//         const url = "localhost:8082"//process.env.VUE_APP_API_BASEURL
//         console.log(${url}/emailVerifyNoti)
//         window.location.href = /emailVerifyNoti
//       }
       // return Promise.resolve(error)
  
//     }
//     return Promise.reject(error)
  })
export default instance
