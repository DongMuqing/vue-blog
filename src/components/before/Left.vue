<template>
  <div class="left" v-show="isCollapses">
    <!-- <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div> -->
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
      <h2>主题切换</h2>
      <el-button @click="changetheme('dark')">暗夜</el-button>
      <el-button @click="changetheme('light')">亮白</el-button>
      <el-button @click="changetheme('Freshgreen')">清新绿</el-button>
    </div>

    <div class="site">
      <h2>站点信息</h2>
      <li>
        <span>动态</span>
        <small>{{statistics[1]}}</small>
      </li>
      <li>
        <span>浏览</span>
        <small>{{statistics[0]}}</small>
      </li>
    </div>

    <div class="connection">
      <h2>联系我</h2>
      <a href="https://oss.qingmumu.xyz/Blog/QQandWeChat/qrcode_1690562973980.jpg"><img src="../../assets/img/qq.png"
          alt=""></a>
      <a href="https://oss.qingmumu.xyz/Blog/QQandWeChat/mmqrcode1690562985319.png"><img src="../../assets/img/wechat.png"
          alt=""></a>
      <a href="https://github.com/DongMuqing"><img src="../../assets/img/github.png" alt=""></a>
      <a href="https://space.bilibili.com/82114367"><img src="../../assets/img/bilibili.png" alt=""></a>
    </div>

    <!-- <div class="about">
      <h2>About Me</h2>
    </div> -->
  </div>
</template>

<script>
import bus from "../EventBus"
import menus from "@/api/menu";
import statistics from '@/api/statistics/index'
export default {
  data() {
    return {
      // 接收的数据
      isCollapses: true,
      //默认主题
      currentTheme: "default-theme",
      //主题图标flag
      themeFlag: true,
      // light:require('@/assets/img/sun.png'),//light
      // dark:require('@/assets/img/moon.png'),//dark
      //列表数据
      menuData: [
      ],
      statistics:[]
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
    fetchStatistics() {
      statistics.getStatistics()
        .then(response => {
          // 处理接口返回的数据
          this.statistics = response.data.data;
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
      if (deviceWidth < 768) {
        this.isCollapses = false
      } else {
        this.isCollapses = true
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
    this.checkDeviceSize(),
    this.fetchStatistics()
  },
}
</script>


<style lang="less" scoped>
.left {
  width: 295px;
  height: 100vh;
  background-color: var(--bgc--left);
  @media screen and (max-width: 600px) {
    width: 300vw;
  }
  
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
    .el-menu {

      border: none;

      .el-menu-item {
        span {
          color: var(--textColor);
          margin-left: 10px;
        }
      }

      ul {
        line-height: 24px;
        margin: 20px 0px;
        padding: 0px 40px 20px;

      }

      li {
        list-style: none;
        align-items: center;
        border-radius: 12px;
        box-shadow: #000000 0px 0px 0px 0px;
        display: flex;
        justify-content: flex-start;
        line-height: 24px;
        margin: 0px 0px 5px;
        padding: 12px 15px;
        text-align: left;
      }
    }
  }

  .theme {
    margin-left: 30px;

    h2 {
      color:
        #9098a7;
      font-size:
        14px;
      font-weight:
        600;
      line-height:
        21px;
      margin:
        0px 0px 15px;
    }

    .el-button {
      display: inline-block; /* 将按钮变为块级元素以设置宽度 */
      text-align: center;   /* 文本居中 */
      margin: 10px 15px;
      font-family: '钢笔楷书';
      background-color:var(--bgc);
      color: var(--span);
    }
  }

  .site {
    margin: 50px 0px 130px 30px;


    h2 {
      color: #9098a7;
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      margin: 0px 0px 15px;
    }

    li {
      float: left;
      width: 100px;
      height: 55px;
      align-items: flex-start;
      background-image: linear-gradient(90deg, #f6faf8, #816bff00);
      border-radius: 5px;
      box-shadow: #cadfd0 0px 8px 9px 0px;
      color: #404040;
      display: flex;
      flex-direction: column;
      line-height: 24px;
      margin: 0px 2px 10px;
      padding: 8px 12px 5px;
      text-align: left;

      span {
        color:var(--site) ;
        line-height: 21px;
        text-align: left;
      }

      small {
        color:var(--small) ;
        font-family: eafont;
        font-size: 16px;
        font-weight: 600;
        line-height: 21px;
        text-align: left;
      }
    }
  }

  .connection {
    margin-top: 100px;
    margin-left: 30px;

    h2 {
      color: #9098a7;
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      margin: 0px 0px 15px;
    }

    a {
      img {
        padding: 5px 30px 12px 0px;
      }
    }
  }

  .about {
    margin: 50px 0px 0px 30px ;
    h2 {
      color: #9098a7;
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      margin: 0px 0px 15px;
    }
  }
}
</style>>

