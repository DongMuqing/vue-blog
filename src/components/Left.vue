<template>
  <div class="left">
    <div class="logo">
       <img src="../assets/logo.png" alt="">
    </div>

    <div class="nav">
      
        <el-menu :default-active="'1-4-1'.toString()" class="el-menu-vertical-demo" 
        @open="handleOpen" @close="handleClose" :collapse="isCollapses"
        background-color=var(--bgc--left)
        text-color="#fff"
        active-text-color="#ffd04b"
        > 
           <!-- //循环没有子菜单的 -->
          <el-menu-item @click="clickMenu(item)" v-for="item in  noChildren" :key="item.name" :index="item.name">
              <!-- 模板语法拼接  渲染图标-->
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
          </el-menu-item>
  
          <el-submenu  v-for="item in  hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
              <i :class="`el-icon-${item.icon}`"></i>
              <span slot="title">{{ item.label }}</span>
            </template>
  
            <!-- 渲染二级菜单 -->
            <el-menu-item-group @click="clickMenu(items)" v-for="items in item.children" :key="items.name" >
              <!-- <span slot="title">{{ items.name }}</span> -->
              <el-menu-item :index="items.path">{{ items.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

        <button @click="changetheme"><img :src='themeFlag?light:dark'></button>
    </div>

    
  </div>
</template>

<script>
import bus  from "./EventBus"
 export default {
    data() {
      return {
        // 接收的数据
        isCollapses:false,
        //默认主题
        currentTheme: "default-theme",
        //主题图标flag
        themeFlag:true,
        light:require('@/assets/img/sun.png'),//light
        dark:require('@/assets/img/moon.png'),//dark
        //列表数据
        menuData:[
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '博客',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '专题',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        // {
        //   label: '其他',
        //   icon: 'location',
        //   children: [
            {
              path: '/page1',
              name: 'page1',
              label: '邻居',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '留言',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      // ]
      // };
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      // 点击切换的实现
      clickMenu(chan){
         // 当页面的路由与跳转的路由不一致才允许跳转
        //  if (this.$route.path !== chan.path && !(this.$route.path === '/home' && (chan.path === '/'))) {
            this.$router.push('/main'+chan.path)
      // }
      },
      //切换主题
      changetheme(){
        if (this.currentTheme === "default-theme") {
          this.currentTheme = "alternative-theme";
          const themeEl = document.querySelector('.theme')
          themeEl?.setAttribute('href','../theme/dark.css')
          //主题图标flag
          this.themeFlag=!this.themeFlag
        } else {
          this.currentTheme = "default-theme";
          const themeEl = document.querySelector('.theme')
          themeEl?.setAttribute('href','../theme/light.css')
          this.themeFlag=!this.themeFlag
        }
      },
    },
    //计算是否有子菜单
    computed:{
        noChildren(){
            return this.menuData.filter(item =>!item.children)
        },
        hasChildren(){
            return this.menuData.filter(item =>item.children)
        },
        //展示菜单
        isCollapse(){
          return this.$store.state.tab.isCollapse
        }
    },
    created(){
      // 将从Header接收到的数据存入本组件
      bus.$on('share', val => {
        // console.log("接收的数据val为："+val);
      this.isCollapses = val
    })
    }
  }
</script>
<style lang="less" scoped>
.left{
    width: 295px;
    height: 100vh;
    background-color: var(--bgc--left);
    .logo{
        height: 78px;
        img{
            width: 70px;
            height: 70px;
            border-radius: 2px;
            margin: 10px 50px;
        }
    }
    .nav{
        height: 392px;
        line-height: 24px;
        margin: 20px 0px;
        padding: 0px 40px 20px;
        .el-menu{
           
            border: none;
             .el-menu-item{
                span{
                    color: var(--textColor);
                    margin-left: 10px;
                    padding-top: 5px;
                    font-family: 微软雅黑;
                }
            };
        ul{
            line-height:24px;
            margin:20px 0px;
            padding:0px 40px 20px;
           
            }; 
            li{
                list-style: none;
                align-items:
                center;
                border-radius:
                12px;
                box-shadow:
                #000000 0px 0px 0px 0px;
                display:
                flex;
                font-family:
                eafont;
                justify-content:
                flex-start;
                line-height:
                24px;
                margin:
                0px 0px 5px;
                padding:
                12px 15px;
                text-align:
                left;
            }
        }
    }
}
</style>>

