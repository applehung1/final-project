<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/cart">購物車</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
        <div>{{ product.content }}</div>
      </article>
      <div class="col-4">
        <h2>{{ product.title }}</h2>
        <div>{{ product.description }}</div>
        <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
        <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
        <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
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
        <hr>
        <button type="button" class="btn btn-outline-danger"
                @click="addToCart(product.id, product.qty)">
        <div v-if="status.loadingItem === product.id" class="spinner-grow spinner-grow-sm text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
          加入購物車
        </button>
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
      }
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
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  },
  mixins: [cartMixin]
}
</script>

<style>
.quantity-wrapper {
  display: flex;
  align-items: center;
}

.quantity-wrapper .form-control {
  width: 300px;
  text-align: center;
}

.quantity-wrapper .btn {
  flex: 0;
  border-radius: 0;
}

.quantity-wrapper .btn:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: ;
}0

.quantity-wrapper .btn:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
