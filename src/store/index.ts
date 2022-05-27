import Vue from 'vue'
import Vuex from 'vuex'
import  auth  from './auth'
import  sarabun  from './sarabun'
import  storyread  from './storyread'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: { auth, sarabun,storyread }
})
