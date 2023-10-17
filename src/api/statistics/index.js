import axios from '@/utils/request' 


const statistics = {
    // 1. 获取所有
    getStatistics: () => axios({
      url: '/statistics',
      method: 'POST'
    }),
}

export default statistics 
