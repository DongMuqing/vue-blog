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
import articlecontent from '@/views/ForegroundPage/ArticleContent.vue'
import notfound from '@/views/ForegroundPage/404.vue'

import homes from '@/views/BackgroundPage/Home.vue'
import main from '@/views/BackgroundPage/Main.vue'
import dynamics from '@/views/BackgroundPage/dynamic.vue'
import user from '@/views/BackgroundPage/User.vue'
import VisitorInfo from '../views/BackgroundPage/VisitorInfo.vue'
import attracts from '@/views/BackgroundPage/Attract.vue'

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
    {
      path: '/main', component: main,
      children: [
        { path: '', component: homes },
        { path: 'home', component: homes },
        { path: 'dynamic', component: dynamics },
        { path: 'attract', component: attracts },
        { path: 'user', component: user },
        { path: 'visitorInfo', component: VisitorInfo },
      ]
    },
    {
      path: '/home', component: home,
      children: [
        { path: '', component: dynamic },
        { path: 'dynamic', component: dynamic },
        { path: 'article', component: article },
        //文章详情页
        // vue-router.esm.js:16 [vue-router] missing param for named route "article": Expected "id" to be defined
        //动态路由需要在末尾加？
        { path: 'article/:id?', name: 'article', component: articlecontent, props: true },
        { path: 'friendlink', component: Friendlink },
        { path: 'leavemessage', component: leavemessage },
        { path: 'weather', component: weather },
        { path: '/subfriend', component: friendlinks },
       
      ]
    },
    //做404跳转
    {path:'*',component:notfound}
  ]
})
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  //所有子页面都需要在这
  // const satoken = localStorage.getItem("satoken")
  const pathArr = ['/main', '/main/home', '/main/dynamic', '/main/user', '/main/attract', '/main/VisitorInfo']
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