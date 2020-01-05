// export function login(data) {
//    return this.$axios({
//         url: process.env.VUE_APP_BASEURL + "/login",
//         method: "post",
//         // 跨域 是否携带 cookie
//         withCredentials: true,
//         data
//       })
//  }

import axios from 'axios';
 export function login(data) {
    return axios({
         url: process.env.VUE_APP_BASEURL + "/login",
         method: "post",
         // 跨域 是否携带 cookie
         withCredentials: true,
         data
       })
  }