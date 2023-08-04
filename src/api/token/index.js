import axios from '@/utils/request' 

const satoken=localStorage.getItem("satoken")
const token = {
    // 1. 获取所有
    getToken: () => axios({
      url: '/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/json' ,// 添加Content-Type请求头
        'satoken':satoken
      },
    }),
  
}

export default token
