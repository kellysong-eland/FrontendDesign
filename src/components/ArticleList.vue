<template>
  <div class="article-list-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">文章列表</h1>
          <p class="page-subtitle">智能篩選與搜尋，快速找到目標文章內容</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="container">
        <!-- 查詢面板 -->
        <div class="query-section">
          <div class="section-card">
            <div class="card-header">
              <h2 class="card-title">篩選條件</h2>
              <p class="card-subtitle">設定多維度條件，精準定位文章內容</p>
            </div>

            <form class="query-form">
              <!-- 主題選擇 -->
              <div class="form-group">
                <div class="group-header">
                  <label class="group-label">主題</label>
                </div>
                <div class="topic-options">
                  <button type="button" class="topic-add-btn" @click="startCreate" :disabled="showEditModal || showDeleteConfirm">
                    <span class="material-symbols-outlined">add</span>
                    <span class="add-text">新增主題</span>
                  </button>
                  <div class="topic-item"
                       v-for="(topic,i) in topics" :key="topic.name"
                       :class="{ active: selectedTopic === topic.name }"
                       draggable="true"
                       @click="selectedTopic = topic.name"
                       @mouseenter="e => showTopicTooltip(topic, e)"
                       @mouseleave="onTopicMouseLeave"
                       @dragstart="onDragStart(i)"
                       @dragend="onDragEnd"
                       @dragover.prevent="onDragOver(i)"
                       @drop.prevent="onDrop(i)">
                    <input type="radio" :id="'topic-' + topic.name" :value="topic.name" v-model="selectedTopic" name="topicRadio" style="display: none;" />
                    <span class="topic-name">{{ topic.name }}</span>
                    <span class="drag-handle material-symbols-outlined">drag_indicator</span>
                  </div>
                </div>
              </div>

              <!-- 時間期間 -->
              <div class="form-group">
                <label class="group-label">期間</label>
                <div class="period-options">
                  <div class="period-item" v-for="period in periods" :key="period.value" :class="{ active: selectedPeriod === period.value }" @click="selectedPeriod = period.value">
                    <input type="radio" :id="'period-' + period.value" :value="period.value" v-model="selectedPeriod" name="periodRadio" style="display: none;" />
                    <span>{{ period.label }}</span>
                  </div>
                </div>
                <div v-if="selectedPeriod === 'month'" class="date-range">
                  <input type="month" v-model="monthRangeStart" class="form-control" />
                  <span class="range-separator">至</span>
                  <input type="month" v-model="monthRangeEnd" class="form-control" />
                </div>
                <div v-if="selectedPeriod === 'date'" class="date-range">
                  <input type="date" v-model="dateRangeStart" class="form-control" />
                  <span class="range-separator">至</span>
                  <input type="date" v-model="dateRangeEnd" class="form-control" />
                </div>
              </div>

              <!-- 來源選擇 -->
              <div class="form-group">
                <div class="group-header">
                  <label class="group-label">來源</label>
                </div>
                <div class="source-options">
                  <button type="button" class="source-select-all-btn" @click="toggleAllSources">
                    {{ isAllSourcesSelected ? '取消全選' : '全選' }}
                  </button>
                  <div class="source-item" v-for="source in sources" :key="source.value" :class="{ active: selectedSources.includes(source.value) }" @click="toggleSource(source.value)">
                    <input type="checkbox" :id="'source-' + source.value" :value="source.value" v-model="selectedSources" style="display: none;" />
                    <span>{{ source.label }}</span>
                  </div>
                </div>
              </div>

              <div class="form-actions">
                <button type="button" class="btn btn-primary btn-lg" @click="onQuery">
                  <span class="material-symbols-outlined me-2">search</span>
                  開始查詢
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- 查詢結果 -->
        <div class="results-section">
          <div class="section-card">
            <div class="card-header">
              <h2 class="card-title">查詢結果</h2>
              <div class="result-stats">
                <span class="stat-item">找到 <strong>1,247</strong> 篇文章</span>
                <span class="stat-item">更新時間：<strong>5分鐘前</strong></span>
              </div>
            </div>

            <div class="article-list">
              <div class="article-item">
                <div class="article-meta">
                  <span class="article-topic">科技</span>
                  <span class="article-date">2024-01-15</span>
                  <span class="article-source">新聞</span>
                </div>
                <h3 class="article-title">人工智慧技術在醫療診斷領域的最新突破</h3>
                <p class="article-excerpt">最新研究顯示，AI診斷系統在某些疾病的檢測準確率已超過95%，為醫療領域帶來革命性的變化...</p>
                <div class="article-actions">
                  <button class="btn btn-sm btn-outline-primary">查看詳情</button>
                  <button class="btn btn-sm btn-outline-secondary">加入收藏</button>
                </div>
              </div>

              <div class="article-item">
                <div class="article-meta">
                  <span class="article-topic">財經</span>
                  <span class="article-date">2024-01-14</span>
                  <span class="article-source">討論區</span>
                </div>
                <h3 class="article-title">全球市場波動下的投資策略調整建議</h3>
                <p class="article-excerpt">面對當前複雜的國際經濟情勢，專家建議投資人應採取更加謹慎的策略，分散投資風險...</p>
                <div class="article-actions">
                  <button class="btn btn-sm btn-outline-primary">查看詳情</button>
                  <button class="btn btn-sm btn-outline-secondary">加入收藏</button>
                </div>
              </div>

              <div class="article-item">
                <div class="article-meta">
                  <span class="article-topic">生活</span>
                  <span class="article-date">2024-01-13</span>
                  <span class="article-source">社群網站</span>
                </div>
                <h3 class="article-title">健康飲食新趨勢：植物性蛋白的營養價值分析</h3>
                <p class="article-excerpt">營養專家深入分析各種植物性蛋白來源，包括豆類、堅果類等食物的營養成分與健康效益...</p>
                <div class="article-actions">
                  <button class="btn btn-sm btn-outline-primary">查看詳情</button>
                  <button class="btn btn-sm btn-outline-secondary">加入收藏</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tooltip -->
    <div v-if="hoveredTopic" class="topic-tooltip"
         :style="{left: tooltipPos.left + 'px', top: tooltipPos.top + 'px'}"
         :data-flip="tooltipFlip"
         @mouseenter="onTooltipEnter"
         @mouseleave="onTooltipLeave">
      <div class="tooltip-header">{{ hoveredTopic.name }}</div>
      <div class="tooltip-desc">{{ hoveredTopic.desc || '暫無描述' }}</div>
      <div class="tooltip-actions">
        <button class="tooltip-btn" @click="startEdit(hoveredTopic)" title="編輯">
          <span class="material-symbols-outlined">edit</span>
        </button>
        <button class="tooltip-btn" @click="startDelete(hoveredTopic)" title="刪除">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>

    <!-- 編輯/新增主題 Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click.self="cancelEdit">
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">{{ editingTopicOriginalName ? '編輯主題' : '新增主題' }}</h3>
        </div>
        <div class="modal-body" @click.stop>
          <div class="form-group">
            <label class="form-label">主題名稱</label>
            <div class="name-color-group">
              <input v-model="editingTopicDraft.name" type="text" class="form-control name-input"
                     :class="{'is-invalid': !canSaveEdit && editingTopicDraft.name.trim()}"
                     placeholder="輸入主題名稱" />
              <div class="color-picker-wrapper">
                <input v-model="editingTopicDraft.color" type="color" class="color-picker" />
                <span class="color-preview" :style="{ backgroundColor: editingTopicDraft.color }"></span>
              </div>
            </div>
            <div v-if="!canSaveEdit && editingTopicDraft.name.trim()" class="error-message">
              主題名稱已存在
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">設定類型</label>
            <div class="setting-type-options">
              <div class="setting-type-item"
                   :class="{ active: editingTopicDraft.settingType === 'ai' }"
                   @click.stop="editingTopicDraft.settingType = 'ai'">
                <input type="radio" id="setting-ai" value="ai" v-model="editingTopicDraft.settingType" style="display: none;" />
                <span class="material-symbols-outlined">smart_toy</span>
                <span class="setting-text">AI設定</span>
              </div>
              <div class="setting-type-item"
                   :class="{ active: editingTopicDraft.settingType === 'general' }"
                   @click.stop="editingTopicDraft.settingType = 'general'">
                <input type="radio" id="setting-general" value="general" v-model="editingTopicDraft.settingType" style="display: none;" />
                <span class="material-symbols-outlined">settings</span>
                <span class="setting-text">一般設定</span>
              </div>
            </div>
          </div>

          <!-- AI設定專用欄位 -->
          <div v-if="editingTopicDraft.settingType === 'ai'" class="ai-settings-section">
            <div class="form-group">
              <label class="form-label">情境說明</label>
              <div class="scenario-input-group">
                <textarea v-model="editingTopicDraft.scenario" rows="3" class="form-control"
                         placeholder="請描述您想要分析的情境或場景"
                         @click.stop></textarea>
                <button type="button" class="btn btn-ai-generate" @click.stop="generateAIContent" :disabled="isGenerating">
                  <span class="material-symbols-outlined">auto_awesome</span>
                  <span v-if="isGenerating">生成中...</span>
                  <span v-else>AI生成</span>
                </button>
              </div>
            </div>

            <!-- AI生成後的欄位 -->
            <div v-if="showGeneratedFields" class="generated-fields" @click.stop>
              <div class="form-group">
                <label class="form-label">關鍵字</label>
                <input v-model="editingTopicDraft.keywords" type="text" class="form-control"
                       placeholder="AI生成的關鍵字" readonly @click.stop />
              </div>
              <div class="form-group">
                <label class="form-label">關鍵字說明</label>
                <textarea v-model="editingTopicDraft.keywordDesc" rows="3" class="form-control"
                         placeholder="AI生成的關鍵字說明" readonly @click.stop></textarea>
              </div>
            </div>
          </div>

          <!-- 一般設定專用欄位 -->
          <div v-if="editingTopicDraft.settingType === 'general'" class="general-settings-section">
            <div class="form-group">
              <label class="form-label">關鍵字</label>
              <input v-model="editingTopicDraft.keywords" type="text" class="form-control"
                     placeholder="請輸入關鍵字，多個關鍵字請用逗號分隔" @click.stop />
            </div>
          </div>

          <!-- 可觀看成員選擇 -->
          <div class="form-group">
            <label class="form-label">可觀看成員</label>
            <div class="member-select-wrapper">
              <select v-model="editingTopicDraft.viewableMember" class="form-select member-select" @click.stop>
                <option value="">請選擇成員</option>
                <option v-for="member in membersList" :key="member.id" :value="member.id">
                  {{ member.name }} ({{ member.email }})
                </option>
              </select>
              <span class="select-arrow material-symbols-outlined">expand_more</span>
            </div>
            <small class="form-text text-muted">選擇可以查看此主題的成員</small>
          </div>
        </div>
        <div class="modal-footer" @click.stop>
          <button type="button" class="btn btn-secondary" @click="cancelEdit">取消</button>
          <button type="button" class="btn btn-primary" @click="saveEdit" :disabled="!canSaveEdit">
            {{ editingTopicOriginalName ? '更新' : '新增' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 刪除確認 Modal -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">確認刪除</h3>
        </div>
        <div class="modal-body">
          <p>確定要刪除主題「{{ deletingTopic?.name }}」嗎？此操作無法復原。</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancelDelete">取消</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTopics, type Topic } from '@/composables/useTopics'

const { topics, addTopic, updateTopic, deleteTopic, moveTopic } = useTopics()

// 成員列表數據
const membersList = ref([
  { id: 1, name: '張小明', email: 'ming.zhang@example.com' },
  { id: 2, name: '李小華', email: 'hua.li@example.com' },
  { id: 3, name: '王小美', email: 'mei.wang@example.com' },
  { id: 4, name: '陳小剛', email: 'gang.chen@example.com' },
  { id: 5, name: '林小雅', email: 'ya.lin@example.com' },
  { id: 6, name: '黃小強', email: 'qiang.huang@example.com' },
  { id: 7, name: '劉小芳', email: 'fang.liu@example.com' },
  { id: 8, name: '吳小龍', email: 'long.wu@example.com' }
])

const selectedTopic = ref<string>(topics.value[0]?.name || '')

const periods = [
  { label: '今天', value: 'today' },
  { label: '最近7天', value: '7days' },
  { label: '最近15天', value: '15days' },
  { label: '最近30天', value: '30days' },
  { label: '月份區間', value: 'month' },
  { label: '日期區間', value: 'date' }
]
const selectedPeriod = ref(periods[0].value)
const monthRangeStart = ref('')
const monthRangeEnd = ref('')
const dateRangeStart = ref('')
const dateRangeEnd = ref('')

const sources = [
  { label: '新聞', value: 'news' },
  { label: '討論區', value: 'forum' },
  { label: '社群網站', value: 'social' },
  { label: '評論', value: 'review' }
]
const selectedSources = ref<string[]>([])

// Tooltip 狀態
const hoveredTopic = ref<Topic | null>(null)
const tooltipPos = ref({ left: 0, top: 0 })
const tooltipFlip = ref<'left' | 'right'>('right')
const isDragging = ref(false)
let hideTimer: number | null = null

function showTopicTooltip(topic: Topic, e: MouseEvent) {
  // 如果正在拖拽，不顯示提示框
  if (isDragging.value) return

  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
  hoveredTopic.value = topic
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const vw = window.innerWidth
  const tooltipWidth = 260
  let left = rect.right + 12 + window.scrollX
  let flip: 'left' | 'right' = 'right'
  if (left + tooltipWidth > vw - 8) {
    left = rect.left - tooltipWidth - 12 + window.scrollX
    flip = 'left'
  }
  const top = rect.top + window.scrollY - 4
  tooltipPos.value = { left, top }
  tooltipFlip.value = flip
}
function onTopicMouseLeave() {
  hideTimer = window.setTimeout(() => { hoveredTopic.value = null }, 250)
}
function onTooltipEnter() {
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
}
function onTooltipLeave() { hoveredTopic.value = null }

// 編輯 Modal
const showEditModal = ref(false)
const editingTopicOriginalName = ref<string>('')
const editingTopicDraft = ref<Topic>({ name: '', desc: '' })
const canSaveEdit = computed(() => {
  const draft = editingTopicDraft.value
  if (!draft.name.trim()) return false
  return !topics.value.some(t => t.name === draft.name && t.name !== editingTopicOriginalName.value)
})
function startEdit(topic: Topic) {
  editingTopicOriginalName.value = topic.name
  editingTopicDraft.value = { ...topic }
  showEditModal.value = true
}
function startCreate() {
  editingTopicOriginalName.value = ''
  editingTopicDraft.value = {
    name: '',
    desc: '',
    color: '#2196F3',
    settingType: 'ai', // 修正為AI設定
    viewableMember: ''
  }
  // 重置AI生成相關狀態
  showGeneratedFields.value = false
  isGenerating.value = false
  showEditModal.value = true
}
function cancelEdit() {
  showEditModal.value = false
}
function saveEdit() {
  if (!canSaveEdit.value) return
  const draft = { ...editingTopicDraft.value }
  if (!editingTopicOriginalName.value) {
    try {
      addTopic(draft)
      selectedTopic.value = draft.name
      hoveredTopic.value = draft
    } catch (e) { return }
  } else {
    try {
      updateTopic(editingTopicOriginalName.value, draft)
      if (selectedTopic.value === editingTopicOriginalName.value) selectedTopic.value = draft.name
      if (hoveredTopic.value && hoveredTopic.value.name === editingTopicOriginalName.value) hoveredTopic.value = draft
    } catch (e) { return }
  }
  showEditModal.value = false
}

// 刪除確認
const showDeleteConfirm = ref(false)
const deletingTopic = ref<Topic | null>(null)
function startDelete(topic: Topic) {
  deletingTopic.value = topic
  showDeleteConfirm.value = true
}
function cancelDelete() { showDeleteConfirm.value = false }
function confirmDelete() {
  if (!deletingTopic.value) return
  const name = deletingTopic.value.name
  deleteTopic(name)
  if (selectedTopic.value === name) selectedTopic.value = topics.value[0]?.name || ''
  if (hoveredTopic.value && hoveredTopic.value.name === name) hoveredTopic.value = null
  showDeleteConfirm.value = false
}

function onQuery() {
  // 這裡放查詢觸發行為
}

// Drag and Drop
let dragFrom = ref<number | null>(null)
function onDragStart(index: number) {
  dragFrom.value = index
  isDragging.value = true
  // 立即隱藏提示框
  hoveredTopic.value = null
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null }
}
function onDragOver(_index: number) {
  // 可加視覺效果，目前未實作
}
function onDrop(index: number) {
  if (dragFrom.value !== null && dragFrom.value !== index) {
    moveTopic(dragFrom.value, index)
  }
  dragFrom.value = null
  // 延遲重啟提示框功能，避免立即顯示
  setTimeout(() => {
    isDragging.value = false
  }, 100)
}
function onDragEnd() {
  // 處理拖拽結束但沒有drop的情況
  dragFrom.value = null
  setTimeout(() => {
    isDragging.value = false
  }, 100)
}

// AI生成相關狀態
const isGenerating = ref(false)
const showGeneratedFields = ref(false)

// AI生成功能
async function generateAIContent() {
  if (!editingTopicDraft.value.scenario?.trim()) {
    alert('請先輸入情境說明')
    return
  }

  isGenerating.value = true

  try {
    // 模擬AI生成過程（2秒延遲）
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 模擬AI生成的內容
    const scenario = editingTopicDraft.value.scenario
    editingTopicDraft.value.keywords = generateMockKeywords(scenario)
    editingTopicDraft.value.keywordDesc = generateMockKeywordDesc(scenario)

    showGeneratedFields.value = true
  } catch (error) {
    console.error('AI生成失敗:', error)
    alert('AI生成失敗，請稍後再試')
  } finally {
    isGenerating.value = false
  }
}

// 模擬關鍵字生成
function generateMockKeywords(scenario: string): string {
  const keywords = [
    '人工智慧', '機器學習', '深度學習', '自然語言處理',
    '數據分析', '智能化', '自動化', '預測模型',
    '演算法', '神經網路', '大數據', '雲端運算'
  ]

  // 根據情境內容選擇相關關鍵字
  let selectedKeywords = keywords.slice(0, 4)

  if (scenario.includes('醫療') || scenario.includes('健康')) {
    selectedKeywords = ['醫療AI', '診斷系統', '健康監測', '精準醫療']
  } else if (scenario.includes('財經') || scenario.includes('金融')) {
    selectedKeywords = ['金融科技', '風險評估', '智能投顧', '區塊鏈']
  } else if (scenario.includes('教育') || scenario.includes('學習')) {
    selectedKeywords = ['教育科技', '個人化學習', '智慧教室', '學習分析']
  }

  return selectedKeywords.join(', ')
}

// 模擬關鍵字說明生成
function generateMockKeywordDesc(scenario: string): string {
  return `基於情境「${scenario}」，AI系統分析並生成了相關的關鍵字組合。這些關鍵字涵蓋了該領域的核心概念和技術要點，有助於精準捕捉相關文章和討論內容。系統會持續學習和優化關鍵字的準確性和相關性。`
}

function toggleSource(value: string) {
  const index = selectedSources.value.indexOf(value)
  if (index > -1) {
    selectedSources.value.splice(index, 1)
  } else {
    selectedSources.value.push(value)
  }
}

const isAllSourcesSelected = computed({
  get() {
    return sources.length > 0 && sources.every(s => selectedSources.value.includes(s.value))
  },
  set(value) {
    if (value) {
      selectedSources.value = sources.map(s => s.value)
    } else {
      selectedSources.value = []
    }
  }
})
function toggleAllSources() {
  isAllSourcesSelected.value = !isAllSourcesSelected.value
}
</script>

<style scoped>
.article-list-page {
  background: #f8fafc;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 40px 0;
  border-bottom: 1px solid #e2e8f0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  text-align: center;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 12px;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #4a5568;
  margin: 0;
}

.main-content {
  padding: 40px 0;
}

.query-section {
  margin-bottom: 40px;
}

.section-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  padding: 32px 32px 0;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 32px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px;
}

.card-subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0;
}

.query-form {
  padding: 0 32px 32px;
}

.form-group {
  margin-bottom: 32px;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.group-label {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.topic-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.topic-item:hover {
  border-color: #1976d2;
  background: #e3f2fd;
}

.topic-item.active {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

.topic-name {
  font-weight: 500;
}

.drag-handle {
  font-size: 16px;
  color: #9ca3af;
  cursor: grab;
}

.drag-handle:active {
  cursor: grabbing;
}

.topic-item.active .drag-handle {
  color: rgba(255, 255, 255, 0.7);
}

.topic-item:hover .drag-handle {
  color: #6b7280;
}

.topic-item.dragging {
  opacity: 0.5;
  transform: rotate(3deg);
}

.topic-item.drag-over {
  border-color: #1976d2;
  background: #e3f2fd;
  transform: scale(1.02);
}

.topic-add-btn {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: transparent;
  color: #1976d2;
  border: 2px solid #1976d2;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.topic-add-btn:hover:not(:disabled) {
  background: #1976d2;
  color: white;
}

.topic-add-btn:disabled {
  background: transparent;
  color: #cfd8dc;
  border-color: #cfd8dc;
  cursor: not-allowed;
}

.topic-add-btn .material-symbols-outlined {
  font-size: 18px;
  margin-right: 8px;
}

.period-options,
.source-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.period-item,
.source-item {
  padding: 10px 20px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.period-item:hover,
.source-item:hover {
  border-color: #1976d2;
  background: #e3f2fd;
}

.period-item.active,
.source-item.active {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.range-separator {
  color: #6b7280;
  font-weight: 500;
}

.form-control {
  padding: 10px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.form-actions {
  text-align: center;
  margin-top: 40px;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  cursor: pointer;
}

.btn-primary {
  background-color: #1976d2;
  color: white;
  border-color: #1976d2;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1565c0;
  border-color: #1565c0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-lg {
  padding: 14px 32px;
  font-size: 1.1rem;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.85rem;
}

.btn-outline-primary {
  background: transparent;
  color: #1976d2;
  border-color: #1976d2;
}

.btn-outline-primary:hover {
  background: #1976d2;
  color: white;
}

.btn-outline-secondary {
  background: transparent;
  color: #6b7280;
  border-color: #d1d5db;
}

.btn-outline-secondary:hover {
  background: #6b7280;
  color: white;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
  border-color: #6b7280;
}

.btn-danger {
  background-color: #dc2626;
  color: white;
  border-color: #dc2626;
}

.results-section .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  margin-bottom: 0;
}

.result-stats {
  display: flex;
  gap: 24px;
  font-size: 0.9rem;
  color: #6b7280;
}

.stat-item strong {
  color: #1976d2;
}

.article-list {
  padding: 0 32px 32px;
}

.article-item {
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.article-item:hover {
  background: #f8fafc;
}

.article-item:last-child {
  border-bottom: none;
}

.article-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.article-topic {
  padding: 4px 12px;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.article-date,
.article-source {
  font-size: 0.85rem;
  color: #6b7280;
}

.article-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 8px;
  line-height: 1.4;
}

.article-excerpt {
  color: #4a5568;
  line-height: 1.6;
  margin: 0 0 16px;
}

.article-actions {
  display: flex;
  gap: 12px;
}

/* Tooltip 樣式 */
.topic-tooltip {
  position: fixed;
  width: 280px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  z-index: 50;
  animation: fadeIn 0.2s ease;
  pointer-events: auto;
}

.tooltip-header {
  font-size: 1rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 8px;
}

.tooltip-desc {
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 16px;
}

.tooltip-actions {
  display: flex;
  gap: 8px;
}

.tooltip-btn {
  padding: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tooltip-btn:hover {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

/* Modal 樣式 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1400;
}

.modal-card {
  background: white;
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  padding: 24px 24px 0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 0 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.error-message {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 4px;
}

.source-select-all-btn {
  padding: 10px 20px;
  background: #f8fafc;
  color: #6b7280;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.source-select-all-btn:hover {
  border-color: #1976d2;
  background: #e3f2fd;
  color: #1976d2;
}

/* Modal 新增欄位樣式 */
.name-color-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.name-input {
  flex: 1;
}

.color-picker-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.color-picker {
  width: 50px;
  height: 42px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  background: none;
  padding: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  z-index: 2;
}

.color-preview {
  width: 50px;
  height: 42px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1;
}

.color-picker-wrapper:hover .color-preview {
  border-color: #1976d2;
  transform: scale(1.05);
}

.setting-type-options {
  display: flex;
  gap: 12px;
}

.setting-type-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  justify-content: center;
}

.setting-type-item:hover {
  border-color: #1976d2;
  background: #e3f2fd;
}

.setting-type-item.active {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

.setting-type-item .material-symbols-outlined {
  font-size: 20px;
}

.setting-text {
  font-weight: 500;
  font-size: 0.95rem;
}

.setting-type-item.active .setting-text {
  color: white;
}

/* AI設定區域樣式 */
.ai-settings-section {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.scenario-input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-ai-generate {
  align-self: flex-end;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
}

.btn-ai-generate:hover:not(:disabled) {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

.btn-ai-generate:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-ai-generate .material-symbols-outlined {
  font-size: 18px;
}

.generated-fields {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
  animation: slideIn 0.3s ease;
}

.generated-fields .form-control {
  background: white;
  border-color: #bae6fd;
}

.generated-fields .form-control:focus {
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.generated-fields .form-label {
  color: #0369a1;
  font-weight: 600;
}

/* 可觀看成員下拉選單樣式 */
.member-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-select {
  padding: 10px 16px;
  padding-right: 40px; /* 為箭頭留出空間 */
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: white;
  width: 100%;
  appearance: none; /* 隱藏預設箭頭 */
  -webkit-appearance: none;
  -moz-appearance: none;
}

.form-select:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.form-select option {
  padding: 8px 12px;
  background: white;
  color: #374151;
}

.form-select option:checked {
  background: #1976d2;
  color: white;
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 18px;
  pointer-events: none; /* 讓點擊穿透到select元素 */
  transition: all 0.2s ease;
}

.member-select-wrapper:hover .select-arrow {
  color: #1976d2;
}

.form-select:focus ~ .select-arrow {
  color: #1976d2;
  transform: translateY(-50%) rotate(180deg);
}
</style>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
