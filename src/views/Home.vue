<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="title-main">文章洞察分析平台</span>
              <span class="title-sub">深度挖掘內容價值，提供智能化文章管理解決方案</span>
            </h1>
            <p class="hero-description">
              運用先進的自然語言處理技術，自動分析文章內容、提取關鍵信息，
              幫助您快速掌握文章脈絡與趨勢洞察
            </p>
            <div class="hero-features">
              <div class="feature-item">
                <span class="feature-icon">🎯</span>
                <span>智能主題分類</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📊</span>
                <span>關鍵詞分析</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">⚡</span>
                <span>即時監控</span>
              </div>
            </div>
            <div class="hero-actions">
              <router-link to="/articles" class="btn btn-primary">
                立即體驗
              </router-link>
              <router-link to="/keywords" class="btn btn-outline">
                了解更多
              </router-link>
            </div>
          </div>
          <div class="hero-visual">
            <div class="dashboard-mockup">
              <div class="mockup-header">
                <div class="mockup-title">文章分析儀表板</div>
                <div class="mockup-status">
                  <span class="status-indicator"></span>
                  即時更新
                </div>
              </div>
              <div class="mockup-content">
                <div class="chart-section">
                  <div class="chart-title">熱門主題分布</div>
                  <div class="chart-bars">
                    <div class="bar" style="width: 85%; --color: #1976d2;">
                      <span class="bar-label">科技</span>
                      <span class="bar-value">85%</span>
                    </div>
                    <div class="bar" style="width: 72%; --color: #2196f3;">
                      <span class="bar-label">財經</span>
                      <span class="bar-value">72%</span>
                    </div>
                    <div class="bar" style="width: 68%; --color: #64b5f6;">
                      <span class="bar-label">生活</span>
                      <span class="bar-value">68%</span>
                    </div>
                    <div class="bar" style="width: 45%; --color: #90caf9;">
                      <span class="bar-label">娛樂</span>
                      <span class="bar-value">45%</span>
                    </div>
                  </div>
                </div>
                <div class="stats-grid">
                  <div class="stat-card">
                    <div class="stat-number">12,456</div>
                    <div class="stat-label">文章總數</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-number">98.5%</div>
                    <div class="stat-label">分析準確率</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">核心功能特色</h2>
          <p class="section-subtitle">專為內容分析需求設計的一站式解決方案</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <span class="material-symbols-outlined">search</span>
            </div>
            <h3 class="feature-title">智能搜尋與篩選</h3>
            <p class="feature-description">
              支援多維度條件篩選，包含主題分類、時間區間、來源媒體等，
              快速定位目標文章內容
            </p>
            <div class="feature-highlight">
              <span class="highlight-tag">多條件篩選</span>
              <span class="highlight-tag">語意搜尋</span>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <span class="material-symbols-outlined">analytics</span>
            </div>
            <h3 class="feature-title">深度內容分析</h3>
            <p class="feature-description">
              運用 AI 技術進行文章主題識別、情感分析與關鍵詞提取，
              自動生成洞察報告
            </p>
            <div class="feature-highlight">
              <span class="highlight-tag">AI 分析</span>
              <span class="highlight-tag">自動分類</span>
            </div>
          </div>

          <div class="feature-card">
            <div class="feature-icon-wrapper">
              <span class="material-symbols-outlined">tune</span>
            </div>
            <h3 class="feature-title">彈性關鍵字設定</h3>
            <p class="feature-description">
              可自定義關鍵字組合與主題分類規則，並支援協作權限管理，
              滿足團隊多元需求
            </p>
            <div class="feature-highlight">
              <span class="highlight-tag">自定義規則</span>
              <span class="highlight-tag">權限管控</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Section -->
    <section class="data-section">
      <div class="container">
        <div class="data-content">
          <div class="data-stats">
            <div class="stat-big">
              <div class="stat-number-big">10,000+</div>
              <div class="stat-label-big">每日處理文章數</div>
            </div>
            <div class="stat-row">
              <div class="stat-small">
                <div class="stat-number-small">95.8%</div>
                <div class="stat-label-small">分析準確度</div>
              </div>
              <div class="stat-small">
                <div class="stat-number-small">&lt;0.5s</div>
                <div class="stat-label-small">平均回應時間</div>
              </div>
            </div>
          </div>
          <div class="data-description">
            <h3>專業數據處理能力</h3>
            <p>
              基於深度學習模型，提供高準確率的文章分析服務，
              支援大量文章的即時處理與分析，確保您獲得最及時的洞察資訊。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 首頁組件邏輯
</script>

<style scoped>
.home-container {
  margin-top: -69px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 120px 0 80px;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23e2e8f0" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 80px;
}

.hero-text {
  flex: 1;
  max-width: 580px;
}

.hero-title {
  margin: 0 0 30px;
}

.title-main {
  display: block;
  font-size: 2.8rem;
  font-weight: 700;
  color: #1a202c;
  line-height: 1.2;
  margin-bottom: 12px;
}

.title-sub {
  display: block;
  font-size: 1.1rem;
  color: #4a5568;
  font-weight: 400;
  line-height: 1.5;
}

.hero-description {
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.7;
  margin: 0 0 32px;
}

.hero-features {
  display: flex;
  gap: 24px;
  margin: 0 0 40px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #2d3748;
  font-weight: 500;
}

.feature-icon {
  font-size: 1.2rem;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.btn {
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.btn-primary {
  background-color: #1976d2;
  color: white;
  border: 2px solid #1976d2;
}

.btn-primary:hover {
  background-color: #1565c0;
  border-color: #1565c0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

.btn-outline {
  background-color: transparent;
  color: #1976d2;
  border: 2px solid #1976d2;
}

.btn-outline:hover {
  background-color: #1976d2;
  color: white;
}

/* Hero Visual */
.hero-visual {
  flex: 1;
  max-width: 520px;
}

.dashboard-mockup {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.mockup-header {
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mockup-title {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
}

.mockup-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #059669;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: #059669;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.mockup-content {
  padding: 24px;
}

.chart-section {
  margin-bottom: 24px;
}

.chart-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 16px;
}

.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bar {
  background: var(--color);
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: relative;
  overflow: hidden;
}

.bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 100%);
}

.bar-label {
  color: white;
  font-weight: 500;
  font-size: 0.85rem;
  position: relative;
  z-index: 1;
}

.bar-value {
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  position: relative;
  z-index: 1;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  text-align: center;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.8rem;
  color: #6b7280;
}

/* Features Section */
.features-section {
  padding: 80px 0;
  background: white;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 16px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  margin: 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.feature-card {
  padding: 32px 24px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.feature-card:hover {
  border-color: #1976d2;
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.1);
  transform: translateY(-2px);
}

.feature-icon-wrapper {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #1976d2, #2196f3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-icon-wrapper .material-symbols-outlined {
  font-size: 24px;
  color: white;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 12px;
}

.feature-description {
  font-size: 0.95rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0 0 20px;
}

.feature-highlight {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.highlight-tag {
  padding: 4px 12px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Data Section */
.data-section {
  padding: 80px 0;
  background: #f8fafc;
}

.data-content {
  display: flex;
  align-items: center;
  gap: 80px;
}

.data-stats {
  flex: 1;
}

.stat-big {
  margin-bottom: 32px;
}

.stat-number-big {
  font-size: 3rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 8px;
}

.stat-label-big {
  font-size: 1.1rem;
  color: #4a5568;
}

.stat-row {
  display: flex;
  gap: 48px;
}

.stat-small {
  text-align: center;
}

.stat-number-small {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 4px;
}

.stat-label-small {
  font-size: 0.9rem;
  color: #6b7280;
}

.data-description {
  flex: 1;
}

.data-description h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 16px;
}

.data-description p {
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.7;
  margin: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    gap: 40px;
  }

  .title-main {
    font-size: 2.2rem;
  }

  .hero-features {
    flex-direction: column;
    gap: 12px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .data-content {
    flex-direction: column;
    gap: 40px;
  }

  .stat-row {
    justify-content: center;
  }
}
</style>
