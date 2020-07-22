import Vue from 'vue'
import App from './App.vue'
import router from './router'

import "@/common/style/reset.css"

import "../theme/index.css"
import elementUIconfig from "./config/element.ui.config"

Vue.prototype.$ELEMENT = elementUIconfig

import vuescroll from 'vuescroll/dist/vuescroll-native.min';
Vue.use(vuescroll);
Vue.prototype.$vuescrollConfig = {
  scrollPanel: {
    speed: 500,
    easing: "easeInQuad"
  },
  bar: {
    background: '#999'
  }
};

// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: '966b805783ea7f5814356f3ccb8e45e2',
//   plugin: ['Scale', 'OverView', 'ToolBar', 'MapType', 'Marker', 'Geolocation', 'Geocoder'],
//   v: '1.4.4'
// });

import api from "@/api"
Vue.prototype.$api = api

import store from "@/store"
Vue.prototype.$store = store

import imageViewer from "@/components/image-viewer"
Vue.prototype.$imageViewer = imageViewer

import { Message, MessageBox, Loading } from "element-ui";
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.config.devtools = true
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
