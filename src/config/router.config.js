// @name: router.config.js
// @description:
//   is: 项目路由入口文件;
//   do: 1.定义路由守卫方法；
// @author: yanglang
// @date: 2020/8/25 15:00

import Store from "../store"
// import { MessageBox } from 'element-ui';

const beforeEach = (to, from, next) => {
    // console.log(to,document.title)
    if (to.meta.title) {
        let title = ""
        if (to.matched.length) {
            to.matched.forEach((item,key) => {
                if (key > 0 && key < to.matched.length) title += " - ";
                title += item.meta.title;
            })
        }
        document.title = title
    }
    if (to.query.token) {
        Store.commit("token",to.query.token)
    }
    if (to.matched.length === 0) {
        next('/error');
    } else {
        next();
    }
}
const afterEach = () => {
    // this.$loading.close();
}

export {
    beforeEach,
    afterEach
};
