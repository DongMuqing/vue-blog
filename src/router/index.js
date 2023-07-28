import Vue from 'vue'
import VueRouter from 'vue-router'
// import axios from "axios"



import dynamic from '@/views/ForegroundPage/Dynamic.vue'
import home from '@/views/ForegroundPage/Home.vue'
import article from '@/views/ForegroundPage/Article.vue'
import Friendlink from '@/views/ForegroundPage/Friendlink.vue'
import leavemessage from '@/views/ForegroundPage/Leavemessage.vue'
import login from '@/views/BackgroundPage/Login.vue'
import weather from '@/views/ForegroundPage/weathe.vue'
// Vue.prototype.$axios = axios
//解决router重复push一样的hash地址
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [

]

const router = new VueRouter({
  //打包方式
  // mode:'hash',
  //去掉#
  mode: 'history',
  routes: [
    //重定向
    { path: '', redirect: '/home' },
    {path: '/login',component: login},
    {
      path: '/home', component: home,
      children: [
        { path: '', component: dynamic },
        { path: 'dynamic', component: dynamic },
        { path: 'article', component: article },
        { path: 'friendlink', component: Friendlink },
        { path: 'leavemessage', component: leavemessage },
        {path:'weather',component:weather}
      ]
    },
  ]
})

export default router
