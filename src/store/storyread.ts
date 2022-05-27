
import { Gatway } from '@/shares/services'

const state:any = {
  story_Read:  localStorage.getItem("StoryRead") ? JSON.parse(localStorage.getItem("StoryRead") as string) : null
}
const getters = {

}


const actions = {

}

const mutations = {
  async setRead(state:any, EPopj):Promise<void>{
    console.log(EPopj);
    
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
         item.push(EPopj)
         localStorage.setItem("StoryRead", JSON.stringify(item));
         state.story_Read = item
      }else{
        item.push(EPopj)
        localStorage.setItem("StoryRead", JSON.stringify(item));
        state.story_Read = item
      }
     
      
    }else{
      item.push(EPopj)
      state.story_Read = item
      localStorage.setItem("StoryRead", JSON.stringify(item));
      
    }
    
  }
}

export default {state, getters, mutations, ...actions}