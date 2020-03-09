
// 导入公共的请求对象
import subRequest from '@/utils/request';

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

