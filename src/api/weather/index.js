import axios from '@/utils/request' 

const weather = {
    getWeather: () => axios({
        url: '/weather',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // 添加Content-Type请求头
        },
      }),
      getActualWeather: () => axios({
        url: '/weather/base',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        }
      }),
}

export default weather
