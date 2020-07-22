// @name: api.config.js
// @description:
//   is: api基础配置文件;
//   do: ；
// @author: yanglang
// @date: 2020/6/10 15:00

import axios from 'axios';
import store from '@/store';
// import router from './router.config';
import { MessageBox, Message } from 'element-ui';

// axios.defaults.baseURL = Object.is(process.env.NODE_ENV, 'production') ? "http://demo1.jlykj.cn/api/" : "";
axios.defaults.baseURL = Object.is(process.env.NODE_ENV, 'production') ? "/api/" : "";
axios.defaults.timeout = 10000;

// 添加请求拦截器
axios.interceptors.request.use(function(request) {
    request.headers['authorization'] = store.getters.token || ""
    return request;
}, function(error) {
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // if (response.headers['authorization']) {
    //     store.commit('token', response.headers.authorization);
    // }
    if (response.headers.authorization) {
        store.commit("token", response.headers.authorization)
    }
    if (response.headers.token) {
        store.commit("token", response.headers.token)
    }
    if (!/cp_login|cp_out_logo/.test(response.request.responseURL) && response.data.code === 10001) {
        MessageBox.alert('请重新登录！', '验证信息已过期！', {
            confirmButtonText: '确定',
            type: 'error',
            showClose: false
        }).then(() => {
            if (parent.window) {
                parent.window.location.replace("/admin/public/logout.html")
            } else {
                window.location.replace("/admin/public/logout.html")
            }
        })

        response.status = 401;
        let error = new Error(response);
        error.data = response.data;
        error.response = response;
        throw error
    } else if (response.data.code === 400){
        Message.error(response.data.msg)
        throw new Error(response.data)
    } else {
        return response.data.data || response.data
    }
}, function(error) {
    // if (!error.response) {
    //     // if (error.headers['authorization']) {
    //     //     store.commit('token', error.headers.authorization);
    //     // }
    //     throw new Error();
    // }
    switch (error.response.status) {
        case 401:
            MessageBox.alert('请重新登录！', '验证信息已过期！', {
                confirmButtonText: '确定',
                type: 'warning',
                showClose: false
            }).then(() => {
                window.location.replace("/login");
            }).catch(() => {
                window.location.replace("/login");
            });
            break;
        case 500: Message.error("服务器开小差了！") ; break;
        default: break;
    }
    return Promise.reject(error);
});

export default axios;