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
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken': localStorage.getItem("satoken")
    },
    data: JSON.stringify(article)
  }),
}

export default articles
