
import { Gatway } from '@/shares/services'

const state = {
  sarabunID:null,
  sarabun:null
}
const getters = {

}


const actions = {

}

const mutations = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async setSarabun(state:any,{Sarabun, id}):Promise<void>{
    // const resGetNovel = await Gatway.getIDService('/guest/novel/novel-data',key);
    // console.log(resGetNovel);
    state.sarabun = Sarabun
    state.sarabunID = id
  }
}

export default {state, getters, mutations, ...actions}