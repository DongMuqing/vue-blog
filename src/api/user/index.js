import axios from '@/utils/request' // axios 实例引入（第五节封装的）
import qs from 'qs' 

const menus = {
    // 1. 获取所有
    getMenus: () => axios({
      url: '/menu',
      method: 'get'
    }),
}

export default menus
