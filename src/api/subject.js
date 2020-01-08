// 1. 导入 axios
import axios from 'axios'

// 创建学科页面使用的请求对象
const subRequest = axios.create({
    // 设置基地址
    baseURL: process.env.VUE_APP_BASEURL
});

// 添加请求拦截器
subRequest.interceptors.request.use(
    function (config) {
        // 在发送请求之前做一些事
        // 跨域 是否携带 cookie
        config.headers.token = localStorage.getItem('token');
        return config;
    },
    function (error) {
        // 在请求错误时做一些事
        return Promise.reject(error)
    }
)

// 添加响应拦截器
subRequest.interceptors.response.use(
    function (response) {
        // 此时 .then方法还没有触发
        // 处理 响应数据中的 .data
        return response.data;
    },
    function (error) {
        // 响应出错时
        return Promise.reject(error);
    }
);

// 添加学科
export function addSubject(data) {
    return subRequest({
        url: '/subject/add',
        method: 'post',
        data,
    });
}

// 学科列表
export function subjectList(params) {
    return subRequest({
        url: '/subject/list',
        method: 'get',
        params,
    });
}

// 学科状态
export function subjectStatus(data) {
    return subRequest({
        url: '/subject/status',
        method: 'post',
        data
    });
}

// 学科编辑
export function subjectEdit(data) {
    return subRequest({
        url: '/subject/edit',
        method: 'post',
        data
    });
}

// 学科删除
export function subjectRemove(data) {
    return subRequest({
        url: '/subject/remove',
        method: 'post',
        data
    });
}

