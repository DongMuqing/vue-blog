import axios from '@/utils/request'


const comments = {
  getComments: () => axios({
    url: '/comments',
    method: 'GET',
    headers: {
      'satoken': localStorage.getItem("satoken")
    },
  }),
  submitComments: (commentInfo) => axios({
    url: '/comments/add',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'satoken': localStorage.getItem("satoken")
    },
    data: JSON.stringify(commentInfo)
  }),
  delComments: (id) => axios({
    url: '/comments',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'satoken': localStorage.getItem("satoken")
    },
      data: JSON.stringify(id)
  }),
}

export default comments
