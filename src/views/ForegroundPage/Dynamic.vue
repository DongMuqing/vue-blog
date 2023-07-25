<template>
  <div class="main">
    <div v-for="dynamic in dynamic" :key="dynamic.id" class="article">

      <div class="list_user_meta">
        <div class="headpic"><img src="../../assets/logo.png"></div>
        <div class="name-time">
          <p> 冬木青</p>
          <p> {{ dynamic.createTime }}</p>
        </div>
      </div>

      <div class="blog_content">
        <div class="p_title">
          <p>{{ dynamic.title }}</p>
        </div>
        <div class="t_content">
          <p>{{ dynamic.content }}</p>
        </div>

        <div class="demo-image__preview" >
          <template v-for="src in dynamic.imgSrclist">
          <el-image style="width: 100px; height: 100px" :src="src" :preview-src-list="dynamic.imgSrclist">
          </el-image>
        </template>
        </div>

        <span class="ip_loca"><img src="../../assets/img/地址.png" alt="">{{ dynamic.location }}</span>
      </div>


      <div class="entry-footer">
        <div class="left">
          <img src="../../assets/img/点赞.png" alt="">
          <img src="../../assets/img/分享.png" alt="">
        </div>
        <div class="right">评论</div>
      </div>
    </div>
  </div>
</template>

<script>
import dynamics from '@/api/dynamic';
export default {
  data() {
    return {
      dynamic: [
      ],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    }
  },

  methods: {
    fetchDynamcis() {
      dynamics.getDynamics()
        .then(response => {
          // 处理接口返回的数据
      const data = response.data.data;
      // 遍历动态数组，将每个动态对象的 `imgSrclist` 转换为数组
      data.forEach(dynamic => {
        dynamic.imgSrclist = dynamic.imgSrclist.split(",").map(item => item.trim().replace(/'/g, ''));
      });

      this.dynamic = data;

        })
        .catch(error => {
          // 处理错误
        });
    }
  },
  mounted() {
    this.fetchDynamcis();
  },
  components: {
    
  },
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 10px;
  padding: 40px 0;
  border-bottom: 1px solid #ebf2ed;
  background-color: var(--bgc--center);

  .article {
    margin-bottom: 40px;

    .list_user_meta {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      position: relative;

      .headpic {
        img {
          width: 80px;
          height: 80px;
        }
      }

      .name-time {
        width: 100px;
        height: 40px;

        p {
          margin: 0 0 10px 0;
          color: var(--pColor);
        }
      }
    }

    .blog_content {
      @media screen and (max-width: 600px) {
        margin: 0 30px;
      }

      margin-left: 80px;
      margin-right: 80px;
      //文本进行换行
      white-space: pre-line;

      span {
        color: var(--pColor);
      }

      p {
        color: var(--pColor);
      }

      .t_content {
        word-break: break-all;
        color: #0d0d0d;
        margin-bottom: 5px;
        white-space: pre-wrap;
      }
    }
  }

  .entry-footer {
    width: 450px;
    height: 40px;
    margin-left: 80px;
    margin-top: 30px;
    background-color: var(--entry--footer);
    border-radius: 30px;

    @media screen and (max-width: 1200px) {
      width: 40vw;
    }

    @media screen and (max-width: 600px) {
      margin: 30px 30px 0px 40px;
      width: 80vw;
    }

    .left {
      width: 200px;

      img {
        margin: 10px 15px;
        padding-right: 10px;
      }
    }

    .right {
      float: right;
      margin-top: -30px;
      margin-right: 10px;
    }
  }

}
</style>