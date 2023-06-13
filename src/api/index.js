import user from './user'
import article from './article'
import menu from './menu'


class API {
    constructor () {
        this.user = user
        this.article = article
        this.menu=menu
        // ...
    }
}

// 导出使用
export default new API()

