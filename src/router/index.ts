import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ArticleList from '@/components/ArticleList.vue'
import KeywordSetting from '@/components/KeywordSetting.vue'
import TestModal from '@/components/TestModal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticleList
    },
    {
      path: '/keywords',
      name: 'keywords',
      component: KeywordSetting
    },
    {
      path: '/test',
      name: 'test',
      component: TestModal
    }
  ]
})

export default router
