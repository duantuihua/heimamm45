// 配置路由
// 1. 导包
import Vue from 'vue';
import VueRouter from 'vue-router';

// 2.注册路由
Vue.use(VueRouter);

// 3 导入路由组件
import login from '../../views/login/login'
import index from '../../views/index/index'

// 路由嵌套
import user from '../../views/index/user/user'
import chart from '../../views/index/chart/chart'
import question from '../../views/index/question/question'
import enterprise from '../../views/index/enterprise/enterprise'
import subject from '../../views/index/subject/subject'

// 导入接口
import { info } from '@/api/index'

// 按需导入,在每个某个页面中使用element-ui
import { Message } from 'element-ui';
import store from '../../store';

// 解决同一路由第二次访问会报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 4. 创建router 实例
const router = new VueRouter({
    // 5. 定义路由
    routes: [
        {
            path: '/',
            component: login,
            meta: { //路由元信息
                roles: ["超级管理员", "管理员", "老师", "学生"]
            }
        },
        {
            path: '/index',
            component: index,
            meta: { // 路由元信息
                roles: ["超级管理员", "管理员", "老师", "学生"]
            },
            children: [
                {
                    path: 'user',
                    component: user,
                    meta: {
                        roles: ["超级管理员", "管理员"]

                    }
                },
                {
                    path: 'chart',
                    component: chart,
                    meta: {
                        roles: ["超级管理员", "管理员", "老师"]
                    }
                },
                {
                    path: 'question',
                    component: question,
                    meta: {
                        roles: ["超级管理员", "管理员", "老师"]
                    }
                },
                {
                    path: 'enterprise',
                    component: enterprise,
                    meta: {
                        roles: ["超级管理员", "管理员", "老师"]
                    }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: { // 路由元信息
                        roles: ["超级管理员", "管理员", "老师","学生"]
                    }
                },
            ],
        },
    ]
})

// 定义一个路由白名单
let whitePaths = ['/']

// 注册路由守卫
// 在每次路由跳转之前,都会先执行该回调函数
router.beforeEach((to, from, next) => {
    // window.console.log(to);
    // window.console.log(from);
    // window.console.log(next);
    // 如果是登录页,则跳转
    if (whitePaths.includes(to.path.toLocaleLowerCase()) == true) {
        next();
    } else {
        let token = localStorage.getItem('token');
        // window.console.log(token);
        if (token == null) {
            Message.warning('请先登录');
            // 没有token,不让跳转到其他页面,留在登录页
            next('/');
        } else {
            // token 存在,调用接口判断 token 是否正确
            info().then(res => {
                // window.console.log(res);
                if (res.data.code == 206) {
                    Message.error('你是假的!!,请登录')
                    localStorage.removeItem('token');
                    next('/');
                } else {
                    // token正确,检查用户的状态,如果为禁止,则打回到登录页
                    if (res.data.data.status === 0) {
                        Message.warning('你的已被禁用,请联系管理员')
                    } else {
                        // 如果状态为启用,保存数据到 仓库中
                        store.state.userinfo = res.data.data;
                        // data 中的头像没有基地址,需要自己拼接
                        store.state.userinfo.avatar = process.env.VUE_APP_BASEURL + '/' + store.state.userinfo.avatar;

                        // 接着进行权限匹配
                        // 路由元信息中的值和当前用户角色来进行匹配
                        if (to.meta.roles.includes(store.state.userinfo.role) == true) {
                            // 如果匹配,则有权限翻过去
                            next();
                        } else {
                            Message.warning('你没有访问权限,去联系管理员')
                        }
                    }
                }
            })
        }
    }
})

// 6.输入路由实例
export default router;