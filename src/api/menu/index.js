import axios from '@/utils/request' 


const menus = {
    // 1. 获取所有
    getMenus: () => axios({
      url: '/menu',
      method: 'get'
    }),
    getMenu: () => axios({
      url: '/menu/after',
      method: 'get',
      headers:{
        'satoken':localStorage.getItem("satoken")
      }
    }),
}

export default menus
