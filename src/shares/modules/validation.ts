

export function Validation (arrvalidate:[]):boolean {
  let con = 0
  for(let i= 0; i < arrvalidate.length; i++){
    const validate = document.getElementById(arrvalidate[i]) as  any
    if(validate.value === undefined || validate.value === "" || validate.value == null){
      validate.classList.add("err")
    }else{
      validate.classList.remove("err")
      con++
      if(con === arrvalidate.length){
        return true
      }
    }
  }
  const error = document.getElementsByClassName("err")[0] as  HTMLElement
  window.scrollTo({top: error.offsetTop , behavior: 'smooth' })
  return false
}