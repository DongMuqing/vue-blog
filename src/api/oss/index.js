import axios from '@/utils/request'


const ossUtil = {
    // 1. 获取目录
    getDirectory: () => axios({
        url: '/alioss',
        method: 'GET',
        headers: {
            'satoken': localStorage.getItem("satoken")
        }
    }),
    getFilePath: (path) => axios({
        url: '/alioss/filepath?path=' + encodeURIComponent(path),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8' ,
            'satoken': localStorage.getItem("satoken")
        },
        data:path
    }),
    uploadFile: (file) => axios({
        url: '/alioss/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'satoken':localStorage.getItem("satoken")
        },
        data: file
    }),
    //删除指定路径的oss文件
    delete: (path) => axios({
        url: '/alioss/delete?path=' + encodeURIComponent(path),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8' ,
            'satoken': localStorage.getItem("satoken")
        },
    }),
    //分页查询
    paging: (path,page,maxkey) => axios({
        url: '/alioss/paging?path='+ encodeURIComponent(path)+'&page='+encodeURIComponent(page)+'&maxkey='+encodeURIComponent(maxkey),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8' ,
            'satoken': localStorage.getItem("satoken")
        },
    }),
}

export default ossUtil
