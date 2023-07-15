import user from './user'
import article from './article'
import menu from './menu'
import dynamic from './dynamic'
import weather from './weather'
class API {
    constructor () {
        this.user = user
        this.article = article
        this.menu=menu
        this.dynamic=dynamic
        this.weather=weather
        // ...
    }
}

// 导出使用
export default new API()

