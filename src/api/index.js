import axios from 'axios'

// 获取用户信息
export function info() {
    return axios({
        url: process.env.VUE_APP_BASEURL + '/info',
        // 跨域 是否携带 cookie
        withCredentials: true,
        method: 'get',
        headers: {
            token: localStorage.getItem('token')
        }
    })
}

export function logout() {
    return axios({
        url: process.env.VUE_APP_BASEURL + '/logout',
        // 跨域 是否携带 cookie
        withCredentials: true,
        method: 'get',
        headers: {
            token: localStorage.getItem("token")
        }
    });
}