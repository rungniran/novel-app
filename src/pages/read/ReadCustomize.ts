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
  localStorage.setItem("Theme", treme);
  for (let i = 0; i < tremearry.length; i++) {
    read.classList.remove(tremearry[i]);
    app?.classList.remove(tremearry[i]);
  }
  return treme
}


export function fontfamily(style: string):string {
  const story = document.getElementsByClassName("story")[0] as any;
  story.style.fontFamily = style + " , sans-serif" as any;
  localStorage.setItem("fontFamily", style);
  return style
}
