import Vue from 'vue'
import Vuex from 'vuex'
import  auth  from './auth'
import  sarabun  from './sarabun'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: { auth, sarabun }
})
