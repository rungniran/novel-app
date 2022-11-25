import { Gatway } from "@/shares/services";


type statetype = {
  _groupType:any|null
}

const state:statetype = {
  _groupType:null
}
const actions = {
  // _RecommendedNovelActions(context:any){
  //   context.commit('_SetRecommendedNovel')
  // }
}
const getters = {
  async _getGroupType(state:statetype):Promise<statetype| null>{
    console.log(state._groupType);
    
    if(state._groupType){ 
      return state._groupType
    }else{
      try {
        const getGroupType = await Gatway.getService("/guest/novel/group-type");
        state._groupType = getGroupType.data.data
        return getGroupType.data.data
      } catch (error) {
        console.log(error);
        return null
      }
    }
    
  }
}

const mutations = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types


  }

export default {state, getters, mutations, ...actions}