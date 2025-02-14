import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Settings from './views/Settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes:[
    {
      path: '/',
      name:'home',
      component: Home
    },
    {
      path: '/settings',
      name:'settings',
      component: Settings
    },
    {
      path: '*',
      redirect:{
        name: 'home'
      }
    }
  ]
})