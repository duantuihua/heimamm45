
import axios from 'axios';

// 登录接口
export function login(data) {
     return axios({
          url: process.env.VUE_APP_BASEURL + "/login",
          method: "post",
          // 跨域 是否携带 cookie
          withCredentials: true,
          data
     })
}

// 获取手机验证码
export function sendsms(data) {
     return axios({
          url: process.env.VUE_APP_BASEURL + "/sendsms",
          method: "post",
          // 跨域 是否携带 cookie
          withCredentials: true,
          data
     })
}

// 用户注册
export function register(data) {
     return axios({
          url: process.env.VUE_APP_BASEURL + "/register",
          method: "post",
          // 跨域 是否携带 cookie
          withCredentials: true,
          data
     })
}
