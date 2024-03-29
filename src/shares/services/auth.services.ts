
import api from './baseURL'; // import { alertSystem } from '../modules/alert'
interface login {
    usernameOrEmail: string
    password: string
}

export const Auth = {
  login(obj:login):any {
    return api.post('/login', obj)
    .catch(error =>{
      console.log(error);
            
    }); 
  },
  customer(tokenStr:string):any{
    return api.get('/info', { headers: {"Authorization" : `Bearer ${tokenStr}`} }).catch(error =>{
      console.log(error);      
    });
  },
  profile(tokenStr:string, id:string):any{
    return api.get('/customers/profile-data/index/'+id, { headers: {"Authorization" : `Bearer ${tokenStr}`} }).catch(error =>{
      console.log(error);    
    });
  },
  fetchcookie(tokenStr:string):any{
    return api.get('/customers/cookie/fetch', { headers: {"Authorization" : `Bearer ${tokenStr}`} }).catch(error =>{
      console.log(error);       
    });
  }
}
