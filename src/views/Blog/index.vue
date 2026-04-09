<template>
  <section class="blog-page">
    <header class="page-header">
      <h1>文章</h1>
      <p>记录我在开发、产品和效率工具上的实践与思考。</p>
    </header>

    <div class="filters">
      <button
        v-for="option in filterOptions"
        :key="option"
        class="filter-btn"
        :class="{ active: activeFilter === option }"
        @click="activeFilter = option"
      >
        {{ option }}
      </button>
    </div>

    <article v-for="post in filteredPosts" :key="post.id" class="post-card">
      <h2>{{ post.title }}</h2>
      <p class="summary">{{ post.summary }}</p>
      <p class="meta">{{ formatDate(post.publishedAt) }}</p>
      <p class="tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </p>
      <router-link :to="`/blog/${post.id}`" class="detail-link">阅读全文</router-link>
    </article>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import { posts } from "@/data/posts";

export default {
  name: "BlogPage",
  setup() {
    const activeFilter = ref("全部");
    const filterOptions = ["全部", ...new Set(posts.flatMap((post) => post.tags))];
    const filteredPosts = computed(() => {
      if (activeFilter.value === "全部") {
        return posts;
      }

      return posts.filter((post) => post.tags.includes(activeFilter.value));
    });

    const formatDate = (dateString) =>
      new Date(dateString).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    return {
      activeFilter,
      filterOptions,
      filteredPosts,
      formatDate,
    };
  },
};
</script>

<style scoped>
.blog-page {
  max-width: 820px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.page-header p {
  color: #546079;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.filter-btn {
  border: 1px solid #d0d8ec;
  background: #fff;
  color: #2f3d63;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
}

.filter-btn.active {
  background: #2c7be5;
  border-color: #2c7be5;
  color: #fff;
}

.post-card {
  border: 1px solid #dbe0ef;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
  margin-bottom: 14px;
}

.summary {
  color: #475165;
}

.meta {
  font-size: 13px;
  color: #697893;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #eef3ff;
  color: #2f3d63;
}

.detail-link {
  display: inline-block;
  margin-top: 8px;
  color: #2c7be5;
  text-decoration: none;
}
</style>
