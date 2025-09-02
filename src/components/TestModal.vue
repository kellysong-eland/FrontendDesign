<template>
  <div class="container-fluid p-0" style="background-color: #EDF2F9; min-height: 100vh;">
    <!-- Header -->
    <!-- <header class="bg-white border-bottom p-3">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-auto">
            <button class="btn p-1">
              <span class="material-symbols-outlined">menu</span>
            </button>
          </div>
          <div class="col-auto">
            <img src="/img/logo-799985.png" alt="OpView Logo" style="height: 27.9px; width: 93px;" />
          </div>
          <div class="col">
          </div>
          <div class="col-auto">
            <div class="bg-white border rounded p-2 d-inline-flex align-items-center" style="width: 400px; height: 40px;">
              <span class="badge bg-primary rounded px-2 py-1" style="font-size: 11px;">公告</span>
              <span class="ms-2" style="font-size: 14px;">這是公告這是公告</span>
              <span class="material-symbols-outlined ms-auto">read_more</span>
            </div>
          </div>
          <div class="col-auto">
            <span class="material-symbols-outlined" style="color: #737272; font-size: 32px;">person</span>
          </div>
        </div>
      </div>
    </header> -->

    <!-- Sidebar -->
    <!-- <aside class="position-fixed bg-white border" style="top: 69px; left: 16px; width: 230px; height: calc(100vh - 69px); z-index: 1000;">
      <nav class="p-3">
        <div class="mb-3">
          <div class="d-flex align-items-center mb-2">
            <span class="material-symbols-outlined me-2">home</span>
            <span>首頁</span>
          </div>
        </div>
        
        <div class="bg-light rounded p-2 mb-2" style="background-color: #f8f9fa !important;">
          <div class="d-flex align-items-center">
            <span class="material-symbols-outlined me-2">translate</span>
            <span class="fw-bold">關鍵字設定</span>
          </div>
        </div>
 
        <div class="mb-2">
          <div class="d-flex align-items-center">
            <span class="material-symbols-outlined me-2">label</span>
            <span>標籤管理</span>
          </div>
        </div>
      </nav>
    </aside> -->

    <!-- Main Content -->
    <main style="">
      <!-- Blue Header Section -->
      <div class="bg-main text-white rounded-bottom" style="padding: 20px; margin-bottom: 20px;">
        <div class="container-fluid">
          <!-- Breadcrumb -->
          <nav aria-label="breadcrumb" class="mb-3">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <span class="material-symbols-outlined me-1" style="font-size: 18px;">home</span>
                <span>首頁</span>
              </li>
              <li class="breadcrumb-item">設定</li>
              <li class="breadcrumb-item active">關鍵字設定</li>
            </ol>
          </nav>

          <!-- Title and Description -->
          <h1 class="h3 mb-2 text-white">關鍵字設定</h1>
          <p class="mb-0" style="font-size: 15px;">提供管理者進行關鍵字相關設定，以精準查詢口碑資料。</p>
        </div>
      </div>

      <!-- Content Section -->
      <div class="container-fluid">
        <!-- Header with actions -->
        <div class="bg-header-section p-3 mb-0">
          <div class="row align-items-center">
            <div class="col">
              <div class="d-flex align-items-center">
                <span class="material-symbols-outlined me-2" style="font-size: 24px;">translate</span>
                <h2 class="h5 mb-0">關鍵字設定</h2>
              </div>
              <small class="text-muted">(主題數使用量：當前使用者3/admin3/總上限10)</small>
            </div>
            <div class="col-auto">
              <div class="d-flex gap-2">
                <button 
                  class="btn btn-custom"
                  @click="showModal = true"
                >
                  <span class="material-symbols-outlined" style="font-size: 18px;">note_add</span>
                  新增
                </button>
                <button class="btn btn-custom">
                  <span class="material-symbols-outlined" style="font-size: 18px;">open_in_full</span>
                  移動
                </button>
                <button class="btn btn-custom">
                  <span class="material-symbols-outlined" style="font-size: 18px;">edit_note</span>
                  編輯
                </button>
                <button class="btn btn-custom">
                  <span class="material-symbols-outlined" style="font-size: 18px;">history</span>
                  變更紀錄
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="table-container">
          <table class="table table-bordered mb-0">
            <thead class="table-light">
              <tr>
                <th style="width: 300px;">主題名稱</th>
                <th style="width: 70px;">顏色</th>
                <th>關鍵詞組</th>
                <th style="width: 280px;">可觀看成員</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>123</td>
                <td>
                  <div class="color-swatch" style="background-color: #449CD1;"></div>
                </td>
                <td>關鍵詞組</td>
                <td>
                  <select class="form-select dropdown-custom">
                    <option>admin</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>456</td>
                <td>
                  <div class="color-swatch" style="background-color: #FCCA6C;"></div>
                </td>
                <td>關鍵詞組</td>
                <td>
                  <select class="form-select dropdown-custom">
                    <option>admin</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>789</td>
                <td>
                  <div class="color-swatch" style="background-color: #FFA3EE;"></div>
                </td>
                <td>關鍵詞組</td>
                <td>
                  <select class="form-select dropdown-custom">
                    <option>admin</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>123456789</td>
                <td>
                  <div class="color-swatch" style="background-color: #449CD1;"></div>
                </td>
                <td>關鍵詞組</td>
                <td>
                  <select class="form-select dropdown-custom">
                    <option>admin</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Add Topic Modal -->
    <AddTopicModal
      v-if="showModal"
      :members="testMembers"
      @close="showModal = false"
      @save="handleSave"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AddTopicModal from './AddTopicModal.vue'

interface SaveData {
  title: string;
  type: string;
  members: string[];
}

export default defineComponent({
  name: 'TestModal',
  components: {
    AddTopicModal
  },
  setup() {
    const showModal = ref(false);
    const testMembers = ref(['admin', 'editor', 'viewer']);

    const handleSave = (data: SaveData) => {
      console.log('保存的主題資料:', data);
    };

    return {
      showModal,
      testMembers,
      handleSave
    };
  }
})
</script>

<style scoped>
.test-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.test-controls {
  margin-bottom: 2rem;
}

.show-modal-btn {
  background: #307DE6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.show-modal-btn:hover {
  background: #2461B7;
}
</style>
