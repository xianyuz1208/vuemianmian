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
import chart from "@/views/index/chart/chart.vue";
import user from "@/views/index/user/user.vue";
import question from "@/views/index/question/question.vue";
import enterprise from "@/views/index/enterprise/enterprise.vue";
import subject from "@/views/index/subject/subject.vue";
import store from "../store/index";
const whiteRouter = ["/login"];
// 创建
const router = new VueRouter({
  // 规则
  routes: [
    {
      path: "/login",
      component: login,
      meta: {
        title: "登录"
      }
    },
    { path: "", redirect: "/login" },
    {
      path: "/index",
      component: index,
      meta: {
        title: "首页"
      },
      children: [
        { path: "chart", component: chart, meta: { title: "数据概览" } },
        { path: "user", component: user, meta: { title: "用户列表" } },
        { path: "question", component: question, meta: { title: "题库列表" } },
        {
          path: "enterprise",
          component: enterprise,
          meta: { title: "企业列表" }
        },
        { path: "subject", component: subject, meta: { title: "学科列表" } }
      ]
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
          const username = res.data.data.username;
          const userIcon = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
          store.commit("changeName", username);
          store.commit("changeIcon", userIcon);
          next();
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
