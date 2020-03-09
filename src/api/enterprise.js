
// 导入公共的请求对象
import enterpriseRequest from '@/utils/request';

// 新增企业
export function enterpriseAdd(data) {
    return enterpriseRequest({
        url: '/enterprise/add',
        method: 'post',
        data,
    })
}

// 企业列表
export function enterpriseList(params) {
    return enterpriseRequest({
        url: '/enterprise/list',
        method: 'get',
        params,
    })
}

// 企业状态设置
export function enterpriseStatus(data) {
    return enterpriseRequest({
        url: '/enterprise/status',
        method: 'post',
        data,
    })
}

// 企业删除接口
export function enterpriseRemove(data) {
    return enterpriseRequest({
        url: '/enterprise/remove',
        method: 'post',
        data,
    })
}

// 企业编辑
export function enterpriseEdit(data) {
    return enterpriseRequest({
        url: '/enterprise/edit',
        method: 'post',
        data,
    })
}
