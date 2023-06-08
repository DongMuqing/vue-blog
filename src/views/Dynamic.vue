<template>
    <div>
      <p>动态</p>
      <div v-for="(article,index) in articleList" :key="index">
        1231
      </div>
    </div>
  </template>
  
  <script>
  export default {
  data(){
    return{
      articleList:[
      
      {
        time:'2022-02-02',
        content:'213123'
      },
      {
        time:'2022-02-02',
        content:'213123'
      },
      {
        time:'2022-02-02',
        content:'213123'
      },
      {
        time:'2022-02-02',
        content:'213123'
      }
    ]
    }
    
  },
  }
  </script>
  
  <style lang="less" scoped>
  .main{
    width: 510px;
    margin-left: 40px;
    background-color: pink;
  }
  </style>