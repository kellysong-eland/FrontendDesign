<template>
  <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3 class="mb-3">{{ isEdit ? '編輯主題' : '新增主題' }}</h3>
        <button class="btn-close mb-3" @click="$emit('close')">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <!-- 主題名稱與顏色 -->
        <div class="form-group">
          <label class="form-label">主題名稱 <span class="required">*</span></label>
          <div class="name-color-group">
            <input
              type="text"
              class="form-control flex-grow-1"
              v-model="formData.name"
              placeholder="輸入主題名稱"
              maxlength="20"
              required
              @click.stop>
            <input
              type="color"
              class="color-picker"
              v-model="formData.color"
              @click.stop>
          </div>
          <div class="char-count">{{ formData.name.length }}/20</div>
        </div>

        <!-- AI設定與一般設定選項 -->
        <div class="form-group">
          <label class="form-label">設定方式</label>
          <div class="radio-group">
            <label class="radio-option">
              <input
                type="radio"
                name="settingType"
                value="ai"
                v-model="formData.settingType"
                @click.stop>
              <span class="radio-label">AI設定</span>
            </label>
            <label class="radio-option">
              <input
                type="radio"
                name="settingType"
                value="general"
                v-model="formData.settingType"
                @click.stop>
              <span class="radio-label">一般設定</span>
            </label>
          </div>
        </div>

        <!-- AI設定內容 -->
        <div v-if="formData.settingType === 'ai'" class="ai-settings">
          <!-- 情境說明 -->
          <div class="form-group">
            <label class="form-label">情境說明</label>
            <textarea
              class="form-control"
              v-model="formData.scenario"
              placeholder="請描述主題相關的情境說明"
              maxlength="500"
              rows="3"
              @click.stop></textarea>
            <div class="char-count">{{ (formData.scenario || '').length }}/500</div>
          </div>

          <!-- AI生成按鈕 -->
          <div class="form-group">
            <button
              type="button"
              class="btn btn-ai"
              @click="generateKeywords"
              :disabled="isGenerating || !(formData.scenario || '').trim()">
              <span v-if="isGenerating" class="spinner"></span>
              <span class="material-symbols-outlined" v-if="!isGenerating">auto_awesome</span>
              {{ isGenerating ? 'AI 生成中...' : 'AI 生成關鍵字' }}
            </button>
          </div>

          <!-- 生成的關鍵字 -->
          <div v-if="formData.generatedKeywords" class="form-group">
            <label class="form-label">生成的關鍵字</label>
            <div class="generated-content">
              <div class="keyword-display">
                {{ formData.generatedKeywords }}
              </div>
              <div class="keyword-stats">
                字數: {{ formData.generatedKeywords.length }} | 詞數: {{ formData.generatedKeywords.split(/\s+/).length }}
              </div>
            </div>
          </div>

          <!-- 關鍵字說明 -->
          <div v-if="formData.keywordDesc" class="form-group">
            <label class="form-label">關鍵字說明</label>
            <div class="desc-display">
              {{ formData.keywordDesc }}
            </div>
          </div>
        </div>

        <!-- 一般設定內容 -->
        <div v-if="formData.settingType === 'general'" class="manual-settings">
          <div class="form-group">
            <label class="form-label">關鍵字 <span class="required">*</span></label>
            <textarea
              class="form-control"
              v-model="formData.keywords"
              placeholder="請輸入關鍵字，支援特殊字元: & | ? * ( ) { -100,100 } {/n,0,100}"
              rows="4"
              required
              @click.stop></textarea>
            <div class="keyword-stats">
              字數: {{ (formData.keywords || '').length }} | 詞數: {{ (formData.keywords || '').split(/\s+/).filter(w => w).length }}
            </div>
          </div>
        </div>

        <!-- 可觀看成員 -->
        <div class="form-group">
          <label class="form-label">可觀看成員</label>
          <div class="select-wrapper">
            <select
              class="form-control"
              v-model="formData.viewableMember"
              @click.stop>
              <option value="admin">admin</option>
              <option value="all">所有成員</option>
              <option value="limited">限定成員</option>
            </select>
            <span class="select-arrow material-symbols-outlined">expand_more</span>
          </div>
          <div class="selected-info">目前選擇: {{ formData.viewableMember }}</div>
        </div>

        <!-- 表單按鈕 -->
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">
            取消
          </button>
          <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
            {{ isEdit ? '更新' : '新增' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
import type { Topic } from '@/composables/useTopics'

interface Props {
  visible: boolean
  isEdit?: boolean
  editData?: Topic
  existingTopics: Topic[]
  membersList?: Array<{ id: number; name: string; email: string }>
}

interface Emits {
  close: []
  save: [topic: Topic]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isGenerating = ref(false)

const formData = reactive({
  name: '',
  color: '#3B82F6',
  settingType: 'ai' as 'ai' | 'general',
  scenario: '',
  keywords: '',
  generatedKeywords: '',
  keywordDesc: '',
  viewableMember: 'admin'
})

// 重置表單數據
const resetForm = () => {
  Object.assign(formData, {
    name: props.editData?.name || '',
    color: props.editData?.color || '#3B82F6',
    settingType: props.editData?.settingType || 'ai',
    scenario: props.editData?.scenario || '',
    keywords: props.editData?.keywords || '',
    generatedKeywords: '',
    keywordDesc: props.editData?.keywordDesc || '',
    viewableMember: props.editData?.viewableMember || 'admin'
  })
}

// 當modal打開時重置表單
const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}

// 表單驗證
const isFormValid = computed(() => {
  if (!formData.name.trim()) return false
  if (formData.settingType === 'general' && !formData.keywords.trim()) return false

  // 檢查名稱是否重複（編輯模式下排除自己）
  const duplicate = props.existingTopics.find(t =>
    t.name === formData.name.trim() &&
    (!props.isEdit || t.name !== props.editData?.name)
  )
  if (duplicate) return false

  return true
})

// AI生成關鍵字
const generateKeywords = async () => {
  if (!formData.scenario.trim() || isGenerating.value) return

  isGenerating.value = true

  try {
    // 模擬AI生成過程
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 模擬生成的關鍵字
    const keywords = `${formData.name} & (討論 | 評論 | 分析) & !廣告 & {sentiment:positive,0.7}`
    const description = `此關鍵字組合用於搜尋與「${formData.name}」相關的正面討論內容，排除廣告訊息，並包含討論、評論、分析等相關詞彙。`

    formData.generatedKeywords = keywords
    formData.keywordDesc = description
    formData.keywords = keywords
  } catch (error) {
    console.error('AI生成失敗:', error)
  } finally {
    isGenerating.value = false
  }
}

// 提交表單
const handleSubmit = () => {
  if (!isFormValid.value) return

  const topicData: Topic = {
    name: formData.name.trim(),
    color: formData.color,
    settingType: formData.settingType,
    scenario: formData.scenario,
    keywords: formData.settingType === 'ai' ? formData.generatedKeywords : formData.keywords,
    keywordDesc: formData.keywordDesc,
    viewableMember: formData.viewableMember,
    members: []
  }

  emit('save', topicData)
  resetForm()
}

// 監聽props變化來重置表單
// const resetFormData = () => {
//   if (props.visible) {
//     resetForm()
//   }
// }

// 當modal打開時重置表單
// const handleModalOpen = () => {
//   if (props.visible) {
//     resetForm()
//   }
// }
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(2px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 24px 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 24px;
}

.modal-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.btn-close {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 0 24px 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.required {
  color: #dc2626;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  resize: none;
}

.form-control:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.name-color-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.flex-grow-1 {
  flex: 1;
}

.color-picker {
  width: 60px;
  height: 48px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-picker:hover {
  border-color: #3b82f6;
}

.char-count {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 4px;
  text-align: right;
}

.radio-group {
  display: flex;
  gap: 20px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-option input[type="radio"] {
  margin: 0;
}

.radio-label {
  font-size: 0.9rem;
  color: #374151;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.btn-ai {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.btn-ai:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-ai:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff40;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.generated-content {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.keyword-display {
  font-family: 'Courier New', monospace;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.5;
}

.keyword-stats {
  font-size: 0.8rem;
  color: #6b7280;
}

.desc-display {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  color: #4b5563;
  line-height: 1.5;
  font-size: 0.9rem;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  appearance: none;
  padding-right: 40px;
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
}

.selected-info {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

/* 滾動條樣式 */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
