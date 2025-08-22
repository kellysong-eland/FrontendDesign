import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ArticleList from '@/components/ArticleList.vue'
import KeywordSetting from '@/components/KeywordSetting.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/articles',
    name: 'Articles',
    component: ArticleList
  },
  {
    path: '/keywords',
    name: 'Keywords',
    component: KeywordSetting
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
