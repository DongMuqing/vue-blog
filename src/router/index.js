import Vue from 'vue'
import VueRouter from 'vue-router'


import home from '@/views/Home.vue'

// Vue.prototype.$axios = axios
//解决router重复push一样的hash地址
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
 
]

const router =new VueRouter({
  //打包方式
  // mode:'hash',
    //去掉#
  mode: 'history',
  routes:[
    //重定向
    {path:'/',redirect:'/home'},
    {path: '/home',component: home},
    // {path:'/main',component:main,
    // children:[
    //   {path:'',component:home},
    // ]
    // },
  ]
})

export default router
