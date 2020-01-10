// 接口的抽取
// 1. 导入axios
import axios from 'axios';

// 2. 创建user请求对象
const userRequest = axios.create({
    // 设置基地址
    baseURL : process.env.VUE_APP_BASEURL
})

// 3.添加请求拦截器
userRequest.interceptors.request.use(
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
userRequest.interceptors.response.use(
    function (response) {
        // 处理data中的 .data
        return response.data;
    },
    function (error) {
        // 响应出错时
        return Promise.reject(error);
    }
)

// 获取用户信息列表
export function userList(params) {
    return userRequest({
        url: '/user/list',
        method: 'get',
        params,
    })
}

// 后台创建用户
export function addUser(data) {
    return userRequest({
        url: '/user/add',
        method: 'post',
        data
    });
}

// 设置用户状态
export function userSstatus(data) {
    return userRequest({
        url: '/user/status',
        method: 'post',
        data,
    })
}

// 删除用户
export function userRemove(data) {
    return userRequest({
        url: '/user/remove',
        method: 'post',
        data,
    })
}

// 编辑用户
export function userEdit(data) {
    return userRequest({
        url: '/user/edit',
        method: 'post',
        data
    })
}

// 获取token
export function getToken(data) {
    return userRequest({
        url: '/token',
        method: 'post',
        data
    });
}