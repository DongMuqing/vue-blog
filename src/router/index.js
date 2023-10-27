import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'; // 导入Element UI的消息通知
// import axios from "axios"


// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，这样就更加高效了。
// 结合 Vue 的异步组件 (opens new window)和 Webpack 的代码分割功能 (opens new window)，轻松实现路由组件的懒加载。
const Post = () => import('@/views/ForegroundPage/Post.vue')
const home = () => import('@/views/ForegroundPage/Home.vue')
const article = () => import('@/views/ForegroundPage/Article.vue')
const Friendlink = () => import('@/views/ForegroundPage/Friendlink.vue')
const leavemessage = () => import('@/views/ForegroundPage/Leavemessage.vue')
const login = () => import('@/views/BackgroundPage/Login.vue')
const weather = () => import('@/views/ForegroundPage/weathe.vue')
const friendlinks = () => import('@/views/ForegroundPage/SubmitFriendlink.vue')
const articlecontent = () => import('@/views/ForegroundPage/ArticleContent.vue')
const notfound = () => import('@/views/ForegroundPage/404.vue')
const loading = () => import('@/views/ForegroundPage/Loading.vue')

const homes = () => import('@/views/BackgroundPage/Home.vue')
const main = () => import('@/views/BackgroundPage/Main.vue')
const post = () => import('@/views/BackgroundPage/Post.vue')
const user = () => import('@/views/BackgroundPage/User.vue')
const VisitorInfo = () => import('../views/BackgroundPage/VisitorInfo.vue')
const attracts = () => import('@/views/BackgroundPage/Attract.vue')
const comments = () => import('@/views/BackgroundPage/Comment.vue')
const upload = () => import('@/views/BackgroundPage/Upload.vue')
import tokens from '../api/open/token'
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
    { path: '/loading', component: loading },
    {
      path: '/main', component: main,
      children: [
        { path: '', component: homes ,meta: {keepAlive: true }},
        { path: 'home', component: homes ,meta: {keepAlive: true }},
        { path: 'post', component: post  ,meta: {keepAlive: true }},
        { path: 'attract', component: attracts  ,meta: {keepAlive: true }},
        { path: 'user', component: user  ,meta: {keepAlive: true }},
        { path: 'visitorInfo', component: VisitorInfo  ,meta: {keepAlive: true }},
        { path: 'comment', component: comments  ,meta: {keepAlive: true }},
        { path: 'upload', component: upload , meta: {keepAlive: true }}
      ]
    },
    {
      path: '/home', component: home,
      children: [
        { path: '', component: Post,meta: {keepAlive: true } },
        { path: 'post', component: Post ,meta: {keepAlive: true }},
        { path: 'article', component: article ,},
        //文章详情页
        // vue-router.esm.js:16 [vue-router] missing param for named route "article": Expected "id" to be defined
        //动态路由需要在末尾加？
        { path: 'article/:id?', name: 'article', component: articlecontent, props: true },
        { path: 'friendlink', component: Friendlink ,meta: {keepAlive: true }},
        { path: 'leavemessage', component: leavemessage ,meta: {keepAlive: true }},
        { path: 'weather', component: weather ,meta: {keepAlive: true }},
        { path: '/subfriend', component: friendlinks ,meta: {keepAlive: true }},
      ]
    },
    //做404跳转
    { path: '*', component: notfound }
  ]
})
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  //所有子页面都需要在这
  // const satoken = localStorage.getItem("satoken")
  const pathArr = ['/main', '/main/home', '/main/dynamic', '/main/user', '/main/attract', '/main/VisitorInfo', '/main/comment', '/main/upload','/main/submitpost']
  if (pathArr.indexOf(to.path) != -1) {
    tokens.getToken()
      .then(response => {
        //已经登录则放行
        if (response.data.code == 20041) {
          next()
        } else {
          // token无效清除token  跳转登录页面
          localStorage.removeItem('satoken')
          next('/login')
          Message({
            message:"请先登录！",
            type: 'warning'
          });
        }
      })
  } else {
    //不是后台主页 放行404页面
    next()
  }
})
export default router