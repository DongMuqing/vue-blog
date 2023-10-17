import axios from '@/utils/request' 


const friendlinks = {
    // 1. 获取所有
    getFriendlinks: () => axios({
      url: '/friendlink',
      method: 'GET'
    }),
    submitFriendlinks:(friendlinkInfo)=>axios({
      url: '/friendlink',
      method: 'POST',
      headers:{
        'Content-Type' : 'multipart/form-data'
      },
      data:friendlinkInfo
    })
}

export default friendlinks
