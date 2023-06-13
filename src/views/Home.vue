<template>
  <div>
    <div class="all">
      <Left></Left>
      <Center>
      </Center>
      <Right></Right>
    </div>
    <Bottom>
      
    </Bottom>
  </div>
  
</template>

<script>
import Left from '@/components/Left.vue'
import Center from '@/components/Center.vue'
import Right from '@/components/Right.vue'
import Bottom from '@/components/Bottom.vue'
export default {
  components: {
    Left,
    Center,
    Right,
    Bottom
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