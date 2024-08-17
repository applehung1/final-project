<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="container-inside">
      <aside id="sidebar" class="left-sidebar col-md-3">
        <h4 class="widget-title">購買花禮Online Shop</h4>
        <input type="text" class="form-control" name="name"
        placeholder="(請輸入商品名稱)"
        v-model="search">
        <div class="tab-content">
          <div class="widget">
            <div class="widget_categories">
              <ul>
                <li v-for="(item, index) in uniqueCategories" :key="index">
                  <a href="#" @click.prevent="filterByCategory(item)">
                    {{ item }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div class="col-sm-9 col-md-9">
        <header class="content-top clearfix">
          <h1 class="main-title">購買花禮Online Shop</h1>
          <ol class="breadcrumb list-inline">
            <li>首頁 /</li>
            <li>購買花禮Online Shop</li>
          </ol>
          <div class="sort-block">
            <div class="select-sort">
              <span>商品排序</span>
              <ul></ul>
            </div>
          </div>
        </header>
        <div class="product-grid">
          <!-- 修改 v-for 循環，使用 filteredProducts -->
          <div class="product-item" v-for="item in filteredProducts" :key="item.id">
            <div style="height: 100px; background-size: cover; background-position: center"
                 :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            <a href="#" class="text-dark">{{ item.title }}</a>
            <div class="price">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)">查看更多</button>
              <button type="button" class="btn btn-outline-danger"
              :disabled="this.status.loadingItem === item.id"
              @click="addCart(item.id)">
              <div v-if="this.status.loadingItem === item.id" class="spinner-grow spinner-grow-sm text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <i class="bi bi-cart-fill"></i>
              </button>
            </div>
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

.content-top {
  display: flex;
  justify-content: space-between;
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

.product-placeholder {
  flex: 1 1 calc(33.333% - 20px);
  visibility: hidden; /* 隐藏占位符元素，但占空間 */
}

.price {
  margin: 10px 0;
}

.btn-group-sm .btn {
  margin-right: 5px;
}
</style>

<script>
import cartMixin from '@/mixins/cartMixin'
export default {
  data () {
    return {
      products: [],
      product: {},
      search: '',
      selectedCategory: '全部',
      isLoading: false,
      cart: {},
      showCart: false, // 控制購物車內容顯示的狀態變數
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
    // 選擇分類
    filterByCategory (category) {
      this.selectedCategory = category
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
          console.log(res)
        })
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
