<template>
  <div class="center">

    <div class="search">
      <a href=".#"><img src="../assets/img/更多.png" alt=""></a>
      <!-- <el-button style="margin-right: 20px" @click="sendMsg" icon="el-icon-menu" size="mini"></el-button> -->
      <input type="text" placeholder="文章 | Search">
    </div>

    <div class="individual">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(backdrop, index) in backdrops" :key="backdrop.id" v-show="index === selectedBackdropIndex">
          <li><img :src="backdrop.url" alt=""></li>
        </el-carousel-item>
      </el-carousel>

      <!-- <div v-for="(backdrop, index) in backdrops" :key="backdrop.id" v-show="index === selectedBackdropIndex">
        <li><img :src="backdrop.url" alt=""></li>
      </div> -->
    </div>
    <router-view>

    </router-view>

    <div class="record-author-info">
      <div>
        <a href="https://beian.miit.gov.cn">
          渝ICP备2023006053号-1
        </a>
      </div>
      <div>
        <a href="https://qingmumu.xyz">
          Copyright @ Dongmuqing 2023
        </a>
      </div>
    </div>

  </div>
</template>

<script>
import bus from "./EventBus"
import Dynamic from '@/views/Dynamic.vue'
import backdrops from '@/api/backdrop';
export default {
  data() {
    return {
      backdrops: [
        {
          id: '',
          url: ''
        }
      ],
      selectedBackdropIndex: 0, // 初始值为 0，显示第一个背景图
      isCollapse: true,//侧边栏状态
    }
  },
  methods: {
    fetchBackdrops() {
      backdrops.getBackdrops()
        .then(response => {
          // 处理接口返回的数据
          this.backdrops = response.data.data;
        })
        .catch(error => {
          // 处理错误
        });
    },
    sendMsg() {
      //将值取反发送给asid
      bus.$emit('share', this.isCollapse)
      this.isCollapse = !this.isCollapse
    },
  },
  mounted() {
    this.fetchBackdrops();
  },
  components: {
    Dynamic,
  },
}
</script>

<style lang="less" scoped>
.center {
  width: 590px;
  height: 100vh;
  background-color: var(--bgc--center);
  overflow-y: auto;

  @media screen and (max-width: 800px) {
    width: 80vw;
  }

  @media screen and (max-width: 600px) {
    width: 100vw;
  }

  .search {
    height: 72px;

    a {
      float: left;

      img {
        margin: 20px 20px;
      }
    }

    input {
      margin: 20px 5px;
      border-radius: 20px;
      color: var(--bgc--center);
      font-family: eafont;
      font-size: 13px;
      line-height: 19.5px;
      padding: 5px 15px 5px 52px;

    }
  }

  .individual {
    height: 270px;
    .el-carousel{
      overflow-x: visible;
    }
    li {
      list-style: none;

      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        /* 图片适应容器的尺寸，并保持比例 */
      }
    }


  }
}

.record-author-info {

  height: 200px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    a {
      text-decoration: none;
      display: inline-block;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: black;
    }
  }

}

/*overflow-y: auto;
可以实现部分组件滚动并隐藏滚动轴
*/
.center::-webkit-scrollbar {
  display: none;
}</style>