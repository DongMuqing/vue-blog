// 导入 vue
import Vue from 'vue'
// 导入 vuex
import Vuex from 'vuex'
// vuex也是vue的插件, 需要use一下, 进行插件的安装初始化
Vue.use(Vuex)

// 创建仓库 store
const store = new Vuex.Store({
  //严格模式
  strict:true,
  state:{
    //登录的用户信息  弃用localStorage
    userInfo:{

    }
  },
  mutations:{
    //接收用户信息
    handleUserInfo (state, info) {
      state.userInfo=info
    },
}
})

// 导出仓库
export default store