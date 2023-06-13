<template>
  <div class="all">
    <Left></Left>
    <Center>
    </Center>
    <Right></Right>
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
}
</style>