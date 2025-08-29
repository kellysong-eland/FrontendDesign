import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ArticleList from '@/components/ArticleList.vue'
import KeywordSetting from '@/components/KeywordSetting.vue'
import Test from '@/components/Test.vue'
import HomeVersion1 from '@/views/HomeVersion1.vue'
import HomeVersion2 from "@/views/HomeVersion2.vue";

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
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/home',
    name: 'HomeVersion1',
    component: HomeVersion1
  },
  {
    path: '/home2',
    name: 'HomeVersion2',
    component: HomeVersion2
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
