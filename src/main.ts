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
import VueApexCharts from 'vue-apexcharts'
import NovelLoading from '@/components/widget/NovelLoading.vue'
import NovelImage from '@/components/widget/NovelImage.vue'
import VueLazyload from 'vue-lazyload'
import Meta from 'vue-meta'
import '@/shares/services/firebase.service'
// import { firedatabase } from "@/shares/services/firebase"
import { Gatway } from "@/shares/services";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faHatWizard ,faSpinner  } from '@fortawesome/free-solid-svg-icons'
import { far ,} from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Login from '@/components/Login.vue'
import VCalendar from 'v-calendar';
import VueTheMask from 'vue-the-mask'
import VueSocialSharing from 'vue-social-sharing'
import WalletMOdal from "@/pages/wallet/WalletModal/walletmodal.vue"
import NovelPaginate from "@/components/widget/NovelPaginate.vue"

library.add(far, fas, fab, faHatWizard)
Vue.use(VueSocialSharing);
Vue.use(VCalendar);
Vue.use(VueTheMask)
Vue.use(VueApexCharts)
Vue.use(Meta, {
  keyName: 'metaInfo',
})

Vue.use(Meta)
Vue.use(VueLazyload, {
  error: 'https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png',
  loading: 'https://novelkingdom-80a1d.firebaseapp.com/img/loading.a7cb0bda.png',
})


Vue.component('NovelPaginate', NovelPaginate)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('WalletMOdal', WalletMOdal)
Vue.component('NovelImage', NovelImage)
Vue.component('NovelLoading', NovelLoading)
Vue.component('apexchart', VueApexCharts)
Vue.component('NovelModal2', NovelModal2)
Vue.component('NovelPomotion', NovelPomotion)
Vue.component('ConfirmDialogue', NovelConfirm2)
Vue.config.productionTip = false



if ((store as any).state.auth.dataset) {
  Vue.prototype.$profileimgW = (store as any).state.auth.dataset.image_url
}else{
  Vue.prototype.$profileimgW = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
}
  
Vue.prototype.$loading = new NovelLoading as any
Vue.prototype.$login = new Login as any
// Vue.prototype.$firedatabase = firedatabase
Vue.prototype.Gatway = Gatway
Vue.prototype.$isdrogon = ['9755FCB8-78CB-42A0-85AC-272845D833C5', '807A2FA2-D699-4B4E-B49F-F41508F5F051']
Vue.prototype.$promote = '807A2FA2-D699-4B4E-B49F-F41508F5F051'
Vue.prototype.$alert = alert as any
Vue.prototype.$filter = func.filters as any
Vue.prototype.$base = base as any
Vue.prototype.$path = func.dynamic_path
Vue.prototype.cleck = localStorage.getItem("loggedIn")
const profileopj =  (store as any).state.auth.dataset
Vue.prototype.profile = profileopj as any
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



