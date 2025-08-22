<template>
  <transition name="sidebar-slide">
    <aside v-if="open" class="custom-sidebar">
      <nav class="sidebar-menu">
        <router-link to="/" class="sidebar-item" :class="{active: currentPage==='Home'}" @click="handleClose">首頁</router-link>
        <router-link to="/articles" class="sidebar-item" :class="{active: currentPage==='Articles'}" @click="handleClose">文章列表</router-link>
        <router-link to="/keywords" class="sidebar-item" :class="{active: currentPage==='Keywords'}" @click="handleClose">關鍵字設定</router-link>
      </nav>
    </aside>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  open: Boolean,
  currentPage: String
})
const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}
</script>

<style scoped>
.custom-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: #f8fafc;
  box-shadow: 2px 0 16px rgba(0,0,0,0.10);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding-top: 69px;
  transition: transform 0.25s cubic-bezier(.4,0,.2,1);
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 1.5rem 0.5rem;
}

.sidebar-item {
  padding: 0.9rem 1.2rem;
  border-radius: 6px;
  color: #222;
  text-decoration: none;
  font-size: 1.08rem;
  transition: background 0.18s;
  display: block;
}

.sidebar-item:hover {
  background: #e3eaf3;
  color: #1976d2;
}

.sidebar-item.active, .sidebar-item.router-link-active {
  background: #dbeafe;
  color: #1976d2;
  font-weight: bold;
}

/* Sidebar 動畫 */
.sidebar-slide-enter-from {
  transform: translateX(-100%);
}
.sidebar-slide-enter-to {
  transform: translateX(0);
}
.sidebar-slide-leave-from {
  transform: translateX(0);
}
.sidebar-slide-leave-to {
  transform: translateX(-100%);
}
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.25s cubic-bezier(.4,0,.2,1);
}

@media (max-width: 600px) {
  .custom-sidebar {
    width: 80vw;
    min-width: 160px;
    padding-top: 56px;
  }
}
</style>
