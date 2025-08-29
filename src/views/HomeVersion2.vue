<template>
  <div class="home-v2">
    <!-- Hero Section - 分割式佈局 -->
    <section class="hero bg-light">
      <div class="container py-5">
        <div class="row align-items-center min-vh-100" style="padding-top: 69px;">
          <!-- 左側內容 -->
          <div class="col-lg-6">
            <div class="hero-content">
              <div class="hero-intro mb-4">
                <span class="badge bg-primary text-white px-3 py-2 rounded-pill fs-6 fw-semibold">智能內容分析</span>
                <h1 class="display-4 fw-bold text-dark mt-4 mb-4">
                  解鎖文章中的
                  <br>
                  <span class="gradient-text">隱藏價值</span>
                </h1>
                <p class="lead text-muted mb-4">
                  透過先進的 AI 技術，我們將複雜的文章內容轉化為清晰的洞察，
                  幫助您發現趨勢、理解觀點，並做出更明智的決策。
                </p>
              </div>

              <div class="hero-features mb-5">
                <div class="d-flex flex-wrap gap-3">
                  <div class="feature-pill bg-white border rounded-pill px-3 py-2 d-flex align-items-center">
                    <span class="me-2">🚀</span>
                    毫秒級分析
                  </div>
                  <div class="feature-pill bg-white border rounded-pill px-3 py-2 d-flex align-items-center">
                    <span class="me-2">🎯</span>
                    精準分類
                  </div>
                  <div class="feature-pill bg-white border rounded-pill px-3 py-2 d-flex align-items-center">
                    <span class="me-2">📈</span>
                    趨勢預測
                  </div>
                </div>
              </div>

              <div class="hero-cta">
                <div class="d-flex flex-wrap gap-3 align-items-center">
                  <router-link to="/articles" class="btn btn-primary btn-lg px-4 py-3 rounded-3 fw-semibold">
                    開始免費試用
                    <span class="ms-2">→</span>
                  </router-link>
                  <button class="btn btn-outline-secondary btn-lg px-4 py-3 rounded-3 fw-semibold d-flex align-items-center">
                    <div class="demo-icon bg-light rounded-circle me-3 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                      <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    觀看產品演示
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 右側互動卡片 -->
          <div class="col-lg-6 mt-5 mt-lg-0">
            <div class="hero-cards position-relative" style="height: 500px;">
              <!-- 主要分析卡片 -->
              <div class="main-card card shadow position-absolute"
                   :class="{ 'expanded': expandedCard === 'main' }"
                   @click="toggleCard('main')"
                   style="width: 320px; top: 0; left: 0; z-index: 3; cursor: pointer; transition: all 0.3s ease;">
                <div class="card-header bg-white border-bottom d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="me-3 fs-4">📊</span>
                    <h6 class="mb-0 fw-semibold">實時分析面板</h6>
                  </div>
                  <span class="badge bg-light text-dark rounded-circle d-flex align-items-center justify-content-center" style="width: 24px; height: 24px;">
                    <span v-if="expandedCard !== 'main'">+</span>
                    <span v-else>−</span>
                  </span>
                </div>
                <div class="card-body" v-if="expandedCard === 'main'">
                  <div class="row mb-3">
                    <div class="col-6 text-center">
                      <div class="fs-2 fw-bold text-primary">1,247</div>
                      <div class="small text-muted">今日分析</div>
                    </div>
                    <div class="col-6 text-center">
                      <div class="fs-2 fw-bold text-primary">98.2%</div>
                      <div class="small text-muted">準確率</div>
                    </div>
                  </div>
                  <div>
                    <div class="small text-muted mb-2">處理進度</div>
                    <div class="progress" style="height: 8px;">
                      <div class="progress-bar bg-primary" style="width: 75%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 主題分類卡片 -->
              <div class="sub-card topic-card card shadow position-absolute"
                   :class="{ 'expanded': expandedCard === 'topic' }"
                   @click="toggleCard('topic')"
                   style="width: 280px; top: 100px; right: 0; z-index: 2; cursor: pointer; transition: all 0.3s ease; transform: rotate(2deg);">
                <div class="card-header bg-white border-bottom d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="me-3 fs-4">🏷️</span>
                    <h6 class="mb-0 fw-semibold">主題分類</h6>
                  </div>
                  <span class="badge bg-light text-dark rounded-circle d-flex align-items-center justify-content-center" style="width: 24px; height: 24px;">
                    <span v-if="expandedCard !== 'topic'">+</span>
                    <span v-else>−</span>
                  </span>
                </div>
                <div class="card-body" v-if="expandedCard === 'topic'">
                  <div class="d-flex flex-column gap-2">
                    <div class="d-flex justify-content-between align-items-center p-2 bg-primary bg-opacity-10 rounded">
                      <span class="d-flex align-items-center">
                        <span class="badge bg-primary rounded-circle me-2" style="width: 12px; height: 12px;"></span>
                        科技
                      </span>
                      <span class="fw-semibold text-primary">45%</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center p-2 bg-success bg-opacity-10 rounded">
                      <span class="d-flex align-items-center">
                        <span class="badge bg-success rounded-circle me-2" style="width: 12px; height: 12px;"></span>
                        金融
                      </span>
                      <span class="fw-semibold text-success">28%</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center p-2 bg-warning bg-opacity-10 rounded">
                      <span class="d-flex align-items-center">
                        <span class="badge bg-warning rounded-circle me-2" style="width: 12px; height: 12px;"></span>
                        生活
                      </span>
                      <span class="fw-semibold text-warning">27%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 情感分析卡片 -->
              <div class="sub-card sentiment-card card shadow position-absolute"
                   :class="{ 'expanded': expandedCard === 'sentiment' }"
                   @click="toggleCard('sentiment')"
                   style="width: 260px; bottom: 0; left: 40px; z-index: 1; cursor: pointer; transition: all 0.3s ease; transform: rotate(-1deg);">
                <div class="card-header bg-white border-bottom d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="me-3 fs-4">😊</span>
                    <h6 class="mb-0 fw-semibold">情感分析</h6>
                  </div>
                  <span class="badge bg-light text-dark rounded-circle d-flex align-items-center justify-content-center" style="width: 24px; height: 24px;">
                    <span v-if="expandedCard !== 'sentiment'">+</span>
                    <span v-else>−</span>
                  </span>
                </div>
                <div class="card-body" v-if="expandedCard === 'sentiment'">
                  <div class="d-flex flex-column gap-2">
                    <div class="text-center p-2 bg-success text-white rounded fw-semibold" style="width: 65%;">
                      正面 65%
                    </div>
                    <div class="text-center p-2 bg-warning text-white rounded fw-semibold" style="width: 25%;">
                      中性 25%
                    </div>
                    <div class="text-center p-2 bg-danger text-white rounded fw-semibold" style="width: 10%;">
                      負面 10%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section - 服務展示 -->
    <section class="services py-5 bg-white">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="display-5 fw-bold text-dark mb-3">我們如何幫助您？</h2>
            <p class="lead text-muted">全方位的文章分析解決方案，滿足不同場景需求</p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4 col-md-6" v-for="(service, index) in services" :key="index">
            <div class="service-card card h-100 border-2 rounded-4 p-4 transition-all"
                 :class="{ 'border-primary shadow-lg': activeService === index }"
                 @mouseenter="activeService = index"
                 @mouseleave="activeService = null">
              <div class="card-body">
                <div class="service-header d-flex align-items-center mb-3">
                  <span class="badge bg-light text-muted fs-6 fw-bold me-3">{{ String(index + 1).padStart(2, '0') }}</span>
                  <span class="fs-1">{{ service.icon }}</span>
                </div>
                <h3 class="card-title h4 fw-semibold mb-3">{{ service.title }}</h3>
                <p class="card-text text-muted mb-4">{{ service.description }}</p>
                <div class="service-features mb-4">
                  <div class="d-flex align-items-center mb-2" v-for="feature in service.features" :key="feature">
                    <span class="text-success me-2 fw-bold">✓</span>
                    <span class="small">{{ feature }}</span>
                  </div>
                </div>
                <div class="service-action">
                  <router-link :to="service.link" class="btn btn-link text-primary fw-semibold p-0 text-decoration-none">
                    了解更多 →
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Section - 技術優勢 -->
    <section class="technology py-5 bg-light">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <div class="tech-info">
              <div class="tech-badge d-inline-flex align-items-center bg-white border rounded-pill px-3 py-2 mb-4">
                <span class="badge bg-success rounded-circle me-2 p-0" style="width: 8px; height: 8px;"></span>
                <span class="fw-semibold text-primary">核心技術</span>
              </div>
              <h2 class="display-5 fw-bold text-dark mb-4">先進的 AI 引擎驅動</h2>
              <p class="lead text-muted mb-5">
                我們的平台基於最新的深度學習架構，結合自然語言處理與機器學習技術，
                為您提供業界領先的文章分析能力。
              </p>

              <div class="tech-stats">
                <div class="row g-4">
                  <div class="col-6">
                    <div class="d-flex align-items-center">
                      <span class="fs-1 me-3">⚡</span>
                      <div>
                        <div class="h3 fw-bold text-primary mb-1">0.3s</div>
                        <div class="text-muted">平均處理時間</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="d-flex align-items-center">
                      <span class="fs-1 me-3">🎯</span>
                      <div>
                        <div class="h3 fw-bold text-primary mb-1">99.1%</div>
                        <div class="text-muted">分類準確率</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="tech-visual">
              <div class="neural-network card shadow rounded-4 p-5 bg-white position-relative">
                <div class="network-visualization d-flex justify-content-between align-items-center">
                  <svg class="position-absolute" style="width: 100%; height: 100%; top: 0; left: 0; z-index: 1;">
                    <line v-for="line in networkLines"
                          :key="line.id"
                          :x1="line.x1"
                          :y1="line.y1"
                          :x2="line.x2"
                          :y2="line.y2"
                          :class="line.class"
                          stroke="#0d6efd"
                          stroke-width="1.5"
                          :stroke-opacity="line.class.includes('active') ? 0.8 : 0.3" />
                  </svg>
                  <!-- 輸入層 -->
                  <div class="network-layer d-flex flex-column gap-3">
                    <div class="node bg-primary rounded-circle" style="width: 20px; height: 20px;" v-for="i in 4" :key="'input-' + i"></div>
                  </div>

                  <!-- 隱藏層 -->
                  <div class="network-layer d-flex flex-column gap-2">
                    <div class="node bg-primary rounded-circle" style="width: 20px; height: 20px;" v-for="i in 6" :key="'hidden-' + i"></div>
                  </div>

                  <!-- 輸出層 -->
                  <div class="network-layer d-flex flex-column gap-4">
                    <div class="node bg-primary rounded-circle" style="width: 20px; height: 20px;" v-for="i in 3" :key="'output-' + i"></div>
                  </div>
                </div>

                <div class="text-center mt-4">
                  <h6 class="fw-semibold text-primary">神經網路架構</h6>
                  <small class="text-muted">深度學習模型驅動智能分析</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section - 用戶見證 -->
    <section class="testimonials py-5 bg-white">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mb-5">
            <h2 class="display-5 fw-bold text-dark">用戶怎麼說？</h2>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4 col-md-6" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial-card card h-100 bg-light border-0 rounded-4 p-4 transition-all">
              <div class="card-body">
                <div class="testimonial-content mb-4">
                  <div class="quote-icon text-primary opacity-25 mb-3" style="font-size: 3rem;">"</div>
                  <p class="card-text lead fst-italic text-dark">{{ testimonial.text }}</p>
                </div>
                <div class="testimonial-author d-flex align-items-center">
                  <div class="author-avatar me-3">
                    <img :src="testimonial.avatar" :alt="testimonial.name"
                         class="rounded-circle" style="width: 50px; height: 50px; object-fit: cover;" />
                  </div>
                  <div class="author-info">
                    <div class="author-name fw-semibold text-dark">{{ testimonial.name }}</div>
                    <div class="author-position text-muted small">{{ testimonial.position }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final-cta py-5 bg-primary">
      <div class="container">
        <div class="cta-card card border-0 rounded-4 shadow-lg p-5">
          <div class="row align-items-center g-4">
            <div class="col-lg-8">
              <div class="cta-content">
                <h2 class="display-6 fw-bold text-dark mb-3">立即開始您的智能分析之旅</h2>
                <p class="lead text-muted mb-4">免費試用 14 天，體驗 AI 驅動的內容分析威力</p>
                <div class="cta-actions d-flex flex-wrap gap-3">
                  <router-link to="/articles" class="btn btn-primary btn-lg px-4 py-3 rounded-3 fw-semibold">
                    立即免費試用
                  </router-link>
                  <router-link to="/keywords" class="btn btn-outline-primary btn-lg px-4 py-3 rounded-3 fw-semibold">
                    預約演示
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-lg-4 text-center">
              <div class="cta-visual">
                <div class="success-indicator">
                  <div class="check-circle bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 80px; height: 80px; font-size: 2rem;">
                    ✓
                  </div>
                  <div class="success-text text-muted">免費試用，隨時取消</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 互動狀態
const expandedCard = ref<string | null>('main')
const activeService = ref<number | null>(null)

// 切換卡片展開狀態
const toggleCard = (cardId: string) => {
  expandedCard.value = expandedCard.value === cardId ? null : cardId
}

// 服務數據
const services = ref([
  {
    title: '智能搜索',
    description: '基於語義理解的智能搜索引擎，快速找到相關內容',
    features: ['多維度篩選', '語義搜索', '相似文章推薦'],
    icon: '🔍',
    link: '/articles'
  },
  {
    title: '內容分析',
    description: '深度分析文章內容，提取關鍵信息和洞察',
    features: ['主題識別', '情感分析', '關鍵詞提取'],
    icon: '📊',
    link: '/articles'
  },
  {
    title: '自定義分類',
    description: '靈活的分類規則設定，滿足個性化需求',
    features: ['自定義標籤', '批量處理', '團隊協作'],
    icon: '⚙️',
    link: '/keywords'
  }
])

// 用戶見證數據
const testimonials = ref([
  {
    text: '這個平台徹底改變了我們的內容分析工作流程，效率提升了 300%！',
    name: '張小明',
    position: '數據分析師',
    avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%234F46E5"/%3E%3Ctext x="50" y="60" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E張%3C/text%3E%3C/svg%3E'
  },
  {
    text: 'AI 分析的準確性讓我們能夠快速掌握市場趨勢，做出更好的決策。',
    name: '李美華',
    position: '產品經理',
    avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23059669"/%3E%3Ctext x="50" y="60" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E李%3C/text%3E%3C/svg%3E'
  },
  {
    text: '介面直觀易用，功能強大，是我們團隊不可或缺的工具。',
    name: '王大偉',
    position: '研究主管',
    avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23DC2626"/%3E%3Ctext x="50" y="60" text-anchor="middle" fill="white" font-size="40" font-family="Arial"%3E王%3C/text%3E%3C/svg%3E'
  }
])

// 神經網路連線數據
const networkLines = ref([
  // 輸入層到隱藏層
  { id: 1, x1: 100, y1: 50, x2: 200, y2: 30, class: 'connection active' },
  { id: 2, x1: 100, y1: 100, x2: 200, y2: 60, class: 'connection' },
  { id: 3, x1: 100, y1: 150, x2: 200, y2: 90, class: 'connection active' },
  { id: 4, x1: 100, y1: 200, x2: 200, y2: 120, class: 'connection' },
  // 隱藏層到輸出層
  { id: 5, x1: 200, y1: 60, x2: 300, y2: 80, class: 'connection active' },
  { id: 6, x1: 200, y1: 90, x2: 300, y2: 120, class: 'connection' },
  { id: 7, x1: 200, y1: 120, x2: 300, y2: 160, class: 'connection active' }
])
</script>

<style scoped>
/* 使用 Bootstrap 主色調，移除紫色配色 */
.home-v2 {
  margin-top: -69px;
}

/* 漸層文字效果 */
.gradient-text {
  background: linear-gradient(135deg, #0d6efd 0%, #20c997 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 互動卡片效果 */
.main-card.expanded {
  min-height: 280px !important;
}

.topic-card.expanded {
  min-height: 200px !important;
  transform: rotate(0deg) !important;
}

.sentiment-card.expanded {
  min-height: 180px !important;
  transform: rotate(0deg) !important;
}

/* 特色藥丸懸停效果 */
.feature-pill:hover {
  border-color: #0d6efd;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
}

/* 按鈕懸停效果 */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(13, 110, 253, 0.3);
}

.btn-outline-secondary:hover .demo-icon {
  background-color: #0d6efd !important;
  color: white !important;
}

/* 服務卡片動畫效果 */
.service-card {
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #0d6efd, #20c997);
  transition: all 0.4s ease;
}

.service-card:hover::before,
.service-card.border-primary::before {
  left: 0;
}

.service-card:hover,
.service-card.border-primary {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(13, 110, 253, 0.15) !important;
}

/* 技術指標動畫 */
.badge.bg-success {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

/* 神經網路節點動畫 */
.node {
  animation: nodeGlow 3s ease-in-out infinite;
}

.node:nth-child(even) {
  animation-delay: 1s;
}

.node:nth-child(3n) {
  animation-delay: 2s;
}

@keyframes nodeGlow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
    box-shadow: 0 0 15px rgba(13, 110, 253, 0.6);
  }
}

/* 見證卡片懸停效果 */
.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1) !important;
}

/* CTA 按鈕懸停效果 */
.btn-lg:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(13, 110, 253, 0.25);
}

/* 進度條動畫 */
.progress-bar {
  animation: progressFill 2s ease-in-out;
}

@keyframes progressFill {
  from {
    width: 0%;
  }
  to {
    width: 75%;
  }
}

/* 互動卡片展開動畫 */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
}

/* 響應式調整 */
@media (max-width: 1200px) {
  .hero-cards {
    transform: scale(0.9);
    margin: 0 auto;
  }
}

@media (max-width: 992px) {
  .hero-cards .position-absolute {
    position: static !important;
    transform: none !important;
    margin-bottom: 1rem;
    width: 100% !important;
  }

  .hero-cards {
    height: auto !important;
  }

  .display-4 {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .display-4 {
    font-size: 2rem;
  }

  .display-5 {
    font-size: 2rem;
  }

  .display-6 {
    font-size: 1.75rem;
  }

  .btn-lg {
    padding: 12px 24px;
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .hero-cards {
    transform: scale(1);
    padding: 0 15px;
  }

  .feature-pill {
    font-size: 0.85rem;
    padding: 8px 12px;
  }

  .btn-lg {
    width: 100%;
    margin-bottom: 10px;
  }

  .d-flex.gap-3 {
    flex-direction: column !important;
  }
}

/* 確保所有文字顏色正確 */
.text-primary {
  color: #0d6efd !important;
}

.bg-primary {
  background-color: #0d6efd !important;
}

.border-primary {
  border-color: #0d6efd !important;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-outline-primary {
  color: #0d6efd;
  border-color: #0d6efd;
}

.btn-outline-primary:hover {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

/* 平滑過渡效果 */
.transition-all {
  transition: all 0.3s ease;
}

/* 卡片陰影層次 */
.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
</style>
