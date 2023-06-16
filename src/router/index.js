import Vue from 'vue'
import VueRouter from 'vue-router'
// import axios from "axios"



import dynamic from '@/views/Dynamic.vue'
import home from '@/views/Home.vue'
import article from '@/views/Article.vue'
import Friendlink from '@/views/Friendlink.vue'
import leavemessage from '@/views/Leavemessage.vue'
import login from '@/views/Login.vue'
import audio from '@/views/Audio.vue'
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
    {path: '/audio',component: audio},
    {
      path: '/home', component: home,
      children: [
        { path: '', component: dynamic },
        { path: 'dynamic', component: dynamic },
        { path: 'article', component: article },
        { path: 'friendlink', component: Friendlink },
        { path: 'leavemessage', component: leavemessage }
      ]
    },



    // {path:'/main',component:main,
    // children:[
    //   {path:'',component:home},
    // ]
    // },
  ]
})

export default router
