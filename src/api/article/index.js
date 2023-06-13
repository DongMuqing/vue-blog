import axios from '@/utils/request' // axios 实例引入（第五节封装的）
import qs from 'qs' 

const articles = {
    // 1. 获取所有
    getArticles: () => axios({
      url: '/article',
      method: 'get'
    }),
}

export default articles
