import user from './user'
import article from './article'
import menu from './menu'
import dynamic from './dynamic'

class API {
    constructor () {
        this.user = user
        this.article = article
        this.menu=menu
        this.dynamic=dynamic
        // ...
    }
}

// 导出使用
export default new API()

