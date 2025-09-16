<template>
  <div class="about">
    <h1>关于我</h1>
    <p>这里可以放置你的个人简介、技能介绍等内容。</p>
    <p>这是我的新页面！</p>
    <router-link to="/" class="nav-link">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>