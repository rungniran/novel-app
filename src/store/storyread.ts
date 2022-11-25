
import { Gatway} from "../shares/services";
import store from '../store'
export type story_Read = {

  story_Read?: any[]| null,

}

export type EPopj = {
  id:string,
  id_ep:string

}
const state:story_Read = {
  story_Read:  localStorage.getItem("StoryRead") ? JSON.parse(localStorage.getItem("StoryRead") as string) : null
}
const getters = {
      _story_Read:(state:story_Read):any=>{
        return state.story_Read
      }
}


const actions = {

}

const mutations = {
  async setRead(state:story_Read, EPopj:EPopj):Promise<void>{
    
    const item =  localStorage.getItem("StoryRead") ? JSON.parse(localStorage.getItem("StoryRead") as string) : [] as any;
    
    console.log(item);
    // item.includes(EPopj.)
    if(item.length !== 0){
      const index = item.findIndex(object => {
        return object.id === EPopj.id;
      });
      if(index !== -1){
         item.splice(index, 1)
         item.unshift(EPopj)
         localStorage.setItem("StoryRead", JSON.stringify(item));
         state.story_Read = item
      }else{
        item.unshift(EPopj)
        localStorage.setItem("StoryRead", JSON.stringify(item));
        state.story_Read = item
      }
     
      
    }else{
      item.unshift(EPopj)
      state.story_Read = item
      localStorage.setItem("StoryRead", JSON.stringify(item));
      
    }
    // if((store as any).state.auth.token){
    //   setTimeout(async () => {
      
    //     await Gatway.postService('/customers/cookie', {item} as any) 
    //   }, 100000);
    // }
     
    
  }
}

export default {state, getters, mutations, ...actions}