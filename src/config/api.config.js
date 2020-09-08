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

axios.defaults.baseURL = '/api/';
axios.defaults.timeout = 10000;

// 添加请求拦截器
axios.interceptors.request.use(function(request) {
    request.headers = {
        ...request.headers,
        authorization: store.getters.token || "",
        token: store.getters.token || ""
    }
    // console.log(request)
    return request;
}, function(error) {
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    if (response.headers.authorization) {
        store.commit("token", response.headers.authorization)
    }
    if (response.headers.token) {
        store.commit("token", response.headers.token)
    }
    return response.data.data || response.data
}, (error) => {
    // console.log(error)
    const getErrorInfo = () => {
        let errorInfo = '';
        try {
            errorInfo = error.response.data.error
        } catch (e) {
            errorInfo = '参数校验失败！'
        }
        return errorInfo
    }
    switch (error.response.status) {
        case 400:
            Message.error(getErrorInfo());
            break;
        case 401:
            MessageBox.alert('请重新登录！', '验证信息已过期！', {
                confirmButtonText: '确定',
                type: 'warning',
                showClose: false
            }).then(() => {
                store.dispatch('logout')
                // router.replace("/login");
            }).catch(() => {
                // router.replace("/login");
            });
            break;
        case 404:
            Message.error('404 找不到资源！')
            break;
        case 500: Message.error("服务器开小差了！"); break;
        default: break;
    }
    return Promise.reject(error);
});

export default axios;
