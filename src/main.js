import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 导入路由配置
import { initAnalytics } from "@/services/analyticsService";

const restorePath = new URL(window.location.href).searchParams.get("p");
if (restorePath) {
  window.history.replaceState(null, "", decodeURIComponent(restorePath));
}

initAnalytics();
createApp(App).use(router).mount("#app");
