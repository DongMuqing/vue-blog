import axios from '@/utils/request' 


const comments = {
    submitComments:(commentInfo)=>axios({
      url: '/comments/add',
      method: 'post',
      headers:{
        'Content-Type': 'application/json;charset=UTF-8' ,
        'satoken':localStorage.getItem("satoken")
      },
      data:JSON.stringify(commentInfo)
    })
}

export default comments
