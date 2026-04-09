<template>
  <div id="app">
    <header class="site-header">
      <div class="container nav">
        <router-link to="/" class="brand">喵的主页</router-link>
        <nav class="menu">
          <router-link to="/projects">项目</router-link>
          <router-link to="/blog">文章</router-link>
          <router-link to="/about">关于</router-link>
          <router-link to="/contact">联系</router-link>
          <router-link to="/message">留言</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>© {{ year }} Miao. Built with Vue + Vite + Supabase.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  background: #f8faff;
  color: #1f2a44;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

* {
  box-sizing: border-box;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(248, 250, 255, 0.95);
  border-bottom: 1px solid #dbe0ef;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
}

.brand {
  font-weight: 700;
  color: #1f2a44;
  text-decoration: none;
}

.menu {
  display: flex;
  gap: 14px;
}

.menu a {
  color: #3a4a6b;
  text-decoration: none;
  font-size: 14px;
}

.menu a.router-link-active {
  color: #2c7be5;
  font-weight: 600;
}

.main-content {
  min-height: calc(100vh - 120px);
}

.site-footer {
  border-top: 1px solid #dbe0ef;
  color: #5f6d88;
  padding: 12px 0;
  font-size: 13px;
}

</style>