import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios"



import login from '../views/Login.vue'
import home from '@/views/Home.vue'
import main from '@/views/Main.vue'
import mall from '@/views/Mall.vue'
import user from '@/views/User.vue'
import pageone from '../views/PageOne.vue'
import pagetwo from '@/views/PageTwo.vue'


// Vue.prototype.$axios = axios
//解决router重复push一样的hash地址
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router =new VueRouter({
  //打包方式
  mode:'hash',
    //去掉#
  // mode: 'history',
  routes:[
    //重定向
    {path:'/',redirect:'/login'},
    {path: '/login',component: login},
    {path:'/main',component:main,
    children:[
      {path:'',component:home},
      {path:'home',component:home},
      {path:'mall',component:mall},
      {path:'user',component:user},
      {path:'page1',component:pageone},
      {path:'page2',component:pagetwo}
    ]
    },
  ]
})
// 全局前置守卫
// router.beforeEach(function(to,from,next){
//   //所有子页面都需要在这
//   const token=localStorage.getItem("token")
//   const pathArr=['/main','/main/home','/main/mall','/main/user','/main/pageone','/main/pagetwo']
//   if(pathArr.indexOf(to.path)!=-1){
//     //是后台主页需要 验证token
//     axios({
//       url:'http://localhost:81/token/test',
//       method:'get',
//       headers:{
//         token:token
//       }
//     }).then((response) => {
//       if(response.data.code==200){
//         //验证成功放行
//         next()
//       }else{
//         //token无效清除token  跳转登录页面
//         next('/login')
//         window.localStorage.removeItem('token')
//       }
//     })
//   }else{
//     //不是后台主页 放行404页面
//     next()
//   }
// })

export default router
