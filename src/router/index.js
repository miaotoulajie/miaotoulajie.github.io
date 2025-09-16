import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/index.vue";

const routes = [
  { path: "/",name:'home', component: Home },
  { path: "/about", name: 'about', component: () => import("@/views/AboutMe/index.vue") },
  { path: "/contact", name: 'contact', component: () => import("@/views/Contact/index.vue") },,
  {path: '/message', name: 'message', component: () => import("@/views/Message/index.vue")}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;