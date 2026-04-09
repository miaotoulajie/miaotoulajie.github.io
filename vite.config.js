import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path"; // 需要导入 path 模块

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const baseFromEnv = process.env.VITE_BASE_PATH;
const isUserSite = repositoryName?.endsWith(".github.io");
const autoBase = repositoryName && !isUserSite ? `/${repositoryName}/` : "/";

export default defineConfig({
  plugins: [vue()],
  base: baseFromEnv || autoBase,
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 设置 @ 指向 src 目录
    },
  },
});
