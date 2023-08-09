import axios from '@/utils/request'

const articles = {
  // 1. 获取所有
  getArticles: () => axios({
    url: '/article',
    method: 'get'
  }),
  addArticles: (article) => axios({
    url: '/article/add',
    method: 'post',
    headers: {
      'satoken': localStorage.getItem("satoken")
    },
    data: article
  }),
}

export default articles
