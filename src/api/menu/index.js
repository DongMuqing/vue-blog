import axios from '@/utils/request' 


const menus = {
    // 1. 获取所有
    getMenus: () => axios({
      url: '/menu',
      method: 'GET'
    }),
    getMenu: () => axios({
      url: '/menu/after',
      method: 'GET',
      headers:{
        'satoken':localStorage.getItem("satoken")
      }
    }),
}

export default menus
