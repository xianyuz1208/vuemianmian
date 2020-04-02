import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Message } from "element-ui";
import { info } from "@/api/index.js";
import { getToken, remToken } from "@/uitils/token.js";
import login from "../views/login/login.vue";
import index from "../views/index/index.vue";
import store from "../store/index";
import children from './childrenRoute.js'
//白名单
const whiteRouter = ["/login"]
// 创建
const router = new VueRouter({
  // 规则
  routes: [
    {
      path: "/login",
      component: login,
      meta: {
        title: "登录",
        rules:['超级管理员','管理员','老师','学生']
      }
    },
    { path: "", redirect: "/login" },
    {
      path: "/index",
      component: index,
      meta: {
        title: "首页",
        rules:['超级管理员','管理员','老师','学生']
      },
      children
    }
  ]
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  //includes数组检测元素方法,toLocaleLowerCase转小写
  if (whiteRouter.includes(to.path.toLocaleLowerCase()) != true) {
    if (getToken() == undefined) {
      Message.warning("登录的状态有误,请重新登录");
      NProgress.done();
      next("/login");
    } else {
      info().then(res => {
        if (res.data.code === 206) {
          remToken();
          Message.warning("登录状态有误,请重新登录");
          NProgress.done();
          next("/login");
        } else if (res.data.code === 200) {
          if (res.data.data.status === 1) {
            const username = res.data.data.username;
            const userIcon =
              process.env.VUE_APP_URL + "/" + res.data.data.avatar;
            store.commit("changeName", username);
            store.commit("changeIcon", userIcon);
            if (whiteRouter.includes(from.path)) {
              Message.success("登录成功");
            }
            const role = res.data.data.role
            store.commit('changeRole',role)
            if(to.meta.rules.includes(role)){
              next();
            }else{
              Message.error('没有访问的权限')
              NProgress.done();
            }
          } else {
            Message.warning("请等待管理员审核");
            NProgress.done();
            next("/login");
          }
        }
      });
    }
  } else {
    next();
  }
});
router.afterEach(to => {
  NProgress.done();
  window.document.title = to.meta.title;
});
export default router;
