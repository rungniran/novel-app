  
import { Gatway } from "@/shares/services";
type statetype = {
  _NotificationCount: number |null
}
const state = {

  _NotificationCount:null
}
const getters = {
  async _getNotificationCount(state:statetype):Promise<number | null>{
    const res = await Gatway.getService("customers/notification/count?status=read");
    
    return res.data.data.count_notification
  }
}

const actions = {

}

const mutations = {
  async _setNotificationCount(state:statetype):Promise<void>{
    const res = await Gatway.getService("customers/notification/count?status=read");
    state._NotificationCount = res.data.data.count_notification
  } 
}

export default {state, getters, mutations, ...actions}