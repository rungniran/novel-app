/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export function setThreme(){
  localStorage.getItem("Theme")
      ? changback(localStorage.getItem("Theme") as string)
      : null;
    localStorage.getItem("fontFamily")
      ? fontfamily(localStorage.getItem("fontFamily") as string)
      : fontfamily("Sarabun");
} 

export function changback(treme: string):string {
  const tremearry = ["dark", "fzooss", "default"];
  const index = tremearry.indexOf(treme);
  tremearry.splice(index, 1);
  const read = document.getElementsByClassName("read")[0] as HTMLElement;
  read.classList.add(treme);
  const app = document.getElementById("app");
  app?.classList.add(treme);
  const content = document.getElementsByClassName('content')[0] as HTMLElement
  const text = document.getElementsByClassName('text')[0] as HTMLElement
  const Topbar = document.getElementById('Topbar') as HTMLElement
  const listmenu = document.getElementsByClassName('list-sub-menu')
  const footer = document.getElementsByClassName('footer')[0] as HTMLElement
  if(treme === 'default'){
    content.style.background = 'linear-gradient(180deg, rgba(230, 222, 255, 0.433) 2.72%, rgba(175, 151, 249, 0.432) 100%)'
    Topbar.style.background = '#fff'
    text.style.color = '#1E2046'
    footer.style.background = '#efefef';
    footer.style.color = '#5f5f5f';
     for (let i= 0; i < listmenu.length -1 ;i++) {
      (listmenu[i] as HTMLElement).style.color = '#1E2046'
    }
    
  }else if(treme === 'dark'){
    content.style.background = '#151515'
    Topbar.style.background = '#2b2b2b'; 
    text.style.color = 'gray'
    footer.style.background = '#2b2b2b';
    footer.style.color = '#a2a2a2';
    for (let i= 0; i < listmenu.length -1 ;i++) {
      (listmenu[i] as HTMLElement).style.color = '#a2a2a2'
    }
  }else if(treme === 'fzooss'){
    content.style.background = '#ece0cb'
    Topbar.style.background ='#ece0cb'
    text.style.color = '#a68700'
    for (let i= 0; i < listmenu.length -1 ;i++) {
      (listmenu[i] as HTMLElement).style.color = '#a68700'
    }
  }
  localStorage.setItem("Theme", treme);
  for (let i = 0; i < tremearry.length; i++) {
    read.classList.remove(tremearry[i]);
    app?.classList.remove(tremearry[i]);
  }
  return treme
}


export function fontfamily(style: string):string {
  const story = document.getElementsByClassName("story")[0] as any;
  const boxread = document.getElementsByClassName("box-read")[0] as any;
  const colorheader = document.getElementsByClassName("color-header")[0] as any;
  boxread.style.fontFamily = style + " , sans-serif" as any;
  story.style.fontFamily = style + " , sans-serif" as any;
  colorheader.style.fontFamily = style + " , sans-serif" as any;
  localStorage.setItem("fontFamily", style);
  return style
}
