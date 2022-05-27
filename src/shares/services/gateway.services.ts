
import api from './baseURL';
import { alertSystem } from '../modules/alert'
const tokenStr = localStorage.getItem("token")
const Authorization =  { headers: {"Authorization" : `Bearer ${tokenStr}`} }
// const logout = () => {
//     localStorage.removeItem("loggedIn")
//     localStorage.removeItem("token")
//     localStorage.removeItem("dataset");
// }

// const status = (key:any) => {
//     if(key === 401){
//         const login_crad = document.getElementsByClassName("login-crad")[0] as HTMLElement
//         const login = document.getElementsByClassName("login")[0] as HTMLElement
//         login_crad.classList.add("login-crad-show")
//         login.classList.add("show")

//     }  
// }

export const Gatway = {
    getService(url:string):any{
        return api.get(url, Authorization )
        .catch(error =>{
            alertSystem(error)       
        }); 
    },
    postService(url:string, obj:any[]):any{
        return api.post(url, obj, Authorization )
        .catch(error =>{
            alertSystem(error)    
        });   
    },
    getIDService(url:string, uuid:string):any{
        return api.get(url + `/${uuid}`, Authorization )
        .catch(error =>{
            alertSystem(error)    
        });  
    },
    DelService(url:string):any{
        return api.delete(url , Authorization )
        .catch(error =>{
            alertSystem(error)    
        });  
    },
    PutService(url:string,uuid:string, obj:any[]):any{
        return api.put(url + `/${uuid}` , obj, Authorization )
        .catch(error =>{
            alertSystem(error) 
        });  
    },
    PutOBJService(url:string, obj:any[]):any{
        return api.put(url , obj, Authorization )
        .catch(error =>{
            alertSystem(error) 
        });  
    },
}


