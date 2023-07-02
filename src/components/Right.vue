<template>
  <div class="info">
    <div class="weather" v-for="(weather,index) in  weather" :key="index">
        <p>日期:{{ weather.date}}</p>
        <p> 星期:{{weather.week}}</p>
        <p>白天温度:{{weather.daytemp}}°C</p>
    </div>
  <weathers></weathers>
  </div>
</template>

<script>
import address from '@/api/address';
import weather from '../api/weather';
import weathers from '@/views/weathe.vue';

export default {
  components:{
    weathers
  },
  data(){
    return {
      province:[],
      weather:[]
    }
  },
  methods:{
    //查询当前所在地 然后根据地址查询天气 需要异步进行
    async  fetchAddress() {
      try {
      const response = await address.getAddress();
      // 处理接口返回的数据
      this.province = response.data.province;
    } catch (error) {
      // 处理错误
    }
    },
    async fetchWeather() {
      try{
        await this.fetchAddress();
        const response = await weather.getWeatherByCity(this.province);
      // 处理接口返回的数据
      this.weather = response.data.forecasts[0].casts;
      }
        catch(error ) {
          // 处理错误
    }},
  },
  mounted() {
    // this.fetchWeather() ;
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