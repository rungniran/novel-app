/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const profile = [
  {
    path:'/profile/:username/writer',
    name:'Profilewriter',
    component: () => import('../pages/profile/profilewriter/ProfileWriter.vue'),
    // meta:{ requiresAuth: true }
  },
    {
    path:'/profile/:username',
    name:'Profile',
    component: () => import('../pages/profile/Profile.vue'),
    // meta:{ requiresAuth: true }
  },
]