
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import login from '../views/login/login.vue'
// 创建
const router = new VueRouter({
  // 规则
  routes: [
   {path:'/login',component:login},
   {path:"",redirect:'/login'},
  ]
})
export default router
