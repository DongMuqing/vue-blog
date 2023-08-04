import axios from '@/utils/request' 


const friendlinks = {
    // 1. 获取所有
    getFriendlinks: () => axios({
      url: '/friendlink',
      method: 'get'
    }),
    submitFriendlinks:(friendlinkInfo)=>axios({
      url: '/friendlink',
      method: 'post',
      headers:{
        'Content-Type' : 'multipart/form-data'
      },
      data:friendlinkInfo
    })
}

export default friendlinks
