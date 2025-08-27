<template>
  <div v-if="open" class="sidebar-overlay" @click="$emit('close')">
    <div class="sidebar" @click.stop>
      <nav class="sidebar-nav">
        <button
          class="nav-item"
          :class="{ active: currentPage === 'home' }"
          @click="$emit('navigate', 'home')"
        >
          <span class="material-symbols-outlined">home</span>
          首頁
        </button>
        <button
          class="nav-item"
          :class="{ active: currentPage === 'articles' }"
          @click="$emit('navigate', 'articles')"
        >
          <span class="material-symbols-outlined">article</span>
          文章列表
        </button>
        <button
          class="nav-item"
          :class="{ active: currentPage === 'keywords' }"
          @click="$emit('navigate', 'keywords')"
        >
          <span class="material-symbols-outlined">settings</span>
          關鍵字設定
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  currentPage: string
}>()

defineEmits<{
  close: []
  navigate: [page: string]
}>()
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.sidebar {
  width: 280px;
  height: 100vh;
  background: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.sidebar-nav {
  padding-top: 80px;
  padding-left: 0;
  padding-right: 0;
}

.nav-item {
  width: 100%;
  padding: 16px 24px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #374151;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: #f3f4f6;
  color: #1976d2;
}

.nav-item.active {
  background-color: #e3f2fd;
  color: #1976d2;
  border-right: 3px solid #1976d2;
}

.nav-item .material-symbols-outlined {
  font-size: 20px;
}
</style>
