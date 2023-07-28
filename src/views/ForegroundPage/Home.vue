<template>
  <div>
    <div class="all">
      <Left></Left>
      <Center>
      </Center>
      <Right></Right>
    </div>
    <!-- <div class="nav">
      <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="">
        <van-tabbar-item icon="home-o" >首页</van-tabbar-item>
        <van-tabbar-item icon="notes-o">文章</van-tabbar-item>
        <van-tabbar-item icon="search">搜索</van-tabbar-item>
        <van-tabbar-item icon="arrow-up">顶部</van-tabbar-item>
      </van-tabbar>
    </div> -->

  </div>
</template>

<script>
import Left from '@/components/Left.vue'
import Center from '@/components/Center.vue'
import Right from '@/components/Right.vue'

export default {
  components: {
    Left,
    Center,
    Right
  },
  data(){
    return{
      active: 'home',
    }
  },
}
</script>

<style lang="less" scoped>
.all {
  display: flex;
  margin-top: 60px;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  border-radius: 25px;
  overflow: auto;
  @media screen and (max-width: 600px) {
    margin-top: 0px;
  }
}

.nav {
  position: fixed;
  bottom: 0px;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  width: 100vw;
  height: 80px;
  @media screen  and (min-width: 1200px) {
    display:none
  }
}
</style>