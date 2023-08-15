import axios from '@/utils/request' 


const statistics = {
    // 1. 获取所有
    getStatistics: () => axios({
      url: '/statistics',
      method: 'post'
    }),
}

export default statistics 
