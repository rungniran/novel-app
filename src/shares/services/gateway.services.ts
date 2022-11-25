
import api from './baseURL';
import { status } from '../modules/alert'
import store from '../../store'
const tokenStr = (store as any).state.auth.token
const Authorization =  { headers: {"Authorization" : `Bearer ${tokenStr}`} }



export const Gatway = {
    
    getAuthorization():any{
        const tokenStr = (store as any).state.auth.token
        const Authorization =  { headers: {"Authorization" : `Bearer ${tokenStr}`} }
        return Authorization
    },

    getService(url:string):any{ 
        return api.get(url,  this.getAuthorization() )
        .catch(error =>{
            status(error)       
        }); 
    },
    postService(url:string, obj:any[]):any{
        return api.post(url, obj, this.getAuthorization() )
        .catch(error =>{
            status(error)    
        });   
    },
    getIDService(url:string, uuid:string):any{
        return api.get(url + `/${uuid}`, this.getAuthorization() )
        .catch(error =>{
            status(error)    
        });  
    },
    DelService(url:string):any{
        return api.delete(url , this.getAuthorization() )
        .catch(error =>{
            status(error)    
        });  
    },
    PutService(url:string,uuid:string, obj:any[]):any{
        return api.put(url + `/${uuid}` , obj, this.getAuthorization() )
        .catch(error =>{
            status(error) 
        });  
    },
    PutOBJService(url:string, obj:any[]):any{
        return api.put(url , obj, this.getAuthorization() )
        .catch(error =>{
            status(error) 
        });  
    },
}

export const Publics = {
    getService(url:string):any{
        return api.get(url )
        .catch(error =>{
            status(error)       
        }); 
    },
    postService(url:string, obj:any[]):any{
        return api.post(url, obj )
        .catch(error =>{
            status(error)    
        });   
    },
    getIDService(url:string, uuid:string):any{
        return api.get(url + `/${uuid}` )
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
        return api.put(url + `/${uuid}` , obj )
        .catch(error =>{
            status(error) 
        });  
    },
    PutOBJService(url:string, obj:any[]):any{
        return api.put(url , obj )
        .catch(error =>{
            status(error) 
        });  
    },
}

