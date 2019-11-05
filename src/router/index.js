import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Wechat from '@/components/Wechat'
import Transfer from '@/components/Transfer'
import Taobao from '@/components/Taobao'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta:{
        title: '个人主页'
      }
    },
    {
      path: '/wechat',
      name: 'wechat',
      component: Wechat,
      meta:{
        title: '账单详情'
      }
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: Transfer,
      meta:{
        title: '账单详情'
      }
    },
    {
      path: '/taobao',
      name: 'taobao',
      component: Taobao,
      meta:{
        title: '账单详情'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;