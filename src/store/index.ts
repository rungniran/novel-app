import Vue from 'vue'
import Vuex from 'vuex'
import  auth  from './auth'
import  sarabun  from './sarabun'
import  storyread  from './storyread'
import  loading  from './loading'
import  recommendedNovel  from './recommendedNovel'
import  setTheme  from './setTheme.store'
import  groupType  from './groupType'
import  shareData  from './shareData'
import  Novel  from './Novel'
import  Cooking  from './Cooking'
import  Notification  from './Notification.store'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: { 
    auth, 
    sarabun,
    storyread ,
    recommendedNovel,
    setTheme,
    loading,
    groupType,
    shareData,
    Novel,
    Cooking,
    Notification
  }
})
