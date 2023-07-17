import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Index from "../views/index/index.vue";
import Home from "../views/home/home.vue";
import CreateAccount from "../views/home/createAccount.vue";

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      {
        path: "",
        component: Home,
      },
    ],
  },
  {
    path: "/createAccount",
    component: CreateAccount,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 监听安卓返回键
document.addEventListener("plusready", function () {
  const webview = plus.webview.currentWebview();
  plus.key.addEventListener("backbutton", function () {
    const page = webview.getURL();
    const len = plus.webview.all().length;
    if (len > 1) {
      webview.close();
    } else {
      webview.canBack(function (e) {
        if (e.canBack) {
          webview.back();
        } else {
          webview.close();
        }
      });
    }
  });
});

export default router;
