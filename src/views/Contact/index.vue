<template>
  <section class="contact">
    <h1>联系我</h1>
    <p>欢迎交流项目合作、技术讨论或内容共创。</p>

    <ul class="contact-list">
      <li><strong>Email:</strong> <a href="mailto:your-email@example.com">your-email@example.com</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/miaotoulajie" target="_blank" rel="noreferrer">github.com/miaotoulajie</a></li>
      <li><strong>Message Board:</strong> <router-link to="/message">去留言板</router-link></li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "ContactView",
};
</script>

<style scoped>
.contact {
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.contact-list {
  margin-top: 12px;
  padding-left: 16px;
}

.contact-list li {
  margin-bottom: 8px;
}

a {
  color: #2c7be5;
}
</style>