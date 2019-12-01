import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(["@/components/index"], resolve),
    },
    {
      path: '/star',
      name: 'star',
      component: resolve => require(["@/components/star"], resolve),
    },
    {
      path: '/guestDetail',
      name: 'guestDetail',
      component: resolve => require(["@/components/detail"], resolve),
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(["@/components/search"], resolve),
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: resolve => require(["@/components/searchResult"], resolve),
    },
  ]
});



export default router;
