import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Wechat from '@/components/Wechat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/wechat',
      name: 'wechat',
      component: Wechat
    }
  ]
})
