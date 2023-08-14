<template>
  <div>
     <!-- 加载动画 -->
     <loading id="loading-animation"/>
    <!-- 路由占位 -->
    <router-view></router-view>
  </div>
</template>

<script>
import loading from '@/views/ForegroundPage/Loading.vue'
export default {
  components:{
    loading
  }
}
</script>

<style lang="less" >
@font-face {
  font-family: '钢笔楷书';
  src: url('./assets/font/北风钢笔楷书.ttf');
}
@font-face {
  font-family: '方正';
  src: url('./assets/font/方正字迹-颜世举隶书体\ 简.TTF');
}
html,
body {
  margin: 0;
  padding: 0;
  background-color: var(--bgc);
  font-family: '钢笔楷书';
  font-size: 24px;
}

body::-webkit-scrollbar {
  display: none;
}
#loading-animation{
  display: none;
  background: linear-gradient(to top,#70b9f1,#1e3c55);
}
</style>