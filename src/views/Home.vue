<template>
  <div class="all">
    <Left></Left>
    <Center></Center>
    <Right></Right>
  </div>
</template>

<script>
import Left from '@/components/Left.vue'
import Center from '@/components/Center.vue'
import Right from '@/components/Right.vue'
export default {
components:{
    Left,
    Center,
    Right
},
}
</script>

<style lang="less" scoped>
.all{
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}

</style>