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
html,
body {
  margin: 0;
  padding: 0;
  background-color: var(--bgc);
}

body::-webkit-scrollbar {
  display: none;
}
</style>