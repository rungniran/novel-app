
import { Gatway } from "@/shares/services";

type statetype = {
  _book:any|null
}
const state = {
  _book:null
}
const getters = {
  async _getbook(state:statetype):Promise<statetype|null>{
    if(state._book){ 
      return state._book
    }else{
      try {
        const book = await Gatway.getService("/guest/index/thai-national-book-fair");
        state._book = book.data.data
        return book.data.data
      } catch (error) {
        console.log(error);
        return null
        
      }
    }
    
  }
}


const actions = {

}

const mutations = {

}

export default {state, getters, mutations, ...actions}