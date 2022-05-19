
import api from './baseURL';
import { alertSystem } from '../modules/alert'

export const Public = (url:string):any =>{
    return api.get(url)
    .catch(error =>{
        alertSystem(error)       
    }); 
}


