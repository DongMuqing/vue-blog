<template>
  <div class="info">
   
  <weathers></weathers>
  </div>
</template>

<script>
import weather from '../api/weather';
import weathers from '@/views/weathe.vue';

export default {
  components:{
    weathers
  },
  data(){
    return {
      province:"",
      weather:[]
    }
  },
  methods:{
    fetchWeather() {
      weather.getWeather()
        .then(response => {
          // 处理接口返回的数据
      const data = response.data.data.forecasts[0].casts;
      this.weather= data;
      this.province=response.data.data.forecasts.city;
        })
        .catch(error => {
          // 处理错误
        });
    }
  },
  mounted() {
    this.fetchWeather() 
  },
}
</script>

<style lang="less" scoped>
.info {
  @media screen  and (max-width: 1440px) {
    display:none
  }
  width: 295px;
  height: 100vh;
  background-color: var(--bgc--right);
}
</style>