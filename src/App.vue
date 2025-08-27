<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

const router = useRouter()
const sidebarOpen = ref(false)
const currentPage = ref('home')

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const navigateTo = (page: string) => {
  currentPage.value = page
  switch(page) {
    case 'home':
      router.push('/')
      break
    case 'articles':
      router.push('/articles')
      break
    case 'keywords':
      router.push('/keywords')
      break
  }
  closeSidebar()
}
</script>

<template>
  <div class="app">
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar :open="sidebarOpen" :current-page="currentPage" @close="closeSidebar" @navigate="navigateTo" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8fafc;
}

.app {
  min-height: 100vh;
}

.main-content {
  margin-top: 69px;
  min-height: calc(100vh - 69px);
}
</style>
