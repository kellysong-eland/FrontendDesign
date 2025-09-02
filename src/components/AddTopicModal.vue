<template>
  <div class="modal" tabindex="-1" role="dialog" style="display: block">
    <div class="modal-backdrop" @click="closeModal"></div>
    <div class="modal-dialog" role="document">
      <div class="modal-content" @click.stop>
        <!-- 頂部標題欄 -->
        <div class="modal-header custom-header">
          <div class="d-flex align-items-center gap-2">
            <span class="material-symbols-outlined add-icon">post_add</span>
            <h5 class="modal-title m-0">新增主題</h5>
          </div>
          <span class="material-symbols-outlined close-icon" @click="closeModal">close</span>
        </div>

        <!-- Modal 主體內容 -->
        <div class="modal-body bg-light">
        <!-- 主題名稱和顏色選擇 -->
          <div class="row g-3 mb-3">
            <div class="col">
              <label class="form-label">主題名稱</label>
              <div class="position-relative">
                <input 
                  type="text"
                  class="form-control"
                  v-model="topicName"
                  placeholder="請輸入..."
                  maxlength="20"
                >
                <div class="form-text text-end">字數: {{ topicName.length }}/20</div>
              </div>
            </div>
            <div class="col-auto flex-column">
              <label class="form-label">顏色</label>
              <input type="color" class="form-control form-control-color mt-auto" v-model="topicColor">
            </div>
          </div>          
        <!-- 設定模式選擇 -->
          <div class="mb-3">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="settingMode" id="ai" value="ai" v-model="settingMode">
              <label class="form-check-label" for="ai">AI生成設定</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="settingMode" id="manual" value="manual" v-model="settingMode">
              <label class="form-check-label" for="manual">一般設定</label>
            </div>
          </div>          
          <!-- 情境說明區塊 -->
          <div class="mb-4">
            <label class="form-label">情境說明</label>
            <div class="position-relative">
              <textarea 
                class="form-control"
                v-model="description"
                placeholder="輸入觀測對象與面向，以生成關鍵字，如：手搖飲正面討論"
                maxlength="500"
                rows="3"
              ></textarea>
              <div class="form-text text-end">字數: {{ description.length }}/500</div>
              <div class="text-end mt-2">
                <button class="btn btn-outline-secondary btn-sm" v-if="settingMode === 'ai'">AI生成</button>
              </div>
            </div>
          </div>

        

          <!-- 可觀看成員 -->
          <div class="mb-3">
            <label class="form-label">可觀看成員</label>
            <div class="dropdown w-50">
              <button class="btn btn-outline-secondary dropdown-toggle w-100 d-flex justify-content-between align-items-center bg-white" 
                      type="button"
                      @click="toggleMemberDropdown">
                <span>{{ selectedMember }}</span>
                <!-- <span class="material-symbols-outlined">keyboard_arrow_down</span> -->
              </button>
              <ul class="dropdown-menu w-100" :class="{ show: showMemberDropdown }">
                <li v-for="member in members" :key="member">
                  <a class="dropdown-item" href="#" @click.prevent="selectMember(member)">{{ member }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Modal 底部按鈕 -->
        <div class="modal-footer">
          <button class="btn btn-primary d-flex align-items-center gap-1" @click="saveTopic">
            <span class="material-symbols-outlined">check</span>
            儲存
          </button>
          <button class="btn btn-outline-dark" @click="closeModal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface TopicData {
  settingMode: 'ai' | 'manual';
  description: string;
  name: string;
  color: string;
  member: string;
}

export default defineComponent({
  name: 'AddTopicModal',
  props: {
    members: {
      type: Array as () => string[],
      default: () => ['admin', 'editor', 'viewer']
    }
  },
  emits: ['close', 'save'],
  data() {
    return {
      settingMode: 'ai' as const,
      description: '',
      topicName: '',
      topicColor: '#449CD1',
      selectedMember: 'admin',
      showMemberDropdown: false
    }
  },
  methods: {
    closeModal(): void {
      this.$emit('close')
    },
    toggleMemberDropdown(): void {
      this.showMemberDropdown = !this.showMemberDropdown
    },
    selectMember(member: string): void {
      this.selectedMember = member
      this.showMemberDropdown = false
    },
    saveTopic(): void {
      const topicData: TopicData = {
        settingMode: this.settingMode,
        description: this.description,
        name: this.topicName,
        color: this.topicColor,
        member: this.selectedMember
      }
      this.$emit('save', topicData)
      this.closeModal()
    }
  }
})
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal-dialog {
  position: relative;
  width: 498px !important;
  margin: 1.75rem auto;
  z-index: 1050;
}

.custom-header {
  background: linear-gradient(130deg, rgba(73, 174, 225, 1) 11%, rgba(42, 74, 139, 1) 75%);
  color: #fff;
}

.add-icon,
.close-icon {
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}

.modal-title {
  font-size: 19px;
}

.form-control-color {
  width: 38px;
  height: 38px;
  padding: 3px;
}

/* Override Bootstrap radio button styles */
.form-check-input {
  width: 1.2em;
  height: 1.2em;
  margin-top: 0.2em;
  border-color: #307DE6;
  cursor: pointer;
}

.form-check-input:checked {
  background-color: #307DE6;
  border-color: #307DE6;
}

.form-check-input:focus {
  border-color: #307DE6;
  box-shadow: 0 0 0 0.25rem rgba(48, 125, 230, 0.25);
}

.form-check-label {
  font-size: 16px;
  color: #212529;
  cursor: pointer;
  user-select: none;
}

.btn-primary {
  --bs-btn-bg: #307DE6;
  --bs-btn-border-color: #307DE6;
  --bs-btn-hover-bg: #2461B7;
  --bs-btn-hover-border-color: #2461B7;
}

.bg-light {
  background-color: #EDF2F9 !important;
}

.form-text {
  font-size: 12px;
  color: #6C757D;
}

.dropdown-menu.show {
  display: block;
}
</style>
