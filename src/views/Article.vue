<template>
  <div class="main">
    <div v-for="article in articles" :key="article.id" class="article">
      <div class="p_item_inner">
        <div class="list_user_meta">
          <div class="head"><img src="../assets/logo.png"></div>
          <div class="name">
            SUSU<time>{{ article.createTime }}</time>
          </div>
        </div>

        <div class="blog_content">
          <div class="entry-content">
            <div class="p_title">标题</div>
            <div class="t_content">
              {{ article.content }}
            </div>
          </div>
          <span class="ip_loca"><i class="ri-map-pin-2-line"></i>发布地点</span>
        </div>


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

  .article {
    margin-bottom: 40px;

    .content {
      //文本进行换行
      white-space: pre-line;
    }
  }

}
</style>