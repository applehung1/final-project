<template>
  <Loading :active="isLoading"></Loading>
  <!-- 購物車列表 -->
  <div class="col-md-7 mx-auto">
    <div class="top">
      <ul>
        <li><router-link to="/" class="cart-router">首頁</router-link></li>
        <li>/</li>
        <li>購物車</li>
      </ul>
    </div>
    <hr>
    <p>購物清單</p>
    <hr>
    <!-- 購物車列表 -->
    <div class="sticky-top">
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 110px">數量</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm"
                        :disabled="status.loadingItem === item.id"
                        @click="removeCartItem(item.id)">
                  <i class="bi bi-x"></i>
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input type="number" class="form-control"
                        min="1"
                        :disabled="item.id === status.loadingItem"
                        @change="updateCart(item)"
                        v-model.number="item.qty">
                  <div class="input-group-text">/ {{ item.product.unit }}</div>
                </div>
              </td>
              <td class="text-end">
                <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                {{ $filters.currency(item.final_total) }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ $filters.currency(cart.total) }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
            套用優惠碼
          </button>
        </div>
      </div>
    </div>
    <div class="text-center mt-3">
      <button class="btn btn-outline-secondary mx-2" type="button">
        <router-link class="navbar-brand" to="/user/list">繼續購物</router-link>
      </button>
      <button class="btn btn-outline-secondary mx-2" type="button">
        <router-link class="navbar-brand" to="/user/checkinfo">前往結帳</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import cartMixin from '@/mixins/cartMixin'

export default {
  emits: ['cart-updated'], // 在此處聲明自定義事件
  data () {
    return {
      coupon_code: ''
    }
  },
  methods: {
    addCouponCode () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }
      this.$http.post(url, { data: coupon })
        .then((res) => {
          this.$httpMessageState(res, '加入優惠券')
          console.log(res)
          this.getCart()
        })
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart })
        .then((response) => {
          console.log(response)
          this.status.loadingItem = ''
          return this.getCart() // 確保返回的 Promise 是 this.getCart() 的
        })
        .then((response) => {
          this.$emit('cart-updated', this.cart) // 發射事件通知父組件
          console.log('觸發updateCart', this.cartItemCount)
        })
    },
    removeCartItem (id) {
      console.log('移除此項')
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(url)
        .then((res) => {
          this.status.loadingItem = ''
          console.log(res)
          return this.getCart() // 確保返回的 Promise 是 this.getCart() 的
        })
        .then((res) => {
          this.$emit('cart-updated', this.cart) // 發射事件通知父組件
          console.log('觸發removeCartItem', this.cartItemCount)
        })
    }
  },
  mixins: [cartMixin]
}
</script>

<style>
.top ul{
  display: flex;
  justify-content: flex-end
}
.top ul li {
  list-style-type: none;
  margin-right: 7px;
}
.cart-router {
  text-decoration: none;
  color: inherit;
}
</style>
