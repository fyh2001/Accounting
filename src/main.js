import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// UnoCSS
import "@unocss/reset/tailwind.css";
import 'uno.css'

//vue-router路由管理
import router from "./router/router";
app.use(router);

//pinia状态管理
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // pinia持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)


app.mount("#app")