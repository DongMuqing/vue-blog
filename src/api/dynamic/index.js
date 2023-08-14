import axios from '@/utils/request' 
import qs from 'qs' 

const dynamics = {
    // 1. 获取所有
    getDynamics: () => axios({
      url: '/dynamic/DynamicAndComment',
      method: 'post'
    }),
    //点赞
    Upvote: (num) => axios({
      url: '/dynamic/upvote',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8' ,
      },
      data: JSON.stringify(num) ,
    }),
  
}

export default dynamics
