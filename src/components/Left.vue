<template>
  <div class="left" v-show="isCollapses">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="nav">
      <el-menu :default-active="'1-4-1'.toString()" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        background-color=var(--bgc--left) text-color="#fff" active-text-color="#ffd04b">
        <!-- //循环没有子菜单的 -->
        <el-menu-item @click="clickMenu(item)" v-for="item in  noChildren" :key="item.name" :index="item.name">
          <!-- 模板语法拼接  渲染图标-->
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>

        <el-submenu v-for="item in  hasChildren" :key="item.label" :index="item.label">
          <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
          </template>

          <!-- 渲染二级菜单 -->
          <el-menu-item-group @click="clickMenu(items)" v-for="items in item.children" :key="items.name">
            <!-- <span slot="title">{{ items.name }}</span> -->
            <el-menu-item :index="items.path">{{ items.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

    <div class="theme">
      <button @click="changetheme('dark')">暗夜</button>
      <button @click="changetheme('light')">亮白</button>
      <button @click="changetheme('Freshgreen')">清新绿</button>
    </div>
 
    <div class="info">
    
        <a href=""><img src="../assets/img/qq.png" alt=""></a>
        <a href=""><img src="../assets/img/wechat.png" alt=""></a>
    
        <a href=""><img src="../assets/img/github.png" alt=""></a>
        <a href=""><img src="../assets/img/wechat.png" alt=""></a>
     
    </div>
    
  </div>
</template>

<script>
import bus from "./EventBus"
import menus from "@/api/menu";
export default {
  data() {
    return {
      // 接收的数据
      isCollapses:true,
      //默认主题
      currentTheme: "default-theme",
      //主题图标flag
      themeFlag: true,
      // light:require('@/assets/img/sun.png'),//light
      // dark:require('@/assets/img/moon.png'),//dark
      //列表数据
      menuData: [
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    fetchMenus() {
      menus.getMenus()
        .then(response => {
          // 处理接口返回的数据
          this.menuData = response.data.data;

        })
        .catch(error => {
          // 处理错误
        });
    },
    // 点击切换的实现
    clickMenu(chan) {
      // 当页面的路由与跳转的路由不一致才允许跳转
      //  if (this.$route.path !== chan.path && !(this.$route.path === '/home' && (chan.path === '/'))) {
      this.$router.push('/home' + chan.path)
      // }
    },
    //切换主题
    changetheme(th, e) {
      //在index.html获取此值
      const themeEl = document.querySelector('.theme')
      themeEl?.setAttribute('href', `../theme/${th}.css`)
    },
    checkDeviceSize() {
      // 获取设备宽度
      const deviceWidth = window.innerWidth || document.documentElement.clientWidth;
      // 判断设备宽度是否大于某个阈值（这里假设大于 768px 为大设备）
      if(deviceWidth < 768){
          this.isCollapses=false
      }else{
        this.isCollapses=true
      }
    },
  },
 
  //计算是否有子菜单
  computed: {
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    //展示菜单
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
  created() {
    // 将从Header接收到的数据存入本组件
    bus.$on('share', val => {
      console.log("接收的数据val为："+val);
      this.isCollapses = val
    }),
    // 监听窗口大小变化，当窗口大小发生变化时调用 checkDeviceSize 方法
    window.addEventListener('resize', this.checkDeviceSize);
  },
  beforeDestroy() {
    // 在组件销毁前移除窗口大小变化的监听
    window.removeEventListener('resize', this.checkDeviceSize);
  },
  mounted() {
    this.fetchMenus(),
    this.checkDeviceSize()
  },
}
</script>


<style lang="less" scoped>
.left {
  width: 295px;
  height: 100vh;
  background-color: var(--bgc--left);

  .logo {
    
    height: 78px;
    padding-left: 70px;
    img {
      
      width: 70px;
      height: 70px;
      border-radius: 2px;
      margin: 10px 50px;
    }
  }

  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 285px;
    line-height: 24px;
    margin: 20px 0px;
    padding: 0px 40px 20px;
    border-bottom: 2px solid;

    .el-menu {

      border: none;

      .el-menu-item {
        span {
          color: var(--textColor);
          margin-left: 10px;
          font-family: 微软雅黑;
        }
      }
      ul {
        line-height: 24px;
        margin: 20px 0px;
        padding: 0px 40px 20px;

      }
      li {
        list-style: none;
        align-items:center;
        border-radius:12px;
        box-shadow:#000000 0px 0px 0px 0px;
        display:flex;
        font-family:eafont;
        justify-content:flex-start;
        line-height:24px;
        margin:0px 0px 5px;
        padding:12px 15px;
        text-align:left;
      }
    }
  }

  .theme {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 2px solid;
    button {
      width: 65px;
      height: 30px;
      margin: 10px 15px;

    }
  }
  .info {
    display: flex;
    flex-wrap: wrap;
  }
  
  .row {
    display: flex;
    flex-basis: 50%;
  }
  
  .row a {
    flex-basis: 50%;
  }
  
  .row img {
    width: 100%; /* 让图片填满父容器的宽度 */
  }
  
}

</style>>

