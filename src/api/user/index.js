import axios from '@/utils/request'

const users = {
    // 1. 获取所有
    login: (loginInfo) => axios({
      url: '/user',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8' ,
        // 添加Content-Type请求头
      },
      data: JSON.stringify(loginInfo) ,
    }),
    logout:() => axios({
      url:'/user/logout',
      method:'post',
      headers:{
        'satoken':localStorage.getItem("satoken")
      }
    })
}

export default users
