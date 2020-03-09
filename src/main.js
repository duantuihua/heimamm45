import Vue from 'vue'
import App from './App.vue'
import router from './router/index/index'
import store from './store/index'

// 导入 element-ui 插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/base.css';
import axios from 'axios';

// 全局配置axios
Vue.prototype.$axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 在Vue 实例中挂载路由
  router,
  store
}).$mount('#app')
