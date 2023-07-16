import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
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
  }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });
  
  export default router;
