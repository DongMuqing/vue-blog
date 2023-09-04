import axios from '@/utils/request' 

const address = {
    // 1. 获取所有
    // getAddress: () => axios({
    //   url: '/ip',
    //   method: 'get'
    // }),
    getVisitorInfo:()=>axios({
      url:'/ip/visitorInfo',
      method:'post'
    }),
    VisitorInfo:(current,size)=>axios({
      url:'ip/getVisitorInfo?current='+encodeURIComponent(current)+'&size='+encodeURIComponent(size),
      method:'post',
      headers:{
        'satoken':localStorage.getItem("satoken") 
      }
    })
}

export default address
