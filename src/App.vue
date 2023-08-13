<template>
  <div>
    <!-- 路由占位 -->
    <router-view></router-view>
    
  </div>
</template>

<script>
export default {
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
</style>