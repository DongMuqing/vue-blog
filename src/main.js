import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

import VModal from 'vue-js-modal'
Vue.use(VModal, { dynamic: true, injectModalsContainer: true, dynamicDefaults: { clickToClose: true } })
// Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
  // 挂在vuex
  store
}).$mount('#app')

// 在页面加载开始时启动计时器
const loadTimer = setTimeout(() => {
  const loadingAnimation = document.getElementById('loading-animation');
  if (loadingAnimation) {
    loadingAnimation.style.display = 'block'; // 显示加载动画
  }
}, 1000); // 延迟1秒钟显示加载动画

// 监听 window.load 事件
window.addEventListener('load', () => {
  // 清除计时器，确保加载动画不会在页面加载完成后显示
  clearTimeout(loadTimer);

  // 网站加载完成，可以隐藏加载动画或执行其他操作
  const loadingAnimation = document.getElementById('loading-animation');
  if (loadingAnimation) {
    loadingAnimation.style.display = 'none'; // 隐藏加载动画
  }
});