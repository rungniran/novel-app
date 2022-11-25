
import { Seturl, Api } from "@/shares/constants"





class _cleckapi {
  
  private hostname = window.location.hostname 
  opentest =():boolean =>{
     return  Seturl.localhost.includes(this.hostname) 
     || Seturl.server_test.includes(this.hostname)
  }

  callapi = ():string=> {
    if (Seturl.server_main.includes(this.hostname)) {
      return Api.server_main
    }
    else if(
      this.opentest()
    ){
      if(localStorage.getItem('server')){
        return localStorage.getItem('server') as string
      }else{
        return Api.server_test
      }
      
    }else{
      return Api.server_test
    }
  }
}

export { _cleckapi }