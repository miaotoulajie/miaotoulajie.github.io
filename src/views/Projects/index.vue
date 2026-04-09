<template>
  <section class="projects-page">
    <header class="page-header">
      <h1>项目</h1>
      <p>这些是我近期最有代表性的实践，重点关注问题、方案和结果。</p>
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

    <div class="project-grid">
      <article v-for="project in filteredProjects" :key="project.id" class="project-card">
        <h2>{{ project.title }}</h2>
        <p class="summary">{{ project.summary }}</p>
        <p><strong>角色：</strong>{{ project.role }}</p>
        <p><strong>结果：</strong>{{ project.result }}</p>
        <p class="stack">
          <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
        </p>
        <router-link :to="`/projects/${project.id}`" class="detail-link">查看详情</router-link>
      </article>
    </div>
  </section>
</template>

<script>
import { computed, ref } from "vue";
import { projects } from "@/data/projects";

export default {
  name: "ProjectsPage",
  setup() {
    const activeFilter = ref("全部");
    const filterOptions = ["全部", ...new Set(projects.flatMap((project) => project.stack))];
    const filteredProjects = computed(() => {
      if (activeFilter.value === "全部") {
        return projects;
      }

      return projects.filter((project) => project.stack.includes(activeFilter.value));
    });

    return {
      activeFilter,
      filterOptions,
      filteredProjects,
    };
  },
};
</script>

<style scoped>
.projects-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.page-header p {
  color: #546079;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
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

.project-card {
  border: 1px solid #dbe0ef;
  border-radius: 12px;
  padding: 16px;
  background: #fff;
}

.summary {
  color: #475165;
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

.detail-link {
  display: inline-block;
  margin-top: 12px;
  color: #2c7be5;
  text-decoration: none;
}
</style>
