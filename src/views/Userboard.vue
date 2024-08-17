<template>
  <header>
      <nav class="navbar navbar-expand-lg navbar-white bg-white">
        <div class="container-fluid">
        <router-link class="navbar-brand" to="/user/cart">Zhuzh</router-link>
        </div>
        <div class="menu">
            <ul>
                <li><router-link class="navbar-brand" to="/user">首頁<br>Home</router-link></li>
                <li><router-link class="navbar-brand" to="/user">關於<br>About</router-link></li>
                <li><router-link class="navbar-brand" to="/user/list">購買花禮<br>Online Shop</router-link></li>
            </ul>
            <div class="navbar-secondary">
                <router-link class="navbar-brand" to="/login"><i class="bi bi-person-fill"></i></router-link>
                <router-link class="navbar-brand" to="/user/cart" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"><i class="bi bi-handbag"></i></router-link>
            </div>
            <!-- 購物車內容 -->
            <div v-if="showCart" class="cart-content" @mouseenter="showCart = true" @mouseleave="showCart = false">
              <CartDisplay :cart="cart" />
            </div>
        </div>
    </nav>
  </header>
  <div class="post">
    <img src="../assets/images/post.jpg" alt="post">
  </div>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
  <router-link to="/user/cart">
    <div class="floating-cart" @cart-updated="updateCartCount">
      <i class="bi bi-cart3"></i>
      <!-- 顯示購物車內商品數量 -->
        <div v-if="cartItemCount > 0" class="cart-item-count">{{ cartItemCount }}</div>
    </div>
  </router-link>
</template>
<style>
.menu {
    display: flex;
}
.menu ul {
    display: flex;
    list-style-type: none;
}
.menu li,.navbar-secondary {
    margin: 10px 20px 0px 40px;
}
.navbar-brand {
    font-size: 15px !important;
    color:#7c7575;
}
.navbar-secondary {
  display: flex;
}
.bi {
  font-size: 20px
}
.cart-container {
  position: relative; /* 讓購物車內容相對於容器進行定位 */
}

.cart-icon {
  cursor: pointer; /* 鼠標移到圖示上顯示手型 */
}

.cart-content {
  position: absolute;
  top: 100%; /* 讓內容出現在圖示正下方 */
  right: 10px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding-bottom: 30px;
}
.cart-total {
  position: absolute;
  bottom: 10px; /* 離底部10px */
  right: 10px;  /* 離右邊10px */
  font-weight: bold;
}
.item-title {
  display: block; /* 確保標題在一行顯示 */
  font-weight: bold; /* 標題加粗 */
}

.item-info {
  display: block; /* 確保價格在另一行顯示 */
  color: #333; /* 調整顏色 */
}
.floating-cart {
  position: fixed;
  bottom: 20px; /* 距離畫面底部20px */
  right: 20px; /* 距離畫面右側20px */
  background-color: #DCC1B0; /* 藍色背景 */
  color: white; /* 白色字體 */
  width: 60px; /* 固定寬度，保持圓形 */
  height: 60px; /* 固定高度，保持圓形 */
  border-radius: 50%; /* 確保圓形 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加陰影 */
  cursor: pointer; /* 鼠標變成指標 */
  display: flex; /* 讓內容居中 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  overflow: hidden; /* 防止內容溢出 */
}
.floating-cart i {
  font-size: 24px; /* 調整圖標大小 */
}
.cart-item-count {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
</style>
<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import cartMixin from '@/mixins/cartMixin'
import CartDisplay from '@/components/CartDisplay.vue'
export default {
  data () {
    return {
      cart: {},
      cartItemCount: 0, // 保存購物車內商品數量
      showCart: false, // 控制購物車內容顯示的狀態變數,
      status: {
        loadingItem: ''
      }
    }
  },
  mixins: [cartMixin],
  components: {
    ToastMessages,
    CartDisplay
  },
  methods: {
    handleMouseEnter () {
      this.getCart() // 更新購物車內容
      setTimeout(() => {
        this.showCart = true // 延遲顯示購物車內容
      }, 300) // 300毫秒的延遲，可以根據需要調整
    },
    handleMouseLeave () {
      setTimeout(() => {
        this.showCart = false
      }, 500)
    },
    updateCartCount (cart) {
      this.cartItemCount = cart.carts.reduce((total, item) => total + item.qty, 0)
      console.log('updateCartCount:', this.cartItemCount)
    }
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    this.getCart()
  }
}
</script>
