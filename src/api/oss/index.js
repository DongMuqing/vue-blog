import axios from '@/utils/request'


const ossUtil = {
    // 1. 获取目录
    getDirectory: () => axios({
        url: '/alioss',
        method: 'get',
        headers: {
            'satoken': localStorage.getItem("satoken")
        }
    }),
    getFilePath: (path) => axios({
        url: '/alioss/filepath?path=' + encodeURIComponent(path),
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8' ,
            'satoken': localStorage.getItem("satoken")
        },
        data:path
    }),
    uploadFile: (file) => axios({
        url: '/alioss/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
            'satoken':localStorage.getItem("satoken")
        },
        data: file
    }),

}

export default ossUtil
