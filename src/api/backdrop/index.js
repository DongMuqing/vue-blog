import axios from '@/utils/request'
import qs from 'qs' 

const backdrops = {
    // 1. 获取所有
    getBackdrops: () => axios({
      url: '/backdrop',
      method: 'get'
    }),
}

export default backdrops
