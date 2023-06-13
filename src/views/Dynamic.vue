<template>
  <div class="main">
    <div v-for="article in articles" :key="article.id" class="article">

      <div class="list_user_meta">
        <div class="headpic"><img src="../assets/logo.png"></div>
        <div class="name-time">
          <p> 冬木青</p>
          <p> {{ article.createTime }}</p>
        </div>
      </div>

      <div class="blog_content">
        <div class="p_title">
          <p>标题</p>
        </div>
        <div class="t_content">
          <p>{{ article.content }}</p>
        </div>
        <span class="ip_loca">发布地点</span>
      </div>

      <div class="entry-footer">
        <div class="left">
          <img src="../assets/img/点赞.png" alt="">
          <img src="../assets/img/分享.png" alt="">
        </div>
        <div class="right">评论</div>
      </div>
    </div>
  </div>
</template>

<script>
import articles from '@/api/article';

export default {
  data() {
    return {
      articles: [
      ],
    }

  },
  methods: {
    fetchArticles() {
      articles.getArticles()
        .then(response => {
          // 处理接口返回的数据
          this.articles = response.data.data;
        })
        .catch(error => {
          // 处理错误
        });
    }
  },
  mounted() {
    this.fetchArticles();
  },
}
</script>

<style lang="less" scoped>
.main {
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
      margin-left: 80px;
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

}</style>