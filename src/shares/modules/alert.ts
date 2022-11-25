// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import store from '../../store'
export function alertSystem(error: any):void {
  // status(error.response.status)
  const err = document.getElementsByClassName("con-aler-system")[0] as any;
  const element = document.createElement("div");
  element.setAttribute('class', 'aler-system');
  element.appendChild(document.createTextNode(error));
  err.appendChild(element);
  setTimeout(() => {
    element.remove();
  }, 5000);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const status = (error:any) => {
  // if(error.response.status === 401){
  //   store.commit('logout')
  //   // localStorage.removeItem("loggedIn");
  //   // localStorage.removeItem("token");
  //   // localStorage.removeItem("dataset");
  //   // localStorage.removeItem("StoryRead");
  //   // window.location.reload() 
  //   const login_crad = document.getElementsByClassName("login-crad")[0] as HTMLElement
  //   const login = document.getElementsByClassName("login")[0] as HTMLElement
  //   login_crad.classList.add("login-crad-show")
  //   login.classList.add("show")
      
  // }
  // else{
  //   if(window.location.hostname === 'localhost'){
  //     alertSystem(error)
  //   }
  // } 
}

export function alert(messenger:string, typeclass:string):void {
  const err = document.getElementsByClassName("con-aler-system")[0] as HTMLElement;
  const element = document.createElement("div") as HTMLElement;
  element.setAttribute('class', typeclass);
  element.appendChild(document.createTextNode(messenger));
  err.appendChild(element);
  setTimeout(() => {
    element.remove();
  }, 5000);
}

// export function debugSystem(messenger:any, typeclass = ''):void {
//   const err = document.getElementById("Debug-C") as HTMLElement;
//   err.classList.add(typeclass)
//   const code = document.createElement("div") as HTMLElement;
//   code.appendChild(document.createTextNode( messenger.code + '  '));
//   err.appendChild(code);
//   for (const iterator in messenger.data) {    
//     const element = document.createElement("div") as HTMLElement;
//     // element.setAttribute('class', typeclass);4f
//     element.innerHTML = iterator +' = '+ messenger.data[iterator]
//     // element.appendChild(document.createTextNode(JSON.stringify(messenger.data[iterator])));
//     err.appendChild(element);
//    }
//   // setTimeout(() => {
//   //   element.remove();
//   // }, 5000);
// }



export function loadbtn(key:string):void{
    const load = document.getElementsByClassName("load")[0] as HTMLElement
    const confirm = document.getElementsByClassName("confirm")[0] as HTMLElement
    if(key === "add"){
      load.classList.add("load-show")
      confirm.classList.add("confirm-none")
    }else if(key === "remove"){
      load.classList.remove("load-show")
      confirm.classList.remove("confirm-none")
    }
}


export function openalert(id:string, idCon:string):void{
  document.getElementById(idCon)?.classList.add("NovelConfirm-show")
  document.getElementById(id)?.classList.add("con-confirm-show")
}

export function closealert(id:string, idCon:string):void{
  document.getElementById(idCon)?.classList.remove("NovelConfirm-show")
  document.getElementById(id)?.classList.remove("con-confirm-show")
}