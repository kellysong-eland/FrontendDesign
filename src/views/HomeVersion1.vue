<template>
  <div class="home-v1">
    <!-- Hero Section - 簡約大氣風格 -->
    <section class="hero">
      <div class="hero-background">
        <div class="floating-elements">
          <div class="element element-1"></div>
          <div class="element element-2"></div>
          <div class="element element-3"></div>
        </div>
      </div>

      <div class="container">
        <div class="hero-wrapper">
          <div class="hero-badge">
            <span class="badge-icon">✨</span>
            全新 AI 驅動的內容分析平台
          </div>

          <h1 class="hero-title">
            智能分析每一篇
            <span class="highlight-text">文章價值</span>
          </h1>

          <p class="hero-subtitle">
            運用最先進的自然語言處理技術，深度挖掘文章內容，
            為您提供精準的主題分類與趨勢洞察
          </p>

          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">50K+</div>
              <div class="stat-label">文章已分析</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">98.5%</div>
              <div class="stat-label">準確率</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">&lt;1s</div>
              <div class="stat-label">分析速度</div>
            </div>
          </div>

          <div class="hero-actions">
            <router-link to="/articles" class="btn-primary">
              <span class="btn-text">開始分析</span>
              <span class="btn-icon">→</span>
            </router-link>
            <button class="btn-secondary">
              <span class="play-icon">▶</span>
              觀看演示
            </button>
          </div>
        </div>

        <!-- 3D 卡片展示 -->
        <div class="hero-visual">
          <div class="cards-container">
            <div class="analysis-card card-1">
              <div class="card-header">
                <div class="card-title">熱門話題</div>
                <div class="card-status active">即時</div>
              </div>
              <div class="topic-list">
                <div class="topic-item">
                  <span class="topic-color" style="background: #ff6b6b;"></span>
                  科技創新
                  <span class="topic-percent">32%</span>
                </div>
                <div class="topic-item">
                  <span class="topic-color" style="background: #4ecdc4;"></span>
                  金融市場
                  <span class="topic-percent">28%</span>
                </div>
                <div class="topic-item">
                  <span class="topic-color" style="background: #45b7d1;"></span>
                  社會議題
                  <span class="topic-percent">24%</span>
                </div>
              </div>
            </div>

            <div class="analysis-card card-2">
              <div class="sentiment-analysis">
                <div class="sentiment-title">情感分析</div>
                <div class="sentiment-chart">
                  <div class="sentiment-bar positive" style="height: 70%;">
                    <div class="bar-label">正面 70%</div>
                  </div>
                  <div class="sentiment-bar neutral" style="height: 20%;">
                    <div class="bar-label">中性 20%</div>
                  </div>
                  <div class="sentiment-bar negative" style="height: 10%;">
                    <div class="bar-label">負面 10%</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="analysis-card card-3">
              <div class="keyword-cloud">
                <div class="keyword-title">關鍵詞雲</div>
                <div class="keywords">
                  <span class="keyword large">AI</span>
                  <span class="keyword medium">機器學習</span>
                  <span class="keyword small">深度學習</span>
                  <span class="keyword medium">大數據</span>
                  <span class="keyword small">自動化</span>
                  <span class="keyword large">創新</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section - 卡片式佈局 -->
    <section class="features">
      <div class="container">
        <div class="section-intro">
          <div class="intro-tag">核心功能</div>
          <h2 class="section-title">為什麼選擇我們？</h2>
          <p class="section-description">
            集成最新 AI 技術，提供全方位的文章分析解決方案
          </p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3 class="feature-title">AI 智能分析</h3>
            <p class="feature-desc">運用深度學習模型，自動識別文章主題、情感傾向與關鍵信息</p>
            <div class="feature-tags">
              <span class="tag">NLP</span>
              <span class="tag">深度學習</span>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3 class="feature-title">即時處理</h3>
            <p class="feature-desc">毫秒級響應速度，支援大量文章的並發分析處理</p>
            <div class="feature-tags">
              <span class="tag">高性能</span>
              <span class="tag">雲端架構</span>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 6V4M6 12H4M6.343 7.343L4.929 5.929M18 12H16M17.657 7.343L19.071 5.929M9 16C9 16.796 9.316 17.559 9.879 18.121C10.441 18.684 11.204 19 12 19S13.559 18.684 14.121 18.121C14.684 17.559 15 16.796 15 16V13C15 11.939 14.579 10.922 13.828 10.172C13.078 9.421 12.061 9 11 9H9V16Z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3 class="feature-title">智能洞察</h3>
            <p class="feature-desc">自動生成趨勢報告，發現隱藏的內容價值與市場機會</p>
            <div class="feature-tags">
              <span class="tag">趨勢分析</span>
              <span class="tag">商業智能</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section - 行動呼籲 -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <div class="cta-text">
            <h2 class="cta-title">準備好開始了嗎？</h2>
            <p class="cta-subtitle">加入數千名用戶，體驗 AI 驅動的內容分析服務</p>
          </div>
          <div class="cta-actions">
            <router-link to="/articles" class="cta-btn primary">免費試用</router-link>
            <router-link to="/keywords" class="cta-btn secondary">了解更多</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 現代簡約風格首頁
</script>

<style scoped>
.home-v1 {
  --primary-color: #2563eb;
  --primary-gradient: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  --secondary-color: #f1f5f9;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-top: -69px;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.element {
  position: absolute;
  border-radius: 50%;
  background: var(--primary-gradient);
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.element-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.element-2 {
  width: 300px;
  height: 300px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.element-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 70%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.hero-wrapper {
  max-width: 600px;
  margin-bottom: 40px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.1);
  margin-bottom: 32px;
  border: 1px solid #e2e8f0;
}

.badge-icon {
  font-size: 1.1rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.highlight-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-color);
}

.hero-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.btn-primary {
  background: var(--primary-gradient);
  color: white;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(37, 99, 235, 0.4);
}

.btn-secondary {
  background: white;
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.play-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
}

/* Hero Visual */
.hero-visual {
  position: absolute;
  top: 50%;
  right: 50px;
  transform: translateY(-50%);
  width: 500px;
  height: 600px;
}

.cards-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.analysis-card {
  position: absolute;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.analysis-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-1 {
  width: 280px;
  height: 200px;
  top: 0;
  left: 0;
  z-index: 3;
}

.card-2 {
  width: 240px;
  height: 180px;
  top: 120px;
  right: 0;
  z-index: 2;
}

.card-3 {
  width: 260px;
  height: 160px;
  bottom: 0;
  left: 50px;
  z-index: 1;
}

.card-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-weight: 600;
  color: var(--text-primary);
}

.card-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.card-status.active {
  background: #dcfce7;
  color: #16a34a;
}

.topic-list {
  padding: 20px 24px;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 0.9rem;
}

.topic-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.topic-percent {
  margin-left: auto;
  font-weight: 600;
  color: var(--primary-color);
}

.sentiment-analysis {
  padding: 24px;
  height: 100%;
}

.sentiment-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.sentiment-chart {
  display: flex;
  align-items: end;
  gap: 12px;
  height: 80px;
}

.sentiment-bar {
  flex: 1;
  border-radius: 6px 6px 0 0;
  position: relative;
  display: flex;
  align-items: end;
  justify-content: center;
  padding-bottom: 8px;
}

.sentiment-bar.positive { background: #22c55e; }
.sentiment-bar.neutral { background: #f59e0b; }
.sentiment-bar.negative { background: #ef4444; }

.bar-label {
  font-size: 0.7rem;
  color: white;
  font-weight: 600;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.keyword-cloud {
  padding: 24px;
  height: 100%;
}

.keyword-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.keyword {
  padding: 6px 12px;
  background: var(--secondary-color);
  border-radius: 20px;
  color: var(--primary-color);
  font-weight: 500;
}

.keyword.large { font-size: 1rem; }
.keyword.medium { font-size: 0.9rem; }
.keyword.small { font-size: 0.8rem; }

/* Features Section */
.features {
  padding: 120px 0;
  background: white;
}

.section-intro {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 80px;
}

.intro-tag {
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 24px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.section-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.feature-card {
  padding: 40px 32px;
  background: white;
  border: 2px solid var(--border-color);
  border-radius: 20px;
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.1);
}

.feature-icon {
  width: 64px;
  height: 64px;
  background: var(--primary-gradient);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: white;
}

.feature-icon svg {
  width: 28px;
  height: 28px;
}

.feature-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.feature-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

.feature-tags {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: var(--secondary-color);
  color: var(--primary-color);
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* CTA Section */
.cta {
  padding: 80px 0;
  background: var(--primary-gradient);
}

.cta-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.cta-text {
  flex: 1;
}

.cta-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.cta-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
}

.cta-actions {
  display: flex;
  gap: 16px;
}

.cta-btn {
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-btn.primary {
  background: white;
  color: var(--primary-color);
}

.cta-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

.cta-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.cta-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.6);
}

/* 響應式設計 */
@media (max-width: 1024px) {
  .hero-visual {
    display: none;
  }

  .hero-wrapper {
    max-width: 100%;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }

  .stat-divider {
    display: none;
  }

  .cta-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>

