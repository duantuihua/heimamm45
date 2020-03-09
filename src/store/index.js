
// 导入vue 实例
import Vue from 'vue';
// 导入vuex
import Vuex from 'vuex';
// 在Vue中使用Vuex
Vue.use(Vuex);
// 创建仓库对象
const store = new Vuex.Store({
     // 仓库中保存数据
     state:{
         // 默认没有数据
         userinfo:undefined
     }
})

// 暴露出去
export default store;