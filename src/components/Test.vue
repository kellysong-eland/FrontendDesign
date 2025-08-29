<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// 商品介面定義
interface Product {
  id: number
  name: string
  price: number
}

// 購物車項目介面定義
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

// 商品清單
const products = ref<Product[]>([
  { id: 1, name: 'iPhone 15', price: 29900 },
  { id: 2, name: 'MacBook Air', price: 34900 },
  { id: 3, name: 'iPad Pro', price: 25900 },
  { id: 4, name: 'Apple Watch', price: 12900 },
  { id: 5, name: 'AirPods Pro', price: 7490 },
  { id: 6, name: 'Magic Keyboard', price: 4290 }
])

// 購物車
const cart = reactive<CartItem[]>([])

// 將商品加入購物車
const addToCart = (product: Product) => {
  const existingItem = cart.find(item => item.id === product.id)

  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    })
  }
}

// 增加商品數量
const increaseQuantity = (id: number) => {
  const item = cart.find(item => item.id === id)
  if (item) {
    item.quantity++
  }
}

// 減少商品數量
const decreaseQuantity = (id: number) => {
  const item = cart.find(item => item.id === id)
  if (item && item.quantity > 1) {
    item.quantity--
  }
}

// 移除商品
const removeFromCart = (id: number) => {
  const index = cart.findIndex(item => item.id === id)
  if (index !== -1) {
    cart.splice(index, 1)
  }
}

// 計算小計
const getSubtotal = (item: CartItem) => {
  return item.price * item.quantity
}

// 計算總金額
const totalAmount = computed(() => {
  return cart.reduce((total, item) => total + getSubtotal(item), 0)
})

// 購物車商品總數量
const totalItems = computed(() => {
  return cart.reduce((total, item) => total + item.quantity, 0)
})
</script>

<template>
  <div class="container-fluid py-4">
    <h3 class="mb-4">購物車系統</h3>

    <div class="row">
      <!-- 商品清單 - 左側 col-9 -->
      <div class="col-9">
        <h5 class="mb-3">商品清單</h5>
        <div class="row">
          <div class="col-md-6 col-lg-4 mb-3" v-for="product in products" :key="product.id">
            <div class="card h-100">
              <!-- 商品圖片區域 -->
              <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                <div class="text-center text-muted">
                  <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093L6.002 10.5l-2.245-2.247a.5.5 0 0 0-.783.097L1.002 9.85V3a1 1 0 0 1 1-1h12z"/>
                  </svg>
                  <div class="mt-2 small">商品圖片</div>
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text text-primary fw-bold fs-5">NT$ {{ product.price.toLocaleString() }}</p>
                <button
                  class="btn btn-primary mt-auto"
                  @click="addToCart(product)"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 購物車 - 右側 col-3 固定側邊欄 -->
      <div class="col-3">
        <div class="position-sticky" style="top: 20px;">
          <div class="card bg-white">
            <div class="card-header">
              <h5 class="card-title mb-0">購物車</h5>
              <span class="badge bg-primary">{{ totalItems }} 件</span>
            </div>

            <div class="card-body" style="max-height: 500px; overflow-y: auto;">
              <div v-if="cart.length === 0" class="text-center text-muted py-4">
                購物車是空的
              </div>

              <div v-else>
                <div class="table-responsive">
                  <table class="table table-sm">
                    <thead class="table-light">
                      <tr>
                        <th>商品</th>
                        <th class="text-center">數量</th>
                        <th>單價</th>
                        <th>小計</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in cart" :key="item.id">
                        <td>
                          <small class="fw-semibold">{{ item.name }}</small>
                        </td>
                        <td class="text-center">
                          <div class="btn-group btn-group-sm" role="group">
                            <button
                              class="btn btn-outline-secondary"
                              @click="decreaseQuantity(item.id)"
                              :disabled="item.quantity <= 1"
                            >
                              -
                            </button>
                            <span class="btn btn-outline-secondary">{{ item.quantity }}</span>
                            <button
                              class="btn btn-outline-secondary"
                              @click="increaseQuantity(item.id)"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <small>{{ item.price.toLocaleString() }}</small>
                        </td>
                        <td>
                          <small class="fw-bold text-primary">{{ getSubtotal(item).toLocaleString() }}</small>
                        </td>
                        <td>
                          <button
                            class="btn btn-danger btn-sm"
                            @click="removeFromCart(item.id)"
                            title="刪除"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- 總金額底部 -->
            <div class="card-footer bg-light" v-if="cart.length > 0">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="fw-bold fs-5">總計:</span>
                <span class="fw-bold fs-4 text-primary">NT$ {{ totalAmount.toLocaleString() }}</span>
              </div>
              <button class="btn btn-success w-100">
                結帳
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-title {
  color: #333;
}

.btn-group .btn:disabled {
  background-color: #f8f9fa;
  border-color: #dee2e6;
  color: #6c757d;
}

.badge {
  font-size: 0.75em;
}

.table th, .table td {
  vertical-align: middle;
}

.table-responsive {
  max-height: 400px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .container-fluid {
    padding-left: 15px;
    padding-right: 15px;
  }

  .card-body .btn-group {
    width: auto;
  }
}
</style>
