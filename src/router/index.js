import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/index.vue";
import { trackPageView } from "@/services/analyticsService";

const routes = [
  { path: "/", name: "home", component: Home, meta: { title: "首页" } },
  {
    path: "/projects",
    name: "projects",
    component: () => import("@/views/Projects/index.vue"),
    meta: { title: "项目" },
  },
  {
    path: "/projects/:projectId",
    name: "project-detail",
    component: () => import("@/views/ProjectDetail/index.vue"),
    meta: { title: "项目详情" },
  },
  {
    path: "/blog",
    name: "blog",
    component: () => import("@/views/Blog/index.vue"),
    meta: { title: "文章" },
  },
  {
    path: "/blog/:postId",
    name: "post-detail",
    component: () => import("@/views/PostDetail/index.vue"),
    meta: { title: "文章详情" },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutMe/index.vue"),
    meta: { title: "关于我" },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/Contact/index.vue"),
    meta: { title: "联系我" },
  },
  {
    path: "/message",
    name: "message",
    component: () => import("@/views/Message/index.vue"),
    meta: { title: "留言板" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/NotFound/index.vue"),
    meta: { title: "页面不存在" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  const pageTitle = to.meta?.title ? `${to.meta.title} | 喵的个人主页` : "喵的个人主页";
  document.title = pageTitle;
  trackPageView(to.fullPath, pageTitle);
});

export default router;