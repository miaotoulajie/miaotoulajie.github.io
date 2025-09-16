<template>
  <div class="home">
    <h1>欢迎来到我的主页</h1>
    <p>这是网站的主页面内容。</p>
    <router-link to="/about" class="nav-link">关于我</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
.nav-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>