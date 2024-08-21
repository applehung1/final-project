<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="container-inside">
      <aside id="sidebar" class="left-sidebar col-md-3">
        <h4 class="widget-title">購買花禮Online Shop</h4>
        <div class='search-area'>
          <input type="text" class="form-control" name="name"
        placeholder="(請輸入商品名稱)"
        v-model="searchQuery">
          <i class="bi bi-search search-icon" @click="performSearch"></i> <!-- 新增搜尋按鈕 -->
        </div>
        <div class="tab-content">
          <div class="widget">
            <div class="widget_categories">
              <ul>
                <li v-for="(item, index) in uniqueCategories" :key="index"
                :class="{ active: item === activeCategory }">
                  <a href="#" @click.prevent="filterByCategory(item)">
                    {{ item }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div class="col-md-9">
        <header class="content-top clearfix">
          <h1 class="main-title">購買花禮Online Shop</h1>
          <div class="content-top-right">
            <div class="sort-block">
              <label for="sortOrder">排序方式：</label>
                <select id="sortOrder" class="form-select" v-model="selectedSortOrder" @change="sortProducts">
                  <option value="" disabled>請選擇排序方式</option>
                  <option value="priceAsc">價格由低到高</option>
                  <option value="priceDesc">價格由高到低</option>
                </select>
            </div>
            <ul class="breadcrumb">
              <li>首頁</li>
              <li>/</li>
              <li>購買花禮Online Shop</li>
            </ul>
          </div>
        </header>
        <div class="product-grid">
          <!-- 修改 v-for 循環，使用 filteredProducts -->
          <div class="product-item" v-for="item in filteredProducts" :key="item.id">
            <div class="product-item-list">
              <div style="height: 180px; background-size: cover; background-position: center"
                   :style="{backgroundImage: `url(${item.imageUrl})`}"
                   @click="getProduct(item.id)"></div>
                   <div class="title-cart">
                        <p @click="getProduct(item.id)">{{ item.title }}</p>
                        <button type="button" class="btn"
                            :disabled="this.status.loadingItem === item.id"
                            @click="addCart(item.id)">
                        <div v-if="this.status.loadingItem === item.id" class="spinner-grow spinner-grow-sm text-danger" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                            <i class="bi bi-cart-fill"></i>
                        </button>
                   </div>
            </div>
              <div class="price">
                <div class="h5" v-if="!item.price">{{ item.origin_price }} </div>
                <del class="h6" v-if="item.price">$ {{ item.origin_price }} </del>
                <div class="h7" v-if="item.price">$ {{ item.price }} </div>
              </div>
<!--
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)">查看更多</button>
            </div>
             -->
          </div>
          <!-- 動態添加占位符 -->
          <div
            v-for="n in (3 - (filteredProducts.length % 3))"
            :key="`placeholder-${n}`"
            class="product-placeholder"
          ></div>
        </div>
      </div>
    </div>
      <!-- 購物車列表 -->
      <!-- form -->
      <div class="my-5 row justify-content-center">
      </div>
  </div>
</template>

<style>
/* *{outline: 1px solid #000;} */
.container-inside {
  display: flex;
}
.search-area {
  margin-left: 32px;
  position: relative; /* 讓子元素相對於父元素定位 */
  display: flex;
}

.search-area input {
  padding-right: 30px; /* 為輸入框添加內邊距，避免文字與圖示重疊 */
  border-radius: 0;
  width: 278px;
  height: 45px;
}
.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%); /* 讓圖示垂直居中 */
  cursor: pointer;
}

.content-top {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
.content-top-right {
  display: flex;
  right: 0px;
  margin-left: auto; /* 推到右邊 */
  color: #555555;
}

.widget-title {
  border-bottom: 0.5px solid #ddd;
  padding: 20px 0px 20px 0px;
}

.widget_categories ul li {
  list-style-type: none;
  font-weight: 600;
  border: 1px solid #ddd; /* 添加一個淺灰色的邊線 */
  padding: 3px; /* 增加內部填充，使邊線不緊貼內容 */
  margin: 13px;
  margin-left: 0px;
  text-align: left;
}
.widget_categories ul li a {
  text-decoration: none; /* 去除 a 標籤的下劃線 */
  font-size: 15px;
  display: block;
  padding: 7px 10px 7px 25px;
  line-height: 24px;
  color: #777;
}
.widget_categories ul li.active a {
  font-weight: bold; /* 加粗字體 */
  background-color: #e6e6e6; /* 添加背景色 */
  border-color: #000; /* 改變邊框顏色 */
}

.main-title {
  font-size: 18px;
  color: #555555;
}
.breadcrumb li{
  margin-left: 5px;
}
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 控制商品間的間距 */
}

.product-item {
  flex: 1 1 calc(33.333% - 20px); /* 使每個商品占三分之一的寬度 */
  box-sizing: border-box;
  padding: 10px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.product-item-list {
  cursor: pointer;
}
.title-cart {
  display: flex;
  justify-content: space-between;
}
.title-cart .btn {
  color: #777;
  border: none; /* 移除邊框 */
  box-shadow: none; /* 移除按鈕的陰影，避免點擊後有陰影效果 */
  outline: none; /* 避免點擊後有外框 */
}
.title-cart .btn:hover {
  color: #eb9a7adc; /* 滑鼠懸停時的顏色變化 */
}
.title-cart .btn:focus {
  outline: none; /* 移除點擊後的外框 */
  box-shadow: none; /* 移除點擊後的陰影 */
}
.title-cart .btn i {
  font-size: 16px;
}
.product-item p {
  padding-top: 15px;
  font-size: 15px;
}
.product-item p:hover {
  color: #636161d5;
  padding-top: 15px;
}

.product-placeholder {
  flex: 1 1 calc(33.333% - 20px);
  visibility: hidden; /* 隐藏占位符元素，但占空間 */
}

.price {
  margin: 10px 0;
  display: flex;
}

.btn-group-sm .btn {
  margin-right: 5px;
}
.h5, .h6, .h7 {
  font-size: 16px;
}

.h7 {
  color: #CE0000;
}

</style>

<script>
import cartMixin from '@/mixins/cartMixin'

export default {
  emits: ['cart-updated'], // 在此處聲明自定義事件
  data () {
    return {
      products: [],
      product: {},
      searchQuery: '', // 用來儲存輸入框的搜尋字串
      search: '',
      selectedCategory: '全部',
      activeCategory: '全部', // 新增此變數來追蹤當前被點選的分類
      isLoading: false,
      cart: {},
      showCart: false, // 控制購物車內容顯示的狀態變數
      selectedSortOrder: '', // 預設排序方式
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    getProducts (page = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url)
        .then((response) => {
          this.products = response.data.products
          console.log('products:', response)
          this.isLoading = false
        })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    performSearch () {
      this.search = this.searchQuery // 更新搜尋字串，觸發 filteredProducts 的重新計算
    },
    // 選擇分類
    filterByCategory (category) {
      this.selectedCategory = category
      this.activeCategory = category // 設定當前被點選的分類
    },
    addCart (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.status.loadingItem = ''
          console.log('addcart-res', res)
          return this.getCart() // 確保返回的 Promise 是 this.getCart()
        })
        .then((res) => {
          this.$emit('cart-updated', this.cart) // 發射事件通知父組件
          console.log('觸發addCart', this.cartItemCount)
        })
    },
    sortProducts () {
      switch (this.selectedSortOrder) {
        case 'priceAsc':
          this.products.sort((a, b) => a.price - b.price)
          break
        case 'priceDesc':
          this.products.sort((a, b) => b.price - a.price)
          break
        default:
          break
      }
    }
  },
  created () {
    this.getProducts()
  },
  computed: {
    // 提取所有唯一的 category
    // Set 是 JavaScript 的一種數據結構，它只允許唯一值（即不能有重複的值）
    uniqueCategories () {
      const categories = this.products.map((product) => product.category)
      return ['全部', ...new Set(categories)]
    },
    // 過濾商品，顯示選中的分類
    filteredProducts () {
      return this.products.filter(product => {
        const matchesCategory = this.selectedCategory === '全部' || product.category === this.selectedCategory
        const matchesSearch = !this.search || product.title.toLowerCase().includes(this.search.toLowerCase())
        return matchesCategory && matchesSearch
      })
    }
  },
  mixins: [cartMixin]
}
</script>
