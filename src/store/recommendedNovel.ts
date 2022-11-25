import { Gatway } from "@/shares/services";

type statetype = {
  _RecommendedNovel:any|null
}

const state:statetype = {
  _RecommendedNovel:null
}
const getters = {
  async _GetRecommendedNovel(state:statetype):Promise<statetype|null>{
    if(state._RecommendedNovel){ 
      return state._RecommendedNovel
    }else{
      try {
        const getRecommend = await Gatway.getService("/guest/recommended-novel");
        state._RecommendedNovel = getRecommend.data.data
        return getRecommend.data.data
      } catch (error) {
        console.log(error);
        return null
        
      }
    }
    
  }
}

   
const actions = {
  // _RecommendedNovelActions(context:any){
  //   context.commit('_SetRecommendedNovel')
  // }
}

const mutations = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  async _SetRecommendedNovel(state:statetype): Promise<any> {
    try {
      const getRecommend = await Gatway.getService("/guest/recommended-novel");
      state._RecommendedNovel = getRecommend.data.data
    } catch (error) {
      console.log(error);
    }
  }
}

export default {state, getters, mutations, ...actions}