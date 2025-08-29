<template>
  <div class="keyword-setting-page">
    <!-- Page Header -->
    <div class="page-header bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="display-5 fw-bold text-dark mb-3">關鍵字設定</h1>
            <p class="lead text-muted">管理主題分類與關鍵字組合，建立專屬的內容分析規則</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content py-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- 主題管理區塊 -->
            <div class="card shadow-sm">
              <div class="card-header bg-white p-4">
                <div class="row align-items-start">
                  <div class="col-md-8">
                    <h2 class="h4 fw-semibold text-dark mb-2">主題管理</h2>
                    <p class="text-muted mb-0">設定主題分類規則、關鍵詞組合與團隊權限</p>
                  </div>
                  <div class="col-md-4 text-end">
                    <div class="d-flex justify-content-end align-items-center gap-2">
                      <span v-if="saved" class="badge bg-warning text-dark d-flex align-items-center gap-1">
                        <span class="material-symbols-outlined">lock</span>
                        已鎖定
                      </span>
                      <button v-if="saved" class="btn btn-outline-primary btn-sm" @click="unlock">
                        <span class="material-symbols-outlined me-1">edit</span>
                        編輯模式
                      </button>
                      <button class="btn btn-primary btn-sm" @click="openAddTopicModal" :disabled="saved">
                        <span class="material-symbols-outlined me-1">add</span>
                        新增主題
                      </button>
                      <button v-if="rows.length && !saved" class="btn btn-success btn-sm" @click="saveAll" :disabled="!canSave">
                        <span class="material-symbols-outlined me-1">save</span>
                        儲存全部
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table table-hover mb-0">
                    <thead class="table-light">
                      <tr>
                        <th width="3%" class="border-0"></th>
                        <th width="16%" class="border-0">主題名稱</th>
                        <th width="18%" class="border-0">描述</th>
                        <th width="10%" class="border-0">顏色標籤</th>
                        <th width="33%" class="border-0">關鍵詞組</th>
                        <th width="16%" class="border-0">可觀看成員</th>
                        <th width="4%" class="text-center border-0">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row,idx) in rows" :key="row.id"
                          :class="{'table-info': dragOverIndex===idx, 'table-secondary': saved && row.topicError}"
                          :draggable="!saved"
                          @dragstart="onRowDragStart(idx)"
                          @dragover.prevent="onRowDragOver(idx)"
                          @drop.prevent="onRowDrop(idx)"
                          @dragend="onRowDragEnd">

                        <!-- Drag Handle -->
                        <td class="align-middle text-center">
                          <span class="material-symbols-outlined drag-handle"
                                :class="{'text-muted': saved, 'text-primary': !saved}"
                                style="cursor: grab;">
                            drag_indicator
                          </span>
                        </td>

                        <!-- 主題名稱 -->
                        <td class="align-middle">
                          <div class="position-relative">
                            <input v-model.trim="row.topic"
                                   type="text"
                                   class="form-control form-control-sm"
                                   :class="{'is-invalid': !!row.topicError}"
                                   placeholder="輸入主題名稱"
                                   :disabled="saved"
                                   @input="onTopicInput(row)"
                                   @blur="onTopicBlur(row)" />
                            <div v-if="row.topicError" class="invalid-feedback">{{ row.topicError }}</div>
                          </div>
                        </td>

                        <!-- 描述 -->
                        <td class="align-middle">
                          <textarea v-model.trim="row.desc"
                                    rows="2"
                                    class="form-control form-control-sm"
                                    placeholder="輸入主題描述"
                                    :disabled="saved"
                                    @blur="onDescBlur(row)"></textarea>
                        </td>

                        <!-- 顏色標籤 -->
                        <td class="align-middle">
                          <div class="d-flex align-items-center gap-2">
                            <input type="color"
                                   v-model="row.color"
                                   class="form-control form-control-color"
                                   title="選擇顏色"
                                   :disabled="saved"
                                   style="width: 40px; height: 40px;" />
                            <div class="rounded-circle border"
                                 :style="{ backgroundColor: row.color, width: '24px', height: '24px' }"></div>
                          </div>
                        </td>

                        <!-- 關鍵詞組 -->
                        <td class="align-middle">
                          <div class="position-relative">
                            <textarea v-model="row.keywords"
                                      rows="2"
                                      class="form-control form-control-sm"
                                      placeholder="以逗號或空白分隔關鍵詞"
                                      :disabled="saved"
                                      @input="onKeywordsInput(row)"
                                      @blur="onKeywordsBlur(row)"
                                      @focus="onKeywordsInput(row)"></textarea>
                            <small class="text-muted">自動完成，點選建議可插入</small>
                            <div v-if="row.showSuggest && row.filteredSuggestions.length"
                                 class="position-absolute bg-white border rounded shadow-sm mt-1 w-100"
                                 style="z-index: 1000; max-height: 150px; overflow-y: auto;">
                              <div v-for="s in row.filteredSuggestions"
                                   :key="s"
                                   @mousedown.prevent="applySuggestion(row, s)"
                                   class="p-2 border-bottom cursor-pointer suggestion-item">{{ s }}</div>
                            </div>
                          </div>
                        </td>

                        <!-- 可觀看成員 -->
                        <td class="align-middle">
                          <div style="min-height: 60px;">
                            <div class="d-flex flex-wrap gap-1 mb-2">
                              <span v-for="(m,i) in row.members" :key="i" class="badge bg-primary d-flex align-items-center gap-1">
                                {{ m }}
                                <button type="button"
                                        class="btn-close btn-close-white"
                                        style="font-size: 0.6em;"
                                        @click="removeMember(row,i)"
                                        :disabled="saved"></button>
                              </span>
                              <small v-if="!row.members.length" class="text-muted fst-italic">尚未設定成員</small>
                            </div>
                            <div class="input-group input-group-sm" v-if="!saved">
                              <input v-model.trim="row.memberInput"
                                     type="text"
                                     class="form-control"
                                     placeholder="輸入成員帳號"
                                     @keyup.enter.prevent="addMember(row)" />
                              <button class="btn btn-outline-secondary" type="button" @click="addMember(row)">加入</button>
                            </div>
                          </div>
                        </td>

                        <!-- 操作 -->
                        <td class="align-middle text-center">
                          <button class="btn btn-outline-danger btn-sm"
                                  @click="removeRowAndTopic(row)"
                                  :disabled="saved"
                                  title="刪除此主題">
                            <span class="material-symbols-outlined">delete</span>
                          </button>
                        </td>
                      </tr>

                      <tr v-if="!rows.length">
                        <td colspan="7" class="text-center py-5">
                          <div class="text-muted">
                            <span class="material-symbols-outlined d-block mb-3" style="font-size: 48px;">topic</span>
                            <h5 class="fw-semibold text-secondary">尚無主題資料</h5>
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
      </div>
    </div>

    <!-- Bootstrap Modal for 新增主題 -->
    <div v-if="showAddModal" class="modal fade show d-block" tabindex="-1" @click.self="closeAddTopicModal" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">新增主題</h5>
            <button type="button" class="btn-close" @click="closeAddTopicModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">主題名稱 <span class="text-danger">*</span></label>
              <input v-model="newTopicName"
                     type="text"
                     class="form-control"
                     :class="{'is-invalid': !!newTopicError}"
                     @input="validateNewTopic" />
              <div v-if="newTopicError" class="invalid-feedback">{{ newTopicError }}</div>
            </div>
            <div class="mb-3">
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
/* 保留必要的自定義樣式，其餘使用 Bootstrap 工具類 */
.keyword-setting-page {
  background: #f8fafc;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-bottom: 1px solid #e2e8f0;
}

/* 自定義按鈕 hover 效果 */
.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
}

/* 拖拽手柄樣式 */
.drag-handle {
  transition: all 0.2s ease;
}

.drag-handle:hover:not(.text-muted) {
  background: #f3f4f6;
}

/* 關鍵詞建議列表的 hover 效果 */
.suggestion-item:hover {
  background: #f8fafc;
  color: #1976d2;
}

/* 成員標籤的移除按鈕 */
.btn-close-white:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

/* 顏色選擇器 hover 效果 */
.form-control-color:hover {
  border-color: #1976d2;
}

/* 刪除按鈕的 hover 效果 */
.btn-outline-danger:hover:not(:disabled) {
  background: #fecaca;
  border-color: #f87171;
  color: #dc2626;
}

/* 表格行的拖拽狀態 */
.table-info {
  background-color: #e3f2fd !important;
}

/* 響應式調整 */
@media (max-width: 768px) {
  .page-header {
    padding: 2rem 0;
  }

  .display-5 {
    font-size: 1.8rem;
  }

  .card-header .row {
    flex-direction: column;
    align-items: stretch !important;
    gap: 1rem;
  }

  .card-header .text-end {
    text-align: start !important;
  }

  .d-flex.gap-2 {
    flex-wrap: wrap;
  }
}

@media (max-width: 576px) {
  .table {
    font-size: 0.8rem;
  }

  .btn-sm {
    padding: 0.25rem 0.75rem;
    font-size: 0.85rem;
  }

  .input-group {
    flex-direction: column;
  }

  .input-group .btn {
    margin-top: 0.25rem;
  }
}

/* 確保 gap 工具類在較舊的瀏覽器中正常工作 */
.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}

/* 自定義 cursor pointer */
.cursor-pointer {
  cursor: pointer;
}
</style>
