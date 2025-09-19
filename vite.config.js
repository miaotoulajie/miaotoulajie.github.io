import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path"; // 需要导入 path 模块

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 设置 @ 指向 src 目录
    },
    base: process.env.NODE_ENV === "production" ? "/" : "/",
  },
});
