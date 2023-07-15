// import axios from '@/utils/request' // axios 实例引入（第五节封装的）
import axios from 'axios'

const address = {
    // 1. 获取所有
    getAddress: () => axios({
      url: '',
      method: 'get'
    }),
}

export default address
