import axios from "axios"
import  {alert} from "@/shares/modules/alert"
import { _cleckapi } from "./checkapi.service"
import store from '../../store'
import _Login from '@/components/Login.vue'
const cleckapi = new _cleckapi
const Login= new _Login as any
import { Seturl } from "@/shares/constants"
const instance = axios.create({
    baseURL:`https://${cleckapi.callapi()}/api/`, 
    timeout: 300000,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': "referer, range, accept-encoding, x-requested-with",
        "Cache-Control": "public, max-age=604800, immutable"
        
    }
})


const cleck402 = (response:any) =>{
    if(response.data){
      for (const key in response.data) {
        if (Object.prototype.hasOwnProperty.call(response.data, key)) {
          const element = response.data[key];
          console.log(element);
          alert(element,'error')
        }
      }
  }
}


const _error = (error:any) =>{
  if(error.response.status === 422){
      alert('ข้อมูลไม่ครบ','error')
    }else if(error.response.status === 401){
      Login.openlogin()
      // store.commit('logout')
    }else if(error.response.status === 404){
      alert(error,'error')
    }else if(error.response.status === 402){
      alert(error,'error')
     }else if(error.response.status === 405){
      alert(error.response.data.message,'wraning')
    }else if(error.response.status === 500){
      alert(error.response.data.message,'error')
    }else{
      alert(error.response.data.message,'error')
    }
  
}



const success = (response:any) =>{
  const codeNum = 
  Seturl.localhost.includes(window.location.hostname) || 
  Seturl.server_test.includes(window.location.hostname)
  ? response.data.code
  : ''
  if(response.data.code === 422){
    alert(`ข้อมูลไม่ครบ ${codeNum}`,'wraning')
  }else if (response.data.code === 405) {
    alert(`${response.data.data} ${codeNum}`  , 'wraning')
  }else if (response.data.code === 404) {
    alert(`${response.data.data} ${codeNum}`  , 'wraning')
  }else if (response.data.code === 402) {
    alert(`${response.data.data} ${codeNum}`  , 'wraning')
  }
}


instance.interceptors.response.use(response => {
    success(response)
    return Promise.resolve(response)
  }, (error) => {
    _error(error)
    console.log(error.response)
    return Promise.reject(error);
  })

export default instance
