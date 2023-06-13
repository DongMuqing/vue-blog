<template>
  <div class="center">

    <div class="search">
      <a href=".#"><img src="../assets/img/更多.png" alt=""></a>
      <input type="text" placeholder="文章 | Search">
    </div>

    <div class="individual" >
      <div v-for="(backdrop, index) in backdrops" :key="backdrop.id" v-show="index === selectedBackdropIndex">
        <li><img :src="backdrop.url" alt=""></li>
      </div>
    </div>
    <router-view>

    </router-view>
  </div>
</template>

<script>
import Dynamic from '@/views/Dynamic.vue'
import backdrops from '@/api/backdrop';
export default {
  data(){
    return {
      backdrops: [
  {
    id: '',
    url: ''
  }
],
selectedBackdropIndex: 0 // 初始值为 0，显示第一个背景图
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
  },
  mounted() {
    this. fetchBackdrops();
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
    li{
      list-style: none;
      img{
        width: 100%;
        height: 270px;
        object-fit: cover; /* 图片适应容器的尺寸，并保持比例 */
      }
    }
   
    
  }
}

/*overflow-y: auto;
可以实现部分组件滚动并隐藏滚动轴
*/
.center::-webkit-scrollbar {
  display: none;
}</style>