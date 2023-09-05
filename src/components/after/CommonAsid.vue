<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
    <!-- 渲染菜单的时候将多余的删掉 -->
    <!-- 使用v-for渲染会自动创建 -->

    <el-menu :default-active="'1-4-1'.toString()" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      :collapse="isCollapses" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <h3>{{ isCollapses ? '后台' : '博客后台' }}</h3>
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
</template>

<script>
import menus from "@/api/menu"; 
import bus from "../EventBus"
export default {
  data() {
    return {
      // 接收的数据
      isCollapses: false,
      //列表数据
      menuData: [],
    }
  },
  methods: {
    fetchMenus() {
      menus.getMenu()
        .then(response => {
          // 处理接口返回的数据
          this.menuData = response.data.data;
        })
        .catch(error => {
          // 处理错误
        });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 点击切换的实现
    clickMenu(chan) {
      // 当页面的路由与跳转的路由不一致才允许跳转
      //  if (this.$route.path !== chan.path && !(this.$route.path === '/home' && (chan.path === '/'))) {
      this.$router.push('/main' + chan.path)
      // }
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
      // console.log("接收的数据val为："+val);
      this.isCollapses = val
    })
  },
  mounted(){
    this.fetchMenus()
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  border: none;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>