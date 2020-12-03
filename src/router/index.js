import routers from "./modules/index";
import Vue from "vue";
import Router from "vue-router";
import { beforeEach, afterEach } from "@/config/router.config"

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const originalReplace = Router.prototype.replace
Router.prototype.replace = function push(location) {
    return originalReplace.call(this, location).catch(err => err)
}
console.log(routers)
const router = new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            meta: {
                title: "贵阳经济技术开发区农房确权数据资源"
            },
            component: () => import("@/layout"),
            children: [
                {
                    path: "/",
                    redirect: "/home"
                },
                ...routers
            ]
        },
        {
            name: "levy",
            path: "/levy",
            meta: {
                title: "贵阳经济技术开发区农房确权数据检索"
            },
            component: () => import("@/pages/levy"),
        },
        {
            name: "accurate-levy",
            path: "/accurate-levy",
            meta: {
                title: "贵阳经济技术开发区农房确权数据检索"
            },
            component: () => import("@/pages/levy/accurate-levy"),
        },
        {
            path: "/error",
            meta: {
                title: "404找不到页面"
            },
            component: () => import("@/pages/error"),
        },
        {
            path: "/login",
            meta: {
                title: "登录"
            },
            component: () => import("@/pages/login"),
        }
    ]
})

router.beforeEach(beforeEach)
router.afterEach(afterEach)

export { routers }

export default router
