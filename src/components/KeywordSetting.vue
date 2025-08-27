<template>
  <div class="container-fluid bg-light min-vh-100">
    <!-- Page Header -->
    <div class="py-4 bg-gradient border-bottom">
      <div class="container">
        <div class="text-center">
          <h1 class="display-4 mb-2 fw-medium fs-1">關鍵字設定</h1>
          <p class="lead text-muted">管理主題分類與關鍵字組合，建立專屬的內容分析規則</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="py-5">
      <div class="container">
        <!-- 主題管理區塊 -->
        <div class="card shadow-lg">
          <div class="card-header bg-white border-bottom-0 py-4">
            <div class="d-flex justify-content-between align-items-center me-2">
              <div>
<!--                <h2 class="h4 mb-2">主題管理</h2>-->
<!--                <p class="text-muted mb-0">設定主題分類規則、關鍵詞組合與團隊權限</p>-->
              </div>
              <div class="d-flex gap-3 align-items-center">
<!--                <span v-if="isEditing" class="badge bg-success d-flex align-items-center gap-1">-->
<!--                  <span class="material-symbols-outlined">lock_open</span>-->
<!--                  編輯中-->
<!--                </span>-->
<!--                <span v-else class="badge bg-secondary d-flex align-items-center gap-1">-->
<!--                  <span class="material-symbols-outlined">lock</span>-->
<!--                  已鎖定-->
<!--                </span>-->
                <button class="btn btn-primary d-flex align-items-center gap-2"
                        @click="openAddTopicModal"
                        :disabled="isEditing">
                  <span class="material-symbols-outlined">add</span>
                  新增主題
                </button>
                <button class="btn btn-primary d-flex align-items-center gap-2" @click="toggleEditMode">
                  <span class="material-symbols-outlined">
                    {{ isEditing ? 'check' : 'edit' }}
                  </span>
                  {{ isEditing ? '儲存' : '編輯主題' }}
                </button>
              </div>
            </div>
          </div>

          <div class="card-body p-4">
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th style="width: 3%"></th>
                    <th style="width: 20%">主題名稱</th>
                    <th style="width: 12%">顏色標籤</th>
                    <th style="width: 40%">關鍵詞組</th>
                    <th style="width: 20%">可觀看成員</th>
                    <th style="width: 5%" class="text-center">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row,idx) in rows"
                      :key="row.id"
                      :class="{'opacity-50': dragOverIndex===idx, 'bg-light': !isEditing}"
                      :draggable="isEditing"
                      @dragstart="onRowDragStart(idx)"
                      @dragover.prevent="onRowDragOver(idx)"
                      @drop.prevent="onRowDrop"
                      @dragend="onRowDragEnd">

                    <!-- Drag Handle -->
                    <td>
                      <span class="material-symbols-outlined text-muted"
                            :class="{'opacity-50': !isEditing}">
                        drag_indicator
                      </span>
                    </td>

                    <!-- 主題名稱 -->
                    <td>
                      <input v-model.trim="row.topic"
                             type="text"
                             class="form-control form-control-sm"
                             :class="{'is-invalid': row.topicError}"
                             placeholder="輸入主題名稱"
                             :disabled="!isEditing"
                             @input="onTopicInput(row)"
                             @blur="onTopicBlur(row)" />
                      <div class="invalid-feedback" v-if="row.topicError">
                        {{ row.topicError }}
                      </div>
                    </td>

                    <!-- 顏色標籤 -->
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <input type="color"
                               v-model="row.color"
                               class="form-control form-control-color"
                               title="選擇顏色"
                               :disabled="!isEditing" />
                        <div class="rounded-circle"
                             style="width: 24px; height: 24px;"
                             :style="{ backgroundColor: row.color }"></div>
                      </div>
                    </td>

                    <!-- 關鍵詞組 -->
                    <td>
                      <div class="position-relative">
                        <textarea v-model="row.keywords"
                                 rows="2"
                                 class="form-control form-control-sm"
                                 placeholder="以逗號或空白分隔關鍵詞"
                                 :disabled="!isEditing"
                                 @input="onKeywordsInput(row)"
                                 @blur="onKeywordsBlur(row)"
                                 @focus="onKeywordsInput(row)"></textarea>
                        <small class="text-muted">自動完成，點選建議可插入</small>
                        <div v-if="row.showSuggest && row.filteredSuggestions.length"
                             class="dropdown-menu show w-100">
                          <button v-for="s in row.filteredSuggestions"
                                  :key="s"
                                  class="dropdown-item"
                                  @mousedown.prevent="applySuggestion(row, s)">
                            {{ s }}
                          </button>
                        </div>
                      </div>
                    </td>

                    <!-- 可觀看成員 -->
                    <td>
                      <div class="d-flex flex-column gap-2">
                        <div class="d-flex flex-wrap gap-1">
                          <span v-for="(m,i) in row.members"
                                :key="i"
                                class="badge bg-primary">
                            {{ m }}
                            <button type="button"
                                    class="btn-close btn-close-white ms-1"
                                    style="font-size: 0.6rem;"
                                    @click="removeMember(row,i)"
                                    :disabled="!isEditing"></button>
                          </span>
                          <span v-if="!row.members.length" class="text-muted small">
                            尚未設定成員
                          </span>
                        </div>
                        <div v-if="isEditing" class="input-group input-group-sm">
                          <input v-model.trim="row.memberInput"
                                 type="text"
                                 class="form-control"
                                 placeholder="輸入成員帳號"
                                 @keyup.enter.prevent="addMember(row)" />
                          <button class="btn btn-outline-primary"
                                  type="button"
                                  @click="addMember(row)">
                            加入
                          </button>
                        </div>
                      </div>
                    </td>

                    <!-- 操作 -->
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-danger"
                              @click="removeRowAndTopic(row)"
                              :hidden="!isEditing"
                              title="刪除此主題">
                        <span class="material-symbols-outlined">delete</span>
                      </button>
                    </td>
                  </tr>

                  <tr v-if="!rows.length">
                    <td colspan="6" class="text-center p-5">
                      <div class="text-muted">
                        <span class="material-symbols-outlined" style="font-size: 2rem;">topic</span>
                        <h5 class="mt-3">尚無主題資料</h5>
                        <p class="mb-0">點選「新增主題」開始建立您的第一個主題分類</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Topic Modal -->
    <TopicModal
      :visible="showAddModal"
      :isEdit="false"
      :existingTopics="topics"
      :membersList="membersList"
      @close="closeAddTopicModal"
      @save="handleTopicSave"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useTopics, type Topic } from '@/composables/useTopics'
import TopicModal from './TopicModal.vue'

interface KeywordRow {
  id: number
  topic: string
  originalName: string
  topicError?: string
  color: string
  keywords: string
  members: string[]
  memberInput?: string
  showSuggest?: boolean
  filteredSuggestions: string[]
}

const { topics, addTopic, updateTopic, deleteTopic } = useTopics()

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

// 初始表格行：根據現有 topics 建立
const rows = reactive<KeywordRow[]>([])

function ensureRowsFromTopics() {
  topics.value.forEach(t => {
    if (!rows.some(r => r.originalName === t.name)) {
      const newRow: KeywordRow = {
        id: Date.now() + Math.random(),
        topic: t.name,
        originalName: t.name,
        color: t.color || '#2196F3',
        keywords: t.keywords || '',
        members: [],
        memberInput: '',
        showSuggest: false,
        filteredSuggestions: []
      }
      rows.push(newRow)
    }
  })
}

// 初始化時確保同步
ensureRowsFromTopics()

// 監聽 topics 變化
watch(topics, () => {
  ensureRowsFromTopics()
}, { deep: true })

// 編輯狀態管理
const isEditing = ref(false)

// 新增主題 Modal
const showAddModal = ref(false)

function openAddTopicModal() {
  showAddModal.value = true
}

function closeAddTopicModal() {
  showAddModal.value = false
}

function handleTopicSave(topic: Topic) {
  try {
    addTopic(topic)
    // 同時在表格中新增對應的行
    const newRow: KeywordRow = {
      id: Date.now() + Math.random(),
      topic: topic.name,
      originalName: topic.name,
      color: topic.color || '#2196F3',
      keywords: topic.keywords || '',
      members: [],
      memberInput: '',
      showSuggest: false,
      filteredSuggestions: []
    }
    rows.push(newRow)
    showAddModal.value = false
  } catch (e) {
    // 處理錯誤（主題名稱重複等）
    console.error('新增主題失敗:', e)
  }
}

// 編輯模式切換
function toggleEditMode() {
  isEditing.value = !isEditing.value

  // 當結束編輯時，自動保存當前的更改
  if (!isEditing.value) {
    autoSaveChanges()
  }
}

// 自動保存功能
function autoSaveChanges() {
  rows.forEach(row => {
    if (row.originalName !== row.topic || needsUpdate(row)) {
      const updatedTopic: Topic = {
        name: row.topic,
        color: row.color,
        keywords: row.keywords,
        desc: '', // 添加必需的desc屬性
        members: [] // 添加必需的members屬性
      }
      try {
        if (row.originalName) {
          updateTopic(row.originalName, updatedTopic)
        } else {
          addTopic(updatedTopic)
        }
        row.originalName = row.topic
      } catch (e) {
        console.error('自動保存失敗:', e)
      }
    }
  })
}

// 檢查是否需要更新
function needsUpdate(row: KeywordRow): boolean {
  const existingTopic = topics.value.find(t => t.name === row.originalName)
  if (!existingTopic) return true

  return existingTopic.color !== row.color ||
         existingTopic.keywords !== row.keywords
}

// 表格操作
function onTopicInput(row: KeywordRow) {
  validateTopicName(row)
}

function onTopicBlur(row: KeywordRow) {
  validateTopicName(row)
}

function validateTopicName(row: KeywordRow) {
  const name = row.topic.trim()
  if (!name) {
    row.topicError = '主題名稱不能為空'
    return
  }

  // 檢查是否與其他行重複
  const duplicate = rows.find(r => r !== row && r.topic.trim() === name)
  if (duplicate) {
    row.topicError = '主題名稱不能重複'
    return
  }

  row.topicError = undefined
}

// 關鍵詞建議功能
const keywordSuggestions = [
  'AI', '人工智慧', '機器學習', '深度學習', 'ChatGPT', 'GPT',
  '區塊鏈', '加密貨幣', '比特幣', '以太坊', 'NFT', 'DeFi',
  '股市', '投資', '基金', '債券', '房地產', '通膨',
  '健康', '醫療', '疫苗', '新冠', 'COVID', '運動',
  '環保', '永續', '綠能', '電動車', '特斯拉', '氣候變遷'
]

function onKeywordsInput(row: KeywordRow) {
  const input = row.keywords
  if (!input) {
    row.showSuggest = false
    return
  }

  const words = input.split(/[,，;；\s]+/).map(s => s.trim()).filter(Boolean)
  const lastWord = words[words.length - 1]

  if (lastWord && lastWord.length >= 1) {
    row.filteredSuggestions = keywordSuggestions.filter(s =>
      s.toLowerCase().includes(lastWord.toLowerCase()) && !words.includes(s)
    ).slice(0, 6)
    row.showSuggest = row.filteredSuggestions.length > 0
  } else {
    row.showSuggest = false
  }
}

function onKeywordsBlur(row: KeywordRow) {
  setTimeout(() => {
    row.showSuggest = false
  }, 200)
}

function applySuggestion(row: KeywordRow, suggestion: string) {
  const input = row.keywords.split(/[,，;；\s]+/).map(s => s.trim()).filter(Boolean)
  input[input.length - 1] = suggestion
  row.keywords = input.join(', ') + ', '
  row.showSuggest = false
}

// 成員管理
function addMember(row: KeywordRow) {
  const member = row.memberInput?.trim()
  if (member && !row.members.includes(member)) {
    row.members.push(member)
    row.memberInput = ''
  }
}

function removeMember(row: KeywordRow, index: number) {
  row.members.splice(index, 1)
}

// 刪除行和主題
function removeRowAndTopic(row: KeywordRow) {
  if (confirm(`確定要刪除主題「${row.topic}」嗎？`)) {
    // 從 topics 中刪除
    try {
      deleteTopic(row.originalName)
    } catch (e) {
      console.error('刪除主題失敗:', e)
    }

    // 從表格中移除行
    const index = rows.indexOf(row)
    if (index !== -1) {
      rows.splice(index, 1)
    }
  }
}

// 拖曳排序
const dragOverIndex = ref(-1)
const draggedRowIndex = ref(-1)

function onRowDragStart(idx: number) {
  draggedRowIndex.value = idx
  dragOverIndex.value = idx
}

function onRowDragOver(idx: number) {
  if (draggedRowIndex.value === -1 || idx === draggedRowIndex.value) return

  dragOverIndex.value = idx
}

function onRowDrop() {
  if (draggedRowIndex.value === -1 || dragOverIndex.value === -1) return
  if (draggedRowIndex.value === dragOverIndex.value) return

  // 執行拖曳排序
  const draggedRow = rows[draggedRowIndex.value]
  rows.splice(draggedRowIndex.value, 1)
  rows.splice(dragOverIndex.value, 0, draggedRow)

  // 重置狀態
  draggedRowIndex.value = -1
  dragOverIndex.value = -1
}

function onRowDragEnd() {
  // 重置所有拖曳狀態
  draggedRowIndex.value = -1
  dragOverIndex.value = -1
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.table-hover tbody tr:hover {
  background-color: #f8fafc;
}

.position-relative {
  position: relative;
}

.dropdown-menu.show {
  display: block !important;
}

.btn-close-white {
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(210deg);
}

.text-muted {
  color: #6b7280 !important;
}

.text-success {
  color: #16a34a !important;
}

.text-danger {
  color: #dc2626 !important;
}

.badge {
  padding: 0.5em 0.75em;
  border-radius: 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #1976d2;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1565c0;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-outline-primary {
  background-color: transparent;
  color: #1976d2;
  border: 1px solid #1976d2;
}

.btn-outline-primary:hover:not(:disabled) {
  background-color: #1976d2;
  color: white;
}

.btn-outline-danger {
  color: #dc2626;
  border: 1px solid #dc2626;
}

.btn-outline-danger:hover:not(:disabled) {
  background-color: #dc2626;
  color: white;
}

.form-control,
.form-control-sm {
  padding: 0.375rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.form-control:focus,
.form-control-sm:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.form-control:disabled,
.form-control-sm:disabled {
  background-color: #f8fafc;
  color: #6b7280;
  cursor: not-allowed;
}

.is-invalid {
  border-color: #dc2626;
}

.invalid-feedback {
  color: #dc2626;
  font-size: 0.8rem;
  margin-top: 4px;
}

.form-control-color {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-control-color:hover {
  border-color: #1976d2;
  transform: scale(1.05);
}

.form-control-color:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.rounded-circle {
  border-radius: 50% !important;
}

.keywords-wrapper {
  position: relative;
}

.keywords-hint {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 4px;
}

.suggestions-list {
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 0.9rem;
}

.suggestion-item:hover {
  background-color: #f8fafc;
}

.members-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.member-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.member-tag {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1976d2;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.remove-btn {
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 0 2px;
  transition: color 0.2s ease;
}

.remove-btn:hover:not(:disabled) {
  color: #b91c1c;
}

.remove-btn:disabled {
  color: #9ca3af;
  cursor: not-allowed;
}

.empty-state {
  color: #9ca3af;
  font-size: 0.85rem;
  font-style: italic;
}

.member-input {
  display: flex;
  gap: 8px;
}

.member-input .form-input {
  flex: 1;
}

.add-btn {
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: #1565c0;
  transform: translateY(-1px);
}

.action-btn {
  padding: 8px;
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn {
  color: #dc2626;
}

.delete-btn:hover:not(:disabled) {
  background: #fee2e2;
  border-color: #fecaca;
}

.delete-btn:disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.row-dragging {
  opacity: 0.5;
}

.row-locked {
  background-color: #f8fafc !important;
}

.row-locked input,
.row-locked textarea {
  background-color: #f1f5f9;
}

.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-size: 18px;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
}

.me-1 {
  margin-right: 4px;
}
</style>
