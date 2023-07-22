import axios from '@/utils/request' 

const address = {
    // 1. 获取所有
    getAddress: () => axios({
      url: '/ip/address',
      method: 'get'
    }),
}

export default address
