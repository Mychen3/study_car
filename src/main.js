import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ViewUI from 'view-design';
import './assets/CSS/global.css'
import 'view-design/dist/styles/iview.css';
import VueWechatTitle from 'vue-wechat-title';

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:4000/api/'
// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//  请求拦截
axios.interceptors.request.use(config => {
  // 将token保存到config里做预处理 为请求头对象 添加token验证authorization字段
  config.headers.authorization = window.sessionStorage.getItem('token')
  // 反回config
  return config
})

Vue.use(ViewUI);
Vue.prototype.$axios = axios
Vue.use(VueWechatTitle)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
