
import { Gatway } from '@/shares/services'

const state = {
  monent:[],
  sarabun:null
}
const getters = {

}


const actions = {

}

const mutations = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async setSarabun(state:any,{key}:{key:string}):Promise<void>{
    const resGetNovel = await Gatway.getIDService('/guest/novel/novel-data',key);
    console.log(resGetNovel.data.data.novel_episode_datas);
    state.sarabun = resGetNovel.data.data.novel_episode_datas
    
    
  }
}

export default {state, getters, mutations, ...actions}