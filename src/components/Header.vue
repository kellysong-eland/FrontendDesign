<template>
  <header class="app-header">
    <div class="header-left">
      <button class="sidebar-btn" aria-label="開啟側邊欄">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <span class="app-logo">MyLogo</span>
    </div>
    <div class="header-right">
      <span class="material-symbols-outlined user-avatar">account_circle</span>
    </div>
  </header>
</template>

<script setup lang="ts">
// 僅 header，無邏輯
</script>

<style scoped>
.app-header {
  height: 69px;
  background: #EDF2F9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
  position: relative;
  z-index: 10;
}
.header-left {
  display: flex;
  align-items: center;
}
.sidebar-btn {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0 8px 0 0;
  margin-right: 12px;
  display: flex;
  align-items: center;
}
.sidebar-btn .material-symbols-outlined {
  font-size: 28px;
  color: #1976d2;
}
.app-logo {
  font-size: 1.25rem;
  color: #1976d2;
  font-weight: bold;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header-right {
  display: flex;
  align-items: center;
}
.user-avatar {
  font-size: 32px;
  color: #1976d2;
}
@media (max-width: 900px) {
  .app-header {
    padding: 0 1rem;
  }
  .app-logo {
    font-size: 1.1rem;
  }
}
@media (max-width: 600px) {
  .app-header {
    height: 56px;
    padding: 0 0.5rem;
  }
  .sidebar-btn .material-symbols-outlined {
    font-size: 22px;
  }
  .app-logo {
    font-size: 0.95rem;
    max-width: 80vw;
  }
  .user-avatar {
    font-size: 22px;
  }
}
@media (max-width: 400px) {
  .app-header {
    height: 48px;
    padding: 0 0.2rem;
  }
  .app-logo {
    font-size: 0.8rem;
    max-width: 60vw;
  }
}
</style>
