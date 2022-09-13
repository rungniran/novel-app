import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../pages/home/Home.vue'
import NotFound from '../pages/404.vue'
import store from '../store'
import { writer } from './writer'
import { profile } from './profile'


import Meta from 'vue-meta'
Vue.use(Meta, {
  keyName: 'metaInfo',
  // attribute: 'data-vue-meta',
  // ssrAttribute: 'data-vue-meta-server-rendered',
  // tagIDKeyName: 'vmid',
  // refreshOnceOnNavigation: true
})
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [

  // ________________________________________________public__________________________________________________________

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path:'/404',
  //   name:'Read',
  //   component: NotFound
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue')
  },
  {
    path:'/password/reset',
    name:'resetpassword',
    component: () => import('../pages/account/ResetPassword.vue'),
    // meta:{ requiresAuth: true }
  },
  {
    path:'/submitpassword',
    name:'resetpassword',
    component: () => import('../pages/account/Submitpassword.vue'),
    // meta:{ requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../pages/pagefooter/contact.vue')
  },
  {
    path: '/terms-conditions',
    name: 'TermsConditions',
    component: () => import('../pages/pagefooter/TermsConditions.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../pages/pagefooter/PolicyPrivacy.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../pages/category/Category.vue')
  },
  {
    path:'/novel/:id',
    name:'Novel',
    component: () => import('../pages/novel/Novel.vue')
  },
  {
    path:'/listdragonhouse',
    name:'ListDragonHouse',
    component: () => import('../pages/novel/dragonhouse/ListDragonHouse.vue')
  },
  {
    path:'/read/:slug',
    name:'Read',
    component: () => import('../pages/read/Read.vue')
  },
  {
    path:'/howtousepromotion',
    name:'Howtousepromotion',
    component: () => import('../pages/writer/howtousepromotion/HowTousePromotion.vue')
  },
  // ________________________________________________auth__________________________________________________________

  {
    path:'/bookshelf',
    name:'Bookshelf',
    component: () => import('../pages/bookshelf/Bookshelf.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/wallet',
    name:'Wallet',
    component: () => import('../pages/wallet/Wallet.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/wallet/howtopayment',
    name:'Howtopayment',
    component: () => import('../pages/wallet/howtopayment/HowToPayment.vue')
  },

  // {
  //   path:'/wallet',
  //   name:'Wallet',
  //   component: () => import('../pages/wallet/Wallet.vue'),
  //   meta:{ requiresAuth: true }
  // },
  {
    path:'/account',
    name:'Account',
    component: () => import('../pages/account/Account.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/reportproblem',
    name:'ReportProblem',
    component: () => import('../pages/reportproblem/ReportProblem.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/history',
    name:'History',
    component: () => import('../pages/history/History.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/exchange',
    name:'Exchange',
    component: () => import('../pages/Exchange/Exchange.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/exchange/story',
    name:'exchangestory',
    component: () => import('../pages/Exchange/exchangeStatus/exchangeStatus.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/test',
    name:'test',
    component: () => import('../pages/test.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/writer',
    name:'Writer',
    component: { render: h => h('router-view') },
    children: writer
  },
  {
    path:'/profile',
    name:'Profile',
    component: { render: h => h('router-view') },
    children: profile
  },
  {
    path:'/treasury',
    name:'Treasury',
    component: () => import('../pages/treasury/Treasury.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/treasury',
    name:'Treasury',
    component: () => import('../pages/treasury/Treasury.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/search',
    name:'Search',
    component: () => import('../pages/search/Search.vue'),
  },
  {
    path:'/wallet/walletconfirm/:id',
    name:'walletconfirm',
    component: () => import('../pages/wallet/WalletModal/WalletConfirm/WalletConfirm.vue'),
    meta:{ requiresAuth: true }
  },
  {
    path:'/f',
    name:'sd',
    component: () => import('../pages/fac.vue'),
  },

  // ________________________________________________pages_error______________________________________________________

  {
    path: '/:catchAll(.*)',
    name:'NotFound',
    component:NotFound
  }

]
// abstract
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( async (to, from, next)=>{
  document.title = 'Novel Kingdom'
  const loggedIn: boolean | undefined =  store.getters.loggedIn
  if(to.meta?.requiresAuth === true ){
    if(loggedIn === false){
      const login_crad = document.getElementsByClassName("login-crad")[0] as HTMLElement
      const login = document.getElementsByClassName("login")[0] as HTMLElement
      login_crad.classList.add("login-crad-show")
      login.classList.add("show")
    }else{
      await  next()
      if(to.hash === ""){
        // window.scrollTo(0, 0);
      }
      
    }
  }else{
    await next()
    // window.scrollTo(0, 0);
    
  }
})



export default router


