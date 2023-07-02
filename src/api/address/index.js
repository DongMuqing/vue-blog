// import axios from '@/utils/request' // axios 实例引入（第五节封装的）
import axios from 'axios'

const address = {
    // 1. 获取所有
    getAddress: () => axios({
      url: 'https://restapi.amap.com/v3/ip?parameters&key=187dacc112e3d2a9f4e4c35f8f7d108f',
      method: 'get'
    }),
}

export default address
