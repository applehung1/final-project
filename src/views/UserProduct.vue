<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row">
      <!-- Breadcrumb 和標題部分 -->
      <div class="col-8 container-top">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/user/cart"
              style="text-decoration: none; color: inherit; font-weight: normal;">購物車</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row justify-content-center">
      <article class="col-5">
        <div class="text-center product-image-container">
          <img :src="product.imageUrl" alt="" class="img-fluid mb-3 product-image" id="image_id">
        </div>
      </article>
      <div class="col-3 product-description-container">
        <h3>{{ product.title }}</h3>
        <br>
        <div class="productDescription">{{ product.description }}</div>
        <hr style="width: 100%;">
        <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
        <del class="h6" v-if="product.price">$ {{ product.origin_price }} </del>
        <div class="h5" v-if="product.price">$ {{ product.price }} </div>
        <hr style="width: 100%;">
        <label for="price" class="form-label">購買數量</label>
        <div class="quantity-wrapper">
            <button class="btn btn-outline-secondary" @click="decrement">-</button>
            <input
              type="text"
              class="form-control"
              id="unit"
              v-model.number="product.qty"
              placeholder="請輸入數量"
              @input="validateQuantity"
            />
            <button class="btn btn-outline-secondary" @click="increment">+</button>
        </div>
        <hr style="width: 100%;">
        <button type="button" class="btn btn-outline-danger"
                @click="addToCart(product.id, product.qty)">
        <div v-if="status.loadingItem === product.id" class="spinner-grow spinner-grow-sm text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
          加入購物車
        </button>
        <button type="button" class="btn btn-outline-danger"
                @click="addFavorite(product.id)">
                <i class="bi bi-suit-heart-fill"></i> 加入收藏
        </button>
      </div>
    </div>
    <div class="center-content col-8 mx-auto">
      <p style="color: #b78989;">商品特色</p>
      <hr>
      <div style="white-space: pre-wrap; text-align: left">{{ product.content }}</div>
    </div>
  </div>
  <div class='seperator'></div>
  <h2>您可能還會喜歡...</h2>
  <hr>
  <div class="container">
    <!-- 商品列表 -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="item in graduateProducts" :key="item.id">
        <div class="product-container">
            <div class="product-image-grid" :key="item.id"
                :style="{backgroundImage: `url(${item.imageUrl})`}"
                @click="navigateToProduct(item.id)"
            >
            </div>
          <div class="title-cart">
            <p @click="navigateToProduct(item.id)">{{ item.title }}</p>
            <div class="actions">
              <button type="button" class="btn"
                  :disabled="this.status.loadingItem === item.id"
                  @click="addCart(item.id)">
                <div v-if="this.status.loadingItem === item.id" class="spinner-grow spinner-grow-sm text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                    <i class="bi bi-cart-fill"></i>
              </button>
              <i
                :class="favoriteItems.includes(item.id) ? 'bi bi-suit-heart-fill' : 'bi bi-suit-heart'"
                @click="addFavoriteButtom(item.id)"
              ></i>
            </div>
          </div>
          <p style="color: #CE0000;">${{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartMixin from '@/mixins/cartMixin'

export default {
  data () {
    return {
      product: {
        qty: 1
      },
      id: '',
      isLoading: false,
      status: {
        loadingItem: ''
      },
      favorite: '',
      products: [],
      favoriteItems: [] // 用於存儲已加入最愛的商品 ID
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        console.log(response.data)
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
          // 確保 qty 被設置為正確的數值
          if (!this.product.qty || this.product.qty < 1) {
            this.product.qty = 1
          }
        }
      })
    },
    addToCart (id, qty) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: qty
      }
      this.isLoading = true
      this.$http.post(url, { data: cart })
        .then((response) => {
          this.isLoading = false
          this.status.loadingItem = ''
          this.$httpMessageState(response, '加入購物車')
          return this.getCart() // 確保返回的 Promise 是 this.getCart()
        })
        .then((response) => {
          this.$emit('cart-updated', this.cart) // 發射事件通知父組件
          console.log('觸發updateCart', this.cartItemCount)
        })
    },
    addFavorite (id) {
      const favorites = JSON.parse(localStorage.getItem('favoriteItems')) || []
      if (!favorites.includes(id)) {
        favorites.push(id)
        localStorage.setItem('favoriteItems', JSON.stringify(favorites))
      }
      console.log('favorite emit:', id)
    },
    increment () {
      this.product.qty += 1
    },
    decrement () {
      if (this.product.qty > 1) {
        this.product.qty -= 1
      }
    },
    validateQuantity () {
      if (isNaN(this.product.qty) || this.product.qty < 1) {
        this.product.qty = 1
      }
    },
    getProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url)
        .then((response) => {
          this.products = response.data.products
          console.log('products:', response)
          this.isLoading = false
        })
    },
    navigateToProduct (id) {
      this.$router.push(`/user/product/${id}`).then(() => {
        window.location.reload()
        // 頁面重新整理
      })
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
    addFavoriteButtom (id) {
      const favorites = JSON.parse(localStorage.getItem('favoriteItems')) || []
      if (!favorites.includes(id)) {
        favorites.push(id)
        localStorage.setItem('favoriteItems', JSON.stringify(favorites))
        this.favoriteItems = favorites // 更新狀態
      } else {
        // 如果已存在則從清單中移除
        const index = favorites.indexOf(id)
        if (index > -1) {
          favorites.splice(index, 1)
          localStorage.setItem('favoriteItems', JSON.stringify(favorites))
          this.favoriteItems = favorites // 更新狀態
        }
      }
      console.log('favorite emit:', id)
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
    this.getProducts()
  },
  mixins: [cartMixin],
  computed: {
    graduateProducts () {
      return this.products.filter(otherProduct => {
        return otherProduct.category === this.product.category
      }).slice(0, 3)
    }
  }
}
</script>

<style>
/* *{outline: solid 1px #000;} */
.container-top {
  margin-left:220px;
}
.text-center {
  text-align: center;
}
#image_id {
  height: 500px;
  width: auto;
}
.product-image-container {
  padding-right: 40px; /* 調整圖片右側距離 */
}
.product-description-container {
  padding-left: 50px; /* 調整段落左側距離 */
}
.product-description-container h3 {
  color: #b78989;
}
.productDescription {
  white-space: pre-wrap; /* 保留空格和換行符，自動換行 */
  color: #5c4838c9;
}
.quantity-wrapper {
  display: flex;
  align-items: center;
}

.quantity-wrapper .form-control {
  width: 150px;
  text-align: center;
}

.quantity-wrapper .btn {
  flex: 0;
  border-radius: 0;
}

.quantity-wrapper .btn:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.quantity-wrapper .btn:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.container .bi {
  font-size:13px;
}
.btn-outline-danger {
  margin-right: 10px;
  background-color: #ffffff;
  color: #949494;
  border-color: #949494;
}
.btn-outline-danger:hover {
  background-color: #949494; /* 鼠標懸停時的背景顏色 */
  color: #ffffff; /* 鼠標懸停時的文字顏色 */
  border-color: #949494; /* 鼠標懸停時的邊框顏色 */
}

.center-content {
  text-align: center; /* 讓內部內容水平置中 */
}

</style>
