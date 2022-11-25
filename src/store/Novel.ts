
import { Gatway } from "@/shares/services";
import auth from './auth'
type statetype = {
  _Page: number | null
  _NovelEpSet: any | null
  _NovelEp: any[] | null
  _NovelID: any | null
  _NovelHeader:any | null
  _NovelIDHeader: any |null
}
const state = {
  _Page: 1,
  _NovelEpSet: null,
  _NovelEp: [] as any[],
  _NovelID: null,
  _NovelHeader : null,
  _NovelIDHeader: null
}
const getters = {
  _GetNovelEpSet: (state: statetype) => async (uuid: string, reset= false,):Promise<any|null> => {
    if(state._NovelID === uuid){
      return state._NovelEpSet
    }else{
      try {
        
        const res = await Gatway.getIDService(auth.state.token ? '/novel/novel-data-set' : '/guest/novel/novel-data-set', uuid);
        state._NovelID =uuid
        console.log('dfdfdf',res.data.data);
        
        state._NovelEpSet = res.data.data
        return res.data.data
      } catch (error) {
        console.log(error);
        return null
      }
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _GetNovelEp: (state: statetype) => async (url: string, uuid: string,  page=1,  sortby?: string):Promise<any|null> => {
    // console.log(state._NovelID , uuid);
      
    // if(!state._NovelID){
    //   state._NovelID = uuid
    // }
    // if (state._NovelEp && state._NovelID === uuid && reset === false) {
    //   return state._NovelEp
    // } else {
      try {
        const res = await Gatway.getIDService(url, uuid+'?page='+page +'&sort_by='+ sortby);
        // state._NovelID = state._NovelID ? uuid : null
        // state._NovelEp?.push({
        //   moment: `บทที่ ${res.data.data.data[0].ep_no} - ${res.data.data.data[res.data.data.data.length -1].ep_no}`,
        //   ep: res.data.data.data,
        // })
        return res.data.data
      } catch (error) {
        console.log(error);
        return null
      }
    // }
  },

  _GetNovelHeader:(state: statetype) =>async (uuid: string):Promise<any|null> => {
    if(state._NovelHeader && state._NovelIDHeader === uuid){
      return state._NovelHeader
    }else{
      try {
        // state._NovelIDHeader =uuid
        const res = await Gatway.getIDService( "/guest/fetch-novel-header", uuid);
        state._NovelIDHeader =uuid
        state._NovelHeader = res.data.data
        return res.data.data
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
  // async setRead(state:statetype):Promise<void>{}
  //     c
  // }

}

function bNovel(item:any){
  // console.log(item);
  item.forEach((element :any) => {
    // console.log(element);
    const index = state._NovelEp.findIndex((object) => {
      return object.id === element.id;
    });

    index !== -1 ? state._NovelEp.push(element) : null
  });
  // state._NovelEp
  

}

export default { state, getters, mutations, ...actions }