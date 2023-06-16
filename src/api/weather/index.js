import axios from 'axios'

const weather = {
    // 1. 获取所有
    // getAddress: () => axios({
    //   url: 'https://restapi.amap.com/v3/ip?parameters&key=187dacc112e3d2a9f4e4c35f8f7d108f',
    //   method: 'get'
    // }),
    getWeatherByCity: (city) => axios({
        url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=##key##&extensions=all`,//all参数表示获取最近几天的天气
        method: 'get'
      }),
}

export default weather
