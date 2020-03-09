import questionRequest from '@/utils/request'

// 发布题目
export function questionAdd(data) {
    return questionRequest({
        url: "/question/add",
        method: 'post',
        data,
    })
}

// 获取题目信息
export function questionOne(data) {
    return questionRequest({
        url: "/question/one",
        method: 'post',
        data,
    })
}

// 设置题目状态
export function questionStatus(data) {
    return questionRequest({
        url: "/question/status",
        method: 'post',
        data,
    })
}

// 删除题目
export function questionRemove(data) {
    return questionRequest({
        url: "/question/remove",
        method: 'post',
        data,
    })
}

// 编辑题目接口
export function questionEdit(data) {
    return questionRequest({
        url: "/question/edit",
        method: 'post',
        data,
    })
}

// 题目列表
export function questionList(params) {
    return questionRequest({
        url: "/question/list",
        method: 'get',
        params,
    })
}

