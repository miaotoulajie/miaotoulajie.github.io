<template>
  <section class="post-detail">
    <div v-if="post">
      <router-link to="/blog" class="back-link">← 返回文章列表</router-link>
      <h1>{{ post.title }}</h1>
      <p class="meta">{{ formatDate(post.publishedAt) }}</p>
      <p class="summary">{{ post.summary }}</p>
      <p class="content">{{ post.content }}</p>
      <p class="tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </p>
    </div>
    <div v-else>
      <h1>文章不存在</h1>
      <router-link to="/blog" class="back-link">回到文章页</router-link>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { posts } from "@/data/posts";

export default {
  name: "PostDetailPage",
  setup() {
    const route = useRoute();
    const post = computed(() => posts.find((item) => item.id === route.params.postId));
    const formatDate = (dateString) =>
      new Date(dateString).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    return {
      post,
      formatDate,
    };
  },
};
</script>

<style scoped>
.post-detail {
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.back-link {
  color: #2c7be5;
  text-decoration: none;
}

.meta {
  color: #697893;
  font-size: 13px;
}

.summary,
.content {
  color: #4a5468;
}

.content {
  white-space: pre-line;
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
</style>
