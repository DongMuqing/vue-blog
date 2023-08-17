<template>
    <div>
      <el-container>
          <el-aside width="auto">
            <CommonAsid>
              
            </CommonAsid>
          </el-aside>
          <el-container>
            <el-header>
              <CommonHeader>

              </CommonHeader>
            </el-header>
            <el-main>
              <!-- 路由出口，将匹配到的路由页面渲染到这里 -->
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive">
              
                </router-view>
              </keep-alive>
            
            </el-main>
          </el-container>
        </el-container>
    </div>
  </template>
  
  <script>
import CommonAsid from '@/components/after/CommonAsid.vue';
import CommonHeader from '@/components/after/CommonHeader.vue';
  export default {
      data(){
          return{
  
          }
      },
      components:{
          CommonAsid,
          CommonHeader,
      }
  }
  </script>
  
  <style lang="less" scoped>
  .el-header{
    padding: 0 0;
  }

  </style>