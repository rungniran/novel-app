import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/theme-novel/app.scss'
import func from './shares/function/function_filters'
import base from './shares/function/function_base'
import { alert } from './shares/modules/alert'
import NovelConfirm2 from '@/components/widget/NovelConfirm2.vue'
import NovelModal2 from '@/components/widget/NovelModal2.vue'
import { getAnalytics,logEvent} from "firebase/analytics";
 import { initializeApp  } from "firebase/app";
import VueApexCharts from 'vue-apexcharts'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  error: 'https://novelkingdom.co/loading.png',
  loading: 'https://novelkingdom.co/loading.png',
})
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.component('novelModal2', NovelModal2)

Vue.component('ConfirmDialogue', NovelConfirm2)
Vue.config.productionTip = false


const firebaseConfig = {
  apiKey: "AIzaSyDU25BfrbtLAsV9Vwp6jbe5uvhMyRb6ums",
  authDomain: "novelkingdom-test.firebaseapp.com",
  projectId: "novelkingdom-test",
  storageBucket: "novelkingdom-test.appspot.com",
  messagingSenderId: "818385858123",
  appId: "1:818385858123:web:a8cd268dc21654097227ce",
  measurementId: "G-WK3SK41GN7"
};
const app =initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');
Vue.prototype.$analytics = analytics
Vue.prototype.$alert = alert as any
Vue.prototype.$filter = func.filters
Vue.prototype.$base = base as any
Vue.prototype.$path = func.dynamic_path
Vue.prototype.cleck = localStorage.getItem("loggedIn")
const profileopj = JSON.parse(localStorage.getItem("dataset") as string)

Vue.prototype.profile = profileopj  as any
// profileopj
//   ? Vue.prototype.path_profile = profileopj.username.replace(' ', '_')
//   : null
Vue.config.productionTip = false

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
