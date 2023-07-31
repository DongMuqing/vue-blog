import axios from '@/utils/request' 


const friendlinks = {
    // 1. 获取所有
    getFriendlinks: () => axios({
      url: '/friendlink',
      method: 'get'
    }),
  
}

export default friendlinks
