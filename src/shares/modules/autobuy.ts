

export function setAutoBuy(key: string):boolean {
  if(localStorage.getItem("setAutoBuy")) {
    const setArrayBuy = JSON.parse(localStorage.getItem("setAutoBuy") as string)
    // console.log(setArrayBuy.includes(key) ,setArrayBuy);
    if(setArrayBuy.includes(key) === true){
      const index = setArrayBuy.indexOf(key)
      setArrayBuy.splice(index, 1 )
      localStorage.setItem("setAutoBuy", JSON.stringify(setArrayBuy))
      console.log(setArrayBuy);
      return false
    }else{
      setArrayBuy.push(key)
      localStorage.setItem("setAutoBuy", JSON.stringify(setArrayBuy))
      console.log(setArrayBuy);
      return true
    }
  }else{
    const setArrayBuy = [] as string[];
    setArrayBuy.push(key)
    localStorage.setItem("setAutoBuy", JSON.stringify(setArrayBuy))
    // console.log(setArrayBuy);
    return true
  }
}

export function getAutoBuy(key: string):boolean{
  if(localStorage.getItem("setAutoBuy")) {
    const setArrayBuy = JSON.parse(localStorage.getItem("setAutoBuy") as string)
    if(setArrayBuy.includes(key) === true){
      return true
    }else{
      return false
    }
  }else{
    return false
  }
  
}
