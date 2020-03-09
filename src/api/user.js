
// 导入公共的请求对象
import userRequest from '@/utils/request';

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