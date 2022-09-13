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
import NovelPomotion from '@/components/widget/NovelPomotion.vue'
import { getAnalytics,logEvent} from "firebase/analytics";
 import { initializeApp  } from "firebase/app";
import VueApexCharts from 'vue-apexcharts'
import VueLazyload from 'vue-lazyload'
import Meta from 'vue-meta'
// import AOSs from 'aos';
// import 'aos/dist/aos.css'; // You can also use <link> for styles
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)

// ..
// AOSs.init();
// import {MotionPlugin} from '@vueuse/motion'
// import { createApp } from 'vue-demi'
// const appMotion = createApp(App)

// appMotion.use(MotionPlugin)

// appMotion.mount('#appMotion')
// import VueSocialSharing from 'vue-social-sharing'
Vue.use(Meta)
Vue.use(VueLazyload, {
  error: 'https://novelkingdom.co/loading.png',
  loading: 'https://novelkingdom.co/loading.png',
})
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.component('novelModal2', NovelModal2)
Vue.component('NovelPomotion',NovelPomotion)
Vue.component('ConfirmDialogue', NovelConfirm2)
Vue.config.productionTip = false
// Vue.use(MotionPlugin)


const firebaseConfig = {
  apiKey: "AIzaSyBfR5qNewKa29OQmhvUuues8AWnLRsQMGk",
  authDomain: "novelkingdom-80a1d.firebaseapp.com",
  projectId: "novelkingdom-80a1d",
  storageBucket: "novelkingdom-80a1d.appspot.com",
  messagingSenderId: "276204897935",
  appId: "1:276204897935:web:13c5c96c6c25ede49e12fa",
  measurementId: "G-JWS2G13SLN",
  // auth
  // authDomain: '[YOUR_CUSTOM_DOMAIN]'
};
// Vue.use(VueSocialSharing, {
//   networks: {
//       newNetwork: 'https://newnetwork.com/share?url=@url&title=@title'
//   }
// })
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
