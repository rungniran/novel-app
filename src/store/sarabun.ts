
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
  async setSarabun(state:any,{key}:{key:any}):Promise<void>{
    console.log(key);
    
    // const resGetNovel = await Gatway.getIDService('/guest/novel/novel-data',key);
    // console.log(resGetNovel);
    state.sarabun = key
    
    
  }
}

export default {state, getters, mutations, ...actions}