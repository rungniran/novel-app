
import api from './baseURL';
import { status } from '../modules/alert'
const tokenStr = localStorage.getItem("token")
const Authorization =  { headers: {"Authorization" : `Bearer ${tokenStr}`} }



export const Gatway = {
    getService(url:string):any{
        return api.get(url, Authorization )
        .catch(error =>{
            status(error)       
        }); 
    },
    postService(url:string, obj:any[]):any{
        return api.post(url, obj, Authorization )
        .catch(error =>{
            status(error)    
        });   
    },
    getIDService(url:string, uuid:string):any{
        return api.get(url + `/${uuid}`, Authorization )
        .catch(error =>{
            status(error)    
        });  
    },
    DelService(url:string):any{
        return api.delete(url , Authorization )
        .catch(error =>{
            status(error)    
        });  
    },
    PutService(url:string,uuid:string, obj:any[]):any{
        return api.put(url + `/${uuid}` , obj, Authorization )
        .catch(error =>{
            status(error) 
        });  
    },
    PutOBJService(url:string, obj:any[]):any{
        return api.put(url , obj, Authorization )
        .catch(error =>{
            status(error) 
        });  
    },
}


