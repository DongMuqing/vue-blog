import axios from '@/utils/request' 

const weather = {
    getWeather: () => axios({
        url: '/weather',
        method: 'post',
        headers: {
          'Content-Type': 'application/json' // 添加Content-Type请求头
        },
        // data: JSON.stringify(city) // 将city对象转换为JSON字符串作为请求体
      }),
}

export default weather
