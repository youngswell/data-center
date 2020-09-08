import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '@/common/style/reset.css';

import '../theme/index.css';
import elementUIconfig from './config/element.ui.config';

Vue.prototype.$ELEMENT = elementUIconfig;

import vuescroll from 'vuescroll/dist/vuescroll-native';
Vue.use(vuescroll);
Vue.prototype.$vuescrollConfig = {
  scrollPanel: {
    speed: 500,
    easing: 'easeInQuad',
  },
  bar: {
    background: '#999',
  },
};

import api from '@/api'
Vue.prototype.$api = api

import store from '@/store'
Vue.prototype.$store = store

import imageViewer from '@/components/image-viewer'
Vue.prototype.$imageViewer = imageViewer

import { Message, MessageBox } from 'element-ui';

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

import loading from '@/utils/loading';
Vue.prototype.$loading = loading;

Vue.config.devtools = true
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
