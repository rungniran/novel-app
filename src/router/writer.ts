/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const writer = [
    {
      path:'',
      name:'CreateNovel',
      component: () => import('../pages/writer/writer.vue'),
      meta:{ requiresAuth: true, writerAuth:true }
    },
    {
      path:'createnovel/:type/:id',
      name:'CreateNovel',
      component: () => import('../pages/writer/createnovel/CreateNovel.vue'),
      meta:{ requiresAuth: true, writerAuth:true }
    },
    {
      path:'editnovel/:type/:id/:idnovel',
      name:'CreateNovel',
      component: () => import('../pages/writer/createnovel/CreateNovel.vue'),
      meta:{ requiresAuth: true, writerAuth:true }
    },
  
    {
      path:'/writer/howtonovel',
      name:'HowToNovel',
      component: () => import('../pages/writer/howtonovel/HowToNovel.vue'),
      meta:{ requiresAuth: true, writerAuth:true }
    },

    {
      path:'novelpreview/:id',
      name:'NovelPreview',
      component: () => import('../pages/writer/novelpreview/NovelPreview.vue'),
      meta:{ requiresAuth: true, writerAuth:true }
    },
    {
      path:'novelpreview/:id/novelep',
      name:'NovelEp',
      component: () => import('../pages/writer/novelpreview/novelep/NovelEp.vue'),
      meta:{ requiresAuth: true, writerAuth:true }
    },
    {
      path:'/howtopromotion',
      name:'howtopromotion',
      component: () => import('../pages/writer/howtousepromotion/HowTousePromotion.vue'),
    },
    {
      path:'novelpreview/:id/novelep/:idEP',
      name:'EditNovelEp',
      component: () => import('../pages/writer/novelpreview/novelep/NovelEp.vue'),
      meta:{ requiresAuth: true, writerAuth:true  }
    },
    {
      path:'WriterWithdrawMoney',
      name:'EditNovelEp',
      component: () => import('../pages/writer/WriterWithdrawMoney/WriterWithdrawMoney.vue'),
      meta:{ requiresAuth: true, writerAuth:true  }
    },
  ]


