<template>
  <div class="main">
    <div v-for="article in articles" :key="article.id" class="article">
      <div :v-for="article.time">
        <p>{{ article.createTime }}</p>
        <p class="content">{{ article.content }}</p>
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
  margin-top: -10px;

  .article {
    margin-bottom: 40px;

    .content {
      //文本进行换行
      white-space: pre-line;
    }
  }

}
</style>