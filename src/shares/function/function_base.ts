const base:any | null | undefined = {
    openlogin():void{
        document.getElementsByClassName("login-crad")[0].classList.add("login-crad-show")
        document.getElementsByClassName("login")[0].classList.add("show")
    },
    openmodal(nameclass:string, nameclassshow:string, key:number):void{
        // console.log(nameclass, nameclassshow, key);
        document.getElementsByClassName(nameclass)[0].classList.add(nameclassshow)
        document.getElementsByClassName("contai-modal")[key].classList.add("show")
    },
    closemodal(nameclass:string, nameclassshow:string, key:number):void{
        document.getElementsByClassName(nameclass)[key].classList.remove(nameclassshow)
        document.getElementsByClassName("contai-modal")[key].classList.remove("show")
    },
    openalert(id:string, idCon:string):void |null | undefined {
       document.getElementById(idCon)?.classList.add("NovelConfirm-show")
       document.getElementById(id)?.classList.add("con-confirm-show")
    },
    closealert(id:string, idCon:string):void |null | undefined {
        document.getElementById(idCon)?.classList.remove("NovelConfirm-show")
        document.getElementById(id)?.classList.remove("con-confirm-show")
     },
     cleckhostname() {
        const hostname = window.location.hostname 
        // if (hostname === 'novelkingdom.co' || hostname === 'www.novelkingdom.co') {
        //   return false 
        // }else 
        if(
          hostname === 'localhost' 
          // || hostname === 'novelkingdom-80a1d.firebaseapp.com' 
          // || hostname==='novelkingdom-80a1d.web.app'
        ){
          return true
        }else{
          return false
        }
      }
     
}

// export const cleckhostname =()=> {
//     const hostname = window.location.hostname 
//     // if (hostname === 'novelkingdom.co' || hostname === 'www.novelkingdom.co') {
//     //   return false
//     // }else 
//     if(hostname === 'localhost'){
//       return true
//     }else{
//       return false
//     }
//   }
export default base as any | null | undefined 
