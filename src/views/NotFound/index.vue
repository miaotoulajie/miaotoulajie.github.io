<template>
  <section class="not-found">
    <h1>页面不存在</h1>
    <p>你访问的路径可能已变更，回到首页继续浏览。</p>
    <router-link to="/" class="go-home">返回首页</router-link>
  </section>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
.not-found {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 16px;
}

.go-home {
  color: #2c7be5;
  text-decoration: none;
}
</style>
