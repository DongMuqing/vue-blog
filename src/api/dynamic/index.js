import axios from '@/utils/request' 
import qs from 'qs' 

const dynamics = {
    // 1. 获取所有
    getDynamics: () => axios({
      url: '/post/DynamicAndComment',
      method: 'post',
    }),
    //点赞
    Upvote: (num) => axios({
      url: '/post/upvote',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8' ,
      },
      data: JSON.stringify(num) ,
    }),
   delPost: (id) => axios({
    url: '/post/delete',
    method: 'delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken':localStorage.getItem("satoken")
    },
    data:JSON.stringify(id)
  }),
  submitPost: (post) => axios({
    url: '/post',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken':localStorage.getItem("satoken")
    },
    data:JSON.stringify(post)
  }),
}

export default dynamics
