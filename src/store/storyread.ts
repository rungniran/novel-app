
import { Gatway} from "../shares/services";
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

}


const actions = {

}

const mutations = {
  async setRead(state:story_Read, EPopj:EPopj):Promise<void>{
    
    const item =  localStorage.getItem("StoryRead") ? JSON.parse(localStorage.getItem("StoryRead") as string) : [] as any;
    
    // console.log(item);
    // item.includes(EPopj.)
    if(item.length !== 0){
      const index = item.findIndex(object => {
        return object.id === EPopj.id;
      });
      console.log(index);
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
    setTimeout(async () => {
      await Gatway.postService('/customers/cookie', {item} as any) 
    }, 10000);
    // const res = 
    // console.log('dffffffffffffff', res);
     
    
  }
}

export default {state, getters, mutations, ...actions}