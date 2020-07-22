import list from "./modules/index";
import Vue from "vue";
import Router from "vue-router";
import { beforeEach, afterEach } from "@/config/router.config"

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// console.log(list)
const router = new Router({
    mode: "history",
    routes: [
        ...list,
        {
            path: "/",
            redirect: "/home"
        },
        {
            path: "/error",
            component: () => import("@/pages/error"),
        }
    ]
})

router.beforeEach = beforeEach
router.afterEach = afterEach

export default router