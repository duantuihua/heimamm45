// 接口的抽取
// 1. 导入axios
import axios from 'axios';

// 2. 创建enterprise请求对象
const request = axios.create({
    // 设置基地址
    baseURL: process.env.VUE_APP_BASEURL
})

// 3.添加请求拦截器
request.interceptors.request.use(
    function (config) {
        // 在发送请求之前做一些事
        // 跨域 是否携带 cookie
        config.headers.token = localStorage.getItem('token');
        return config;
    },
    function (error) {
        // 在请求错误时做一些事
        return Promise.reject(error); 
    }
)

// 添加响应拦截器
request.interceptors.response.use(
    function (response) {
        // 处理data中的 .data
        return response.data;
    },
    function (error) {
        // 响应出错时
        return Promise.reject(error);
    }
)

// 暴露请求对象
export default request;