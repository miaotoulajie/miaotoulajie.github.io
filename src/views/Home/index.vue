<template>
  <section class="home">
    <header class="hero">
      <p class="eyebrow">Hi, I am Miao.</p>
      <h1>构建实用、清晰、可持续迭代的 Web 体验</h1>
      <p class="hero-desc">
        这里是我的个人网站，展示项目实践、开发笔记与当前正在探索的方向。
      </p>
      <div class="hero-actions">
        <router-link to="/projects" class="btn primary">查看项目</router-link>
        <router-link to="/contact" class="btn secondary">联系我</router-link>
      </div>
    </header>

    <section class="section">
      <div class="section-head">
        <h2>精选项目</h2>
        <router-link to="/projects" class="text-link">全部项目</router-link>
      </div>
      <div class="card-grid">
        <article v-for="project in featuredProjects" :key="project.id" class="card">
          <h3>{{ project.title }}</h3>
          <p>{{ project.summary }}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>最新文章</h2>
        <router-link to="/blog" class="text-link">全部文章</router-link>
      </div>
      <div class="card-grid">
        <article v-for="post in latestPosts" :key="post.id" class="card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.summary }}</p>
        </article>
      </div>
    </section>

    <section class="cta">
      <h2>有合作想法？</h2>
      <p>欢迎通过邮件或社交媒体联系我，一起做有价值的产品。</p>
      <router-link to="/contact" class="btn primary">联系入口</router-link>
    </section>
  </section>
</template>

<script>
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";

export default {
  name: "HomePage",
  setup() {
    return {
      featuredProjects: projects.slice(0, 3),
      latestPosts: posts.slice(0, 3),
    };
  },
};
</script>

<style scoped>
.home {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px 50px;
}

.hero {
  padding: 20px 0 30px;
}

.eyebrow {
  color: #2c7be5;
  font-weight: 600;
  margin-bottom: 8px;
}

.hero-desc {
  color: #546079;
  max-width: 680px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 18px;
}

.btn {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
}

.btn.primary {
  background: #2c7be5;
  color: #fff;
}

.btn.secondary {
  border: 1px solid #bfd0f6;
  color: #2f4a7a;
}

.section {
  margin-top: 24px;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-link {
  color: #2c7be5;
  text-decoration: none;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin-top: 12px;
}

.card {
  border: 1px solid #dbe0ef;
  border-radius: 12px;
  padding: 14px;
  background: #fff;
}

.cta {
  margin-top: 36px;
  border: 1px solid #dbe0ef;
  border-radius: 12px;
  padding: 18px;
  background: #f7faff;
}
</style>