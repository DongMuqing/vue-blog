import axios from '@/utils/requestOpen' 


const token = {
    getToken: () => axios({
      url: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' ,// 添加Content-Type请求头
        'satoken':localStorage.getItem("satoken")
      },
    }),
  
}

export default token
