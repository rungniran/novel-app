// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
  console.log(error);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const status = (error:any) => {
  if(error.response.status === 401){
      const login_crad = document.getElementsByClassName("login-crad")[0] as HTMLElement
      const login = document.getElementsByClassName("login")[0] as HTMLElement
      login_crad.classList.add("login-crad-show")
      login.classList.add("show")
  }else if(error.response.status === 429){
    // window.open(window.location.href,'_blank');
  } 
  else{
    alertSystem(error)
  } 
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
  console.log(messenger);
}



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