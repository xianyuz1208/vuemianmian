/*
 * @Author: your name
 * @Date: 2020-01-12 09:58:51
 * @LastEditTime: 2020-03-02 12:31:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-mianmian\src\main.js
 */
/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
Vue.use(ElementUI)
//导入时间过滤器
import "@/filters/index.js"
//全局注册企业学科的下拉框
import enterpriseDown from "./views/index/question/components/enterpriseDown.vue"
import subjectDown from "./views/index/question/components/subjectDown.vue"
Vue.component('enterpriseDown',enterpriseDown)
Vue.component('subjectDown',subjectDown)
Vue.config.productionTip = false
import './style/base.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
