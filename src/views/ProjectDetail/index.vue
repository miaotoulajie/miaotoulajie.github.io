<template>
  <section class="project-detail">
    <div v-if="project">
      <router-link to="/projects" class="back-link">← 返回项目列表</router-link>
      <h1>{{ project.title }}</h1>
      <p class="summary">{{ project.summary }}</p>
      <p><strong>角色：</strong>{{ project.role }}</p>
      <p><strong>结果：</strong>{{ project.result }}</p>
      <p class="detail">{{ project.detail }}</p>
      <p class="stack">
        <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
      </p>
    </div>
    <div v-else>
      <h1>项目不存在</h1>
      <router-link to="/projects" class="back-link">回到项目页</router-link>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { projects } from "@/data/projects";

export default {
  name: "ProjectDetailPage",
  setup() {
    const route = useRoute();
    const project = computed(() =>
      projects.find((item) => item.id === route.params.projectId)
    );

    return {
      project,
    };
  },
};
</script>

<style scoped>
.project-detail {
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.back-link {
  color: #2c7be5;
  text-decoration: none;
}

.summary,
.detail {
  color: #4a5468;
}

.detail {
  white-space: pre-line;
}

.stack {
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
