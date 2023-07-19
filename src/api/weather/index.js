import axios from '@/utils/request' 

const weather = {
    getWeather: () => axios({
        url: '/weather',
        method: 'get'
      }),
}

export default weather
