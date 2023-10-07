import axios from '@/utils/request'

const users = {
    // 登录 
    login: (loginInfo) => axios({
      url: '/user',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8' ,
        // 添加Content-Type请求头
      },
      data: JSON.stringify(loginInfo) ,
    }),
    //登出
    logout:() => axios({
      url:'/user/logout',
      method:'post',
      headers:{
        'satoken':localStorage.getItem("satoken")
      }
    }),
    sendCode:(email,username)=>axios({
      url:'/user/code?email='+encodeURIComponent(email)+'&username='+encodeURIComponent(username),
      method:'post',
      headers:{
        'Content-Type': 'application/json;charset=UTF-8' ,
      }
    }),
    register:(email,username,password,code) => axios({
      url:'/user/register?email='+encodeURIComponent(email)+'&username='+encodeURIComponent(username)+'&password='+encodeURIComponent(password)+'&code='+encodeURIComponent(code),
      method:'post',
      headers:{
        'Content-Type': 'application/json;charset=UTF-8' ,
      }
    }),
}

export default users
