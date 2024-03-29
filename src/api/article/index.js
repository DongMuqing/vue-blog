import axios from '@/utils/request'

const articles = {
  // 1. 获取所有
  getArticles: () => axios({
    url: '/article',
    method: 'GET'
  }),
  addArticles: (article) => axios({
    url: '/article/add',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken': localStorage.getItem("satoken")
    },
    data: JSON.stringify(article)
  }),
  delById: (id) => axios({
    url: '/article/del',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken': localStorage.getItem("satoken")
    },
    data: id
  }),
  editArticles: (article) => axios({
    url: '/article/edit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8' ,
      'satoken': localStorage.getItem("satoken")
    },
    data: JSON.stringify(article)
  }),
}

export default articles
