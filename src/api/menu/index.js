import axios from '@/utils/request' 


const menus = {
    // 1. 获取所有
    getMenus: () => axios({
      url: '/menu',
      method: 'get'
    }),
    // getMobileMenus: () => axios({
    //   url: '/menu/mobile',
    //   method: 'post'
    // }),
}

export default menus
