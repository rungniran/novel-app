import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/theme-novel/app.scss'
import func from './shares/function/function_filters'
import base from './shares/function/function_base'
import { alert } from './shares/modules/alert'
// import GAuth from 'vue-google-oauth2'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDU25BfrbtLAsV9Vwp6jbe5uvhMyRb6ums",
  authDomain: "novelkingdom-test.firebaseapp.com",
  projectId: "novelkingdom-test",
  storageBucket: "novelkingdom-test.appspot.com",
  messagingSenderId: "818385858123",
  appId: "1:818385858123:web:a8cd268dc21654097227ce",
  measurementId: "G-WK3SK41GN7"
};
initializeApp(firebaseConfig);


Vue.prototype.$alert = alert as any
Vue.prototype.$filter = func.filters
Vue.prototype.$base = base as any
Vue.prototype.$path = func.dynamic_path
Vue.prototype.cleck = localStorage.getItem("loggedIn")
const profileopj = JSON.parse(localStorage.getItem("dataset") as string)
console.log('sddsfsdfsdf',  profileopj);

Vue.prototype.profile = profileopj  as any
profileopj
  ? Vue.prototype.path_profile = profileopj.username.replace(' ', '_')
  : null
Vue.config.productionTip = false

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
