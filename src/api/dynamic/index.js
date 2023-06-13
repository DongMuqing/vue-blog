import axios from '@/utils/request' // axios 实例引入（第五节封装的）
import qs from 'qs' 

const dynamics = {
    // 1. 获取所有
    getDynamics: () => axios({
      url: '/dynamic',
      method: 'get'
    }),
}

export default dynamics
