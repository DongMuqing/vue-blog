import axios from '@/utils/request' 
import qs from 'qs' 

const dynamics = {
    // 1. 获取所有
    getDynamics: () => axios({
      url: '/dynamic/DynamicAndComment',
      method: 'post'
    }),
}

export default dynamics
