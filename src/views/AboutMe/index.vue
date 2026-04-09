<template>
  <section class="about">
    <h1>关于我</h1>
    <p class="intro">
      我专注于构建体验清晰、迭代高效的 Web 产品，关注前端工程化与产品落地效率。
    </p>

    <section class="block">
      <h2>技能与工具</h2>
      <p>Vue 3 / Vite / TypeScript / Supabase / GitHub Actions</p>
    </section>

    <section class="block">
      <h2>经历与方向</h2>
      <p>持续打磨个人网站与内容体系，探索 AI 协作开发、自动化工作流与产品化能力。</p>
    </section>

    <section class="block">
      <h2>可合作内容</h2>
      <p>个人品牌站搭建、前端架构拆分、轻量全栈原型开发。</p>
    </section>
  </section>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style scoped>
.about {
  padding: 24px 16px 40px;
  max-width: 800px;
  margin: 0 auto;
}

.intro {
  color: #4a5468;
}

.block {
  border: 1px solid #dbe0ef;
  border-radius: 12px;
  padding: 14px 16px;
  margin-top: 14px;
  background: #fff;
}
</style>