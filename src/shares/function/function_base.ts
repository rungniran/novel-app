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
     }
}

export default base as any | null | undefined 
