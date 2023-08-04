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
import friendlinks from '@/views/ForegroundPage/SubmitFriendlink.vue'

import homes from '@/views/BackgroundPage/Home.vue'
import main from '@/views/BackgroundPage/Main.vue'
import mall from '@/views/BackgroundPage/Mall.vue'
import user from '@/views/BackgroundPage/User.vue'
import pageone from '../views/BackgroundPage/PageOne.vue'
import pagetwo from '@/views/BackgroundPage/PageTwo.vue'

import tokens from '../api/token/index'
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
    { path: '/login', component: login },
    {path:'/main',component:main,
    children:[
      {path:'',component:homes},
      {path:'home',component:homes},
      {path:'mall',component:mall},
      {path:'user',component:user},
      {path:'page1',component:pageone},
      {path:'page2',component:pagetwo}
    ]
    },
    {
      path: '/home', component: home,
      children: [
        { path: '', component: dynamic },
        { path: 'dynamic', component: dynamic },
        { path: 'article', component: article },
        { path: 'friendlink', component: Friendlink },
        { path: 'leavemessage', component: leavemessage },
        { path: 'weather', component: weather },
        { path: '/subfriend', component: friendlinks },
      ]
    },
  ]
})
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  //所有子页面都需要在这
  // const satoken = localStorage.getItem("satoken")
  const pathArr = ['/main', '/main/home', '/main/mall', '/main/user', '/main/pageone', '/main/pagetwo']
  if (pathArr.indexOf(to.path) != -1) {
    tokens.getToken()
      .then(response => {
        //已经登录则放行
        if (response.data.code == 20041) {
          next()
        } else {
          // token无效清除token  跳转登录页面
          window.localStorage.removeItem('satoken')
          next('/login')
        }
      })
  } else {
    //不是后台主页 放行404页面
    next()
  }
})
export default router