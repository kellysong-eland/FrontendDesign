<template>
  <div class="keyword-setting-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container">
        <div class="header-content">
          <h1 class="page-title">關鍵字設定</h1>
          <p class="page-subtitle">管理主題分類與關鍵字組合，建立專屬的內容分析規則</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="container">
        <!-- 主題管理區塊 -->
        <div class="management-section">
          <div class="section-card">
            <div class="card-header">
              <div class="header-left">
                <h2 class="card-title">主題管理</h2>
                <p class="card-subtitle">設定主題分類規則、關鍵詞組合與團隊權限</p>
              </div>
              <div class="header-actions">
                <span v-if="saved" class="status-badge locked">
                  <span class="material-symbols-outlined">lock</span>
                  已鎖定
                </span>
                <button v-if="saved" class="btn btn-outline-primary" @click="unlock">
                  <span class="material-symbols-outlined me-1">edit</span>
                  編輯模式
                </button>
                <button class="btn btn-primary" @click="openAddTopicModal" :disabled="saved">
                  <span class="material-symbols-outlined me-1">add</span>
                  新增主題
                </button>
                <button v-if="rows.length && !saved" class="btn btn-success" @click="saveAll" :disabled="!canSave">
                  <span class="material-symbols-outlined me-1">save</span>
                  儲存全部
                </button>
              </div>
            </div>

            <div class="table-container">
              <div class="table-responsive">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th width="3%"></th>
                      <th width="16%">主題名稱</th>
                      <th width="18%">描述</th>
                      <th width="10%">顏色標籤</th>
                      <th width="33%">關鍵詞組</th>
                      <th width="16%">可觀看成員</th>
                      <th width="4%" class="text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row,idx) in rows" :key="row.id"
                        :class="{'row-dragging': dragOverIndex===idx, 'row-locked': saved}"
                        :draggable="!saved"
                        @dragstart="onRowDragStart(idx)"
                        @dragover.prevent="onRowDragOver(idx)"
                        @drop.prevent="onRowDrop(idx)"
                        @dragend="onRowDragEnd">

                      <!-- Drag Handle -->
                      <td class="drag-cell">
                        <span class="material-symbols-outlined drag-handle" :class="{disabled: saved}">
                          drag_indicator
                        </span>
                      </td>

                      <!-- 主題名稱 -->
                      <td class="topic-cell">
                        <div class="input-wrapper">
                          <input v-model.trim="row.topic"
                                 type="text"
                                 class="form-input"
                                 placeholder="輸入主題名稱"
                                 :disabled="saved"
                                 :class="{'error': !!row.topicError}"
                                 @input="onTopicInput(row)"
                                 @blur="onTopicBlur(row)" />
                          <div v-if="row.topicError" class="error-message">{{ row.topicError }}</div>
                        </div>
                      </td>

                      <!-- 描述 -->
                      <td class="desc-cell">
                        <textarea v-model.trim="row.desc"
                                  rows="2"
                                  class="form-textarea"
                                  placeholder="輸入主題描述"
                                  :disabled="saved"
                                  @blur="onDescBlur(row)"></textarea>
                      </td>

                      <!-- 顏色標籤 -->
                      <td class="color-cell">
                        <div class="color-picker-wrapper">
                          <input type="color"
                                 v-model="row.color"
                                 class="color-input"
                                 title="選擇顏色"
                                 :disabled="saved" />
                          <div class="color-preview" :style="{ backgroundColor: row.color }"></div>
                        </div>
                      </td>

                      <!-- 關鍵詞組 -->
                      <td class="keywords-cell">
                        <div class="keywords-wrapper">
                          <textarea v-model="row.keywords"
                                    rows="2"
                                    class="form-textarea"
                                    placeholder="以逗號或空白分隔關鍵詞"
                                    :disabled="saved"
                                    @input="onKeywordsInput(row)"
                                    @blur="onKeywordsBlur(row)"
                                    @focus="onKeywordsInput(row)"></textarea>
                          <div class="keywords-hint">自動完成，點選建議可插入</div>
                          <div v-if="row.showSuggest && row.filteredSuggestions.length" class="suggestions-list">
                            <div v-for="s in row.filteredSuggestions"
                                 :key="s"
                                 @mousedown.prevent="applySuggestion(row, s)"
                                 class="suggestion-item">{{ s }}</div>
                          </div>
                        </div>
                      </td>

                      <!-- 可觀看成員 -->
                      <td class="members-cell">
                        <div class="members-wrapper">
                          <div class="member-tags">
                            <span v-for="(m,i) in row.members" :key="i" class="member-tag">
                              {{ m }}
                              <button type="button"
                                      class="remove-btn"
                                      @click="removeMember(row,i)"
                                      :disabled="saved">&times;</button>
                            </span>
                            <span v-if="!row.members.length" class="empty-state">尚未設定成員</span>
                          </div>
                          <div class="member-input" v-if="!saved">
                            <input v-model.trim="row.memberInput"
                                   type="text"
                                   class="form-input"
                                   placeholder="輸入成員帳號"
                                   @keyup.enter.prevent="addMember(row)" />
                            <button class="add-btn" type="button" @click="addMember(row)">加入</button>
                          </div>
                        </div>
                      </td>

                      <!-- 操作 -->
                      <td class="action-cell">
                        <button class="action-btn delete-btn"
                                @click="removeRowAndTopic(row)"
                                :disabled="saved"
                                title="刪除此主題">
                          <span class="material-symbols-outlined">delete</span>
                        </button>
                      </td>
                    </tr>

                    <tr v-if="!rows.length" class="empty-row">
                      <td colspan="7" class="empty-state-cell">
                        <div class="empty-illustration">
                          <span class="material-symbols-outlined">topic</span>
                        </div>
                        <div class="empty-text">
                          <h3>尚無主題資料</h3>
                          <p>點選「新增主題」開始建立您的第一個主題分類</p>
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
    </div>

    <!-- 新增主題 Modal -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="closeAddTopicModal">
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">新增主題</h3>
          <button type="button" class="close-btn" @click="closeAddTopicModal">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">主題名稱 <span class="required">*</span></label>
            <input v-model="newTopicName"
                   type="text"
                   class="form-control"
                   :class="{'error': !!newTopicError}"
                   @input="validateNewTopic" />
            <div v-if="newTopicError" class="error-message">{{ newTopicError }}</div>
          </div>
          <div class="form-group">
            <label class="form-label">描述</label>
            <textarea v-model="newTopicDesc"
                      rows="3"
                      class="form-control"
                      placeholder="輸入主題描述（可選）"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeAddTopicModal">取消</button>
          <button type="button"
                  class="btn btn-primary"
                  @click="confirmAddTopic"
                  :disabled="!!newTopicError || !newTopicName.trim()">新增主題</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useTopics, type Topic } from '@/composables/useTopics'

interface KeywordRow {
  id: number
  topic: string
  originalName: string
  desc: string
  topicError?: string
  color: string
  keywords: string
  members: string[]
  memberInput?: string
  showSuggest?: boolean
  filteredSuggestions: string[]
}

const { topics, addTopic, updateTopic, deleteTopic } = useTopics()

// 初始表格行：根據現有 topics 建立（保留示例 default 設定）
const rows = reactive<KeywordRow[]>([])

function ensureRowsFromTopics() {
  topics.value.forEach(t => {
    if (!rows.some(r => r.originalName === t.name)) {
      rows.push({ id: nextId(), topic: t.name, originalName: t.name, desc: t.desc, color: randomColor(), keywords: '', members: [], memberInput: '', filteredSuggestions: [], showSuggest:false })
    } else {
      // 更新描述同步
      const row = rows.find(r => r.originalName === t.name)!
      row.desc = t.desc
    }
  })
  for (let i = rows.length -1; i >=0; i--) {
    if (!topics.value.some(t => t.name === rows[i].originalName)) rows.splice(i,1)
  }
  // 讓 rows 順序跟 topics 順序一致
  rows.sort((a,b) => topics.value.findIndex(t=>t.name===a.originalName) - topics.value.findIndex(t=>t.name===b.originalName))
}
ensureRowsFromTopics()

watch(() => topics.value.length, () => ensureRowsFromTopics())

const saved = ref(true)

function nextId() { return rows.length ? Math.max(...rows.map(r=>r.id)) + 1 : 1 }
function randomColor() { return '#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0') }

/* 主題新增 Modal */
const showAddModal = ref(false)
const newTopicName = ref('')
const newTopicDesc = ref('')
const newTopicError = ref('')

function openAddTopicModal() {
  newTopicName.value = ''
  newTopicDesc.value = ''
  newTopicError.value = ''
  showAddModal.value = true
}
function closeAddTopicModal() { showAddModal.value = false }

function validateNewTopic() {
  const name = newTopicName.value.trim()
  if (!name) { newTopicError.value = '主題名稱不可為空'; return }
  if (topics.value.some(t => t.name === name)) { newTopicError.value = '主題已存在'; return }
  newTopicError.value = ''
}
function confirmAddTopic() {
  validateNewTopic()
  if (newTopicError.value) return
  const topic: Topic = { name: newTopicName.value.trim(), desc: newTopicDesc.value.trim() }
  try {
    addTopic(topic)
    rows.push({ id: nextId(), topic: topic.name, originalName: topic.name, desc: topic.desc, color: randomColor(), keywords: '', members: [], memberInput: '', filteredSuggestions: [], showSuggest:false })
    showAddModal.value = false
  } catch {}
}

/* 列操作 */
function removeRowAndTopic(row: KeywordRow) {
  const idx = rows.findIndex(r => r.id === row.id)
  if (idx !== -1) rows.splice(idx,1)
  deleteTopic(row.originalName)
}

/* 成員 */
function addMember(row: KeywordRow) {
  if (!row.memberInput) return
  const val = row.memberInput.trim()
  if (!val) return
  if (!row.members.includes(val)) row.members.push(val)
  row.memberInput = ''
}
function removeMember(row: KeywordRow, index: number) { row.members.splice(index,1) }

/* 關鍵詞處理與自動完成 */
const keywordSuggestions = ref<string[]>([
  'AI','人工智慧','機器學習','深度學習','大數據','雲端','區塊鏈','投資','ETF','金融','利率','通膨','健康','旅遊','美食','電影','影視','足球','棒球','籃球','科技產業'
])

function parseKeywords(input: string): string[] {
  return input.split(/[\s,;，；,]+/).map(s=>s.trim()).filter(Boolean)
}
function onKeywordsInput(row: KeywordRow) {
  if (saved.value) return
  const cursorToken = (row.keywords.match(/([^,;\s]+)$/)?.[1] || '').toLowerCase()
  if (!cursorToken) {
    row.filteredSuggestions = keywordSuggestions.value.slice(0,8)
    row.showSuggest = true
    return
  }
  row.filteredSuggestions = keywordSuggestions.value
    .filter(k => k.toLowerCase().startsWith(cursorToken) && !parseKeywords(row.keywords).includes(k))
    .slice(0,8)
  row.showSuggest = !!row.filteredSuggestions.length
}
function applySuggestion(row: KeywordRow, suggestion: string) {
  if (/(?:[^,;\s]+)$/.test(row.keywords)) {
    row.keywords = row.keywords.replace(/([^,;\s]+)$/, suggestion)
  } else {
    row.keywords = row.keywords.trim()
    row.keywords += (row.keywords ? ', ' : '') + suggestion
  }
  row.showSuggest = false
  onKeywordsInput(row)
}
function onKeywordsBlur(row: KeywordRow) { setTimeout(()=> row.showSuggest = false, 150) }

/* 主題 inline 編輯 */
function onTopicInput(row: KeywordRow) {
  if (saved.value) return
  const name = row.topic.trim()
  if (!name) { row.topicError = '不可為空'; return }
  if (topics.value.some(t => t.name === name && t.name !== row.originalName)) { row.topicError = '主題重複'; return }
  row.topicError = ''
}
function onTopicBlur(row: KeywordRow) {
  if (saved.value) return
  onTopicInput(row)
  if (row.topicError) { row.topic = row.originalName; row.topicError = ''; return }
  if (row.topic !== row.originalName) {
    const existing = topics.value.find(t => t.name === row.originalName)
    if (existing) {
      try {
        updateTopic(row.originalName, { name: row.topic, desc: row.desc })
        row.originalName = row.topic
      } catch { row.topic = row.originalName }
    }
  }
}
function onDescBlur(row: KeywordRow) {
  if (saved.value) return
  const existing = topics.value.find(t => t.name === row.originalName)
  if (existing) updateTopic(row.originalName, { name: row.originalName, desc: row.desc })
}

/* 儲存鎖定 */
const canSave = computed(() => rows.length && rows.every(r => r.topic.trim() && !r.topicError))

function saveAll() {
  if (!canSave.value) return
  // 可在此呼叫 syncToServer()
  const payload = rows.map(r => ({ id: r.id, topic: r.topic.trim(), desc: r.desc, color: r.color, keywords: parseKeywords(r.keywords), members: r.members }))
  console.log('SAVE', payload)
  saved.value = true
}
function unlock() { saved.value = false }

/* Drag reorder */
const dragFromIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)
function onRowDragStart(i:number){ if(saved.value) return; dragFromIndex.value = i }
function onRowDragOver(i:number){ if(saved.value) return; dragOverIndex.value = i }
function onRowDrop(i:number){
  if(saved.value) return
  if(dragFromIndex.value!==null && dragFromIndex.value!==i){
    const row = rows.splice(dragFromIndex.value,1)[0]
    rows.splice(i,0,row)
    // 重建 topics 順序
    topics.value = rows.map(r => {
      const t = topics.value.find(tt=>tt.name===r.originalName)!
      return { ...t }
    })
  }
  dragFromIndex.value = null
  dragOverIndex.value = null
}
function onRowDragEnd(){ dragFromIndex.value=null; dragOverIndex.value=null }
</script>

<style scoped>
.keyword-setting-page {
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

.section-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  padding: 32px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.header-left {
  flex: 1;
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

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.locked {
  background: #fef3c7;
  color: #92400e;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  cursor: pointer;
  font-size: 0.9rem;
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

.btn-outline-primary {
  background: transparent;
  color: #1976d2;
  border-color: #1976d2;
}

.btn-outline-primary:hover {
  background: #1976d2;
  color: white;
}

.btn-success {
  background-color: #059669;
  color: white;
  border-color: #059669;
}

.btn-success:hover:not(:disabled) {
  background-color: #047857;
  border-color: #047857;
}

.btn-secondary {
  background-color: #6b7280;
  color: white;
  border-color: #6b7280;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.data-table th {
  background: #f8fafc;
  padding: 16px 12px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
}

.data-table td {
  padding: 16px 12px;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
}

.data-table tbody tr {
  transition: all 0.2s ease;
}

.data-table tbody tr:hover:not(.empty-row) {
  background: #f8fafc;
}

.row-dragging {
  background: #e3f2fd !important;
  opacity: 0.8;
}

.drag-cell {
  text-align: center;
}

.drag-handle {
  cursor: grab;
  color: #9ca3af;
  font-size: 18px;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.drag-handle:hover:not(.disabled) {
  background: #f3f4f6;
  color: #1976d2;
}

.drag-handle.disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.input-wrapper {
  position: relative;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.form-input.error,
.form-textarea.error {
  border-color: #dc2626;
}

.form-input:disabled,
.form-textarea:disabled {
  background: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 60px;
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.color-input {
  width: 40px;
  height: 40px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-input:hover {
  border-color: #1976d2;
}

.color-preview {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #e5e7eb;
}

.keywords-wrapper {
  position: relative;
}

.keywords-hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 4px;
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 150px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.suggestion-item:hover {
  background: #f8fafc;
  color: #1976d2;
}

.members-wrapper {
  min-height: 60px;
}

.member-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.member-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #1976d2;
  color: white;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.remove-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 14px;
  line-height: 1;
}

.remove-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.remove-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background: #1976d2;
  border-color: #1976d2;
  color: white;
}

.action-cell {
  text-align: center;
}

.action-btn {
  padding: 8px;
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover:not(:disabled) {
  background: #fecaca;
  border-color: #f87171;
  color: #dc2626;
}

.delete-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.empty-row td {
  border: none;
}

.empty-state-cell {
  text-align: center;
  padding: 60px 20px;
}

.empty-illustration {
  margin-bottom: 20px;
}

.empty-illustration .material-symbols-outlined {
  font-size: 48px;
  color: #d1d5db;
}

.empty-text h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px;
}

.empty-text p {
  color: #6b7280;
  margin: 0;
}

.empty-state {
  color: #9ca3af;
  font-size: 0.85rem;
  font-style: italic;
}

.error-message {
  color: #dc2626;
  font-size: 0.8rem;
  margin-top: 4px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.close-btn {
  padding: 8px;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
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

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.required {
  color: #dc2626;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.form-control.error {
  border-color: #dc2626;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .card-header {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
    padding: 24px 20px;
  }

  .header-actions {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .table-container {
    margin: -1px;
  }

  .data-table th,
  .data-table td {
    padding: 12px 8px;
  }

  .member-input {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .data-table {
    font-size: 0.8rem;
  }

  .btn {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
}
</style>
