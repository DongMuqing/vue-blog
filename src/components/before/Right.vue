<template>
  <div class="info">

    <weathers></weathers>
  </div>
</template>

<script>
import weathers from '@/views/ForegroundPage/weathe.vue';
export default {
  components: {
    weathers
  },
  data() {
    return {
      city: "",
      weather: []
    }
  },
  methods: {
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
.info {
  width: 295px;
  height: 100vh;
  background-color: var(--bgc--right);
  @media screen and (max-width: 1440px) {
    display: none
  }
}
</style>