<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const sidebarOpen = ref(false)

const openSidebar = () => { sidebarOpen.value = true }
const closeSidebar = () => { sidebarOpen.value = false }
</script>

<template>
  <div class="app">
    <Header @toggle-sidebar="openSidebar" />
    <Sidebar :open="sidebarOpen" :currentPage="typeof route.name === 'string' ? route.name : 'Home'" @close="closeSidebar" />
    <div v-if="sidebarOpen" class="sidebar-backdrop" @click="closeSidebar"></div>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

.main-content {
  padding-top: 69px; /* Header height */
}

.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(30,40,60,0.18);
  z-index: 1000;
}
</style>
