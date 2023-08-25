<template>
  <!-- <div @click="clicks"> -->
    <div >
     <!-- 加载动画 -->
     <!-- <loading id="loading-animation"/> -->
    <!-- 路由占位 -->
    <router-view></router-view>
  </div>
</template>

<script>
import loading from '@/views/ForegroundPage/Loading.vue'
//引入点击特效会使用户卡断
// import {clickEffect} from '@/utils/click'
export default {
  components:{
    loading
  },
  methods: {
    // clicks(){
    //   clickEffect()
    // }
  },
}
</script>

<style lang="less" >
html,
body {
  margin: 0;
  padding: 0;
  background-color: var(--bgc);
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 20px;
}

body::-webkit-scrollbar {
  display: none;
}
#loading-animation{
  display: none;
  background: linear-gradient(to top,#70b9f1,#1e3c55);
}
</style>