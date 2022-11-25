
type statetype = {
  _CookingStatus:any|null,
  _Cooking:any|null

}

const state:statetype = {
  _CookingStatus: localStorage.getItem('CookingStatus') ? JSON.parse(localStorage.getItem('CookingStatus') as any) : null,
  _Cooking:null
}
const actions = {
}
const getters = {
  _getCookingStatus:(state: statetype):Promise<any|null> => {
      return state._CookingStatus
    
  },
  _getCooking:(state: statetype)=>(name:string):any|null =>{
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)')) as any
    console.log(
      match
    );
    if(match){
      state._Cooking = match[0]
       return  JSON.parse( match[0].replaceAll(name + '=',''))
    }else{
       return null
    }
    
    
    
  }
}

const mutations = {
  async _setCookingStatus(state:statetype, Status:boolean):Promise<void>{
    localStorage.setItem('CookingStatus', Status.toString())
    state._CookingStatus = Status
  }


  }

export default {state, getters, mutations, ...actions}