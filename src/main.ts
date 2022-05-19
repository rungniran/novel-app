import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/theme-novel/app.scss'
import func from './shares/function/function_filters'
import base from './shares/function/function_base'
import { alert } from './shares/modules/alert'
import GAuth from 'vue-google-oauth2'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
// import VueMeta from 'vue-meta'

// Vue.use(VueMeta)
Vue.config.productionTip = false

// const gauthOption = {
//   clientId: '1002950262285-jft3s7uqb5n9adk5kn8140bn48edpasf.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'consent',
//   fetch_basic_profile: true
// }


// Vue.use(GAuth, gauthOption)

const gauthClientId = "1002950262285-jft3s7uqb5n9adk5kn8140bn48edpasf.apps.googleusercontent.com" //production

const gAuthOptions = { 
  clientId: gauthClientId, 
  scope: 'profile email', 
  prompt: 'consent', 
  fetch_basic_profile: true 
}
Vue.use(GAuth, gAuthOptions)

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
