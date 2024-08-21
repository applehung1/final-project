<template>
  <header>
      <nav class="navbar navbar-expand-lg navbar-white bg-white">
        <div class="logo">
          <router-link class="navbar-brand" to="/user/cart"><img src="../assets/images/zhuzh_logo.png" alt="post"></router-link>
        </div>
        <div>
          <ul>
            <li><router-link class="navbar-brand" to="/">首頁<br>Home</router-link></li>
            <li><router-link class="navbar-brand" to="/user">關於<br>About</router-link></li>
            <li><router-link class="navbar-brand" to="/user/list">購買花禮<br>Online Shop</router-link></li>
        </ul>
        </div>
        <div class="navbar-secondary">
            <router-link class="navbar-brand" to="/login"><i class="bi bi-person-fill"></i></router-link>
            <router-link class="navbar-brand" to="/user/favorite"><i class="bi bi-bookmark-heart-fill"></i></router-link>
            <router-link class="navbar-brand" to="/user/cart" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"><i class="bi bi-handbag"></i></router-link>
        </div>
        <!-- 購物車內容 -->
        <div v-if="showCart" class="cart-content" @mouseenter="showCart = true" @mouseleave="showCart = false">
          <CartDisplay :cart="cart" />
        </div>
      </nav>
  </header>
  <div class="post">
    <img src="../assets/images/post.jpg" alt="post">
  </div>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view  @cart-updated="updateCartCount"/>
  </div>
  <router-link to="/user/cart">
    <div class="floating-cart">
      <i class="bi bi-cart3"></i>
      <!-- 顯示購物車內商品數量 -->
        <div v-if="cartItemCount > 0" class="cart-item-count">{{ cartItemCount }}</div>
    </div>
  </router-link>
  <div v-if="showScrollTop" class="scroll-to-top" @click="scrollToTop">
      <i class="bi bi-arrow-up"></i>
  </div>
  <UserFooter></UserFooter>
</template>
<style>
/* *{outline: 1px solid #000;} */
.logo img {
  width: 100px;
}
.navbar {
    display: flex;
    justify-content: space-between; /* 讓 ul 置中 */
}
.navbar ul {
    display: flex;
    list-style-type: none;
}
.navbar li,.navbar-secondary {
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
.post img {
  width: 100%; /* 將圖片寬度設為100%，適應父容器 */
  height: auto; /* 自動調整高度以保持圖片比例 */
}
.floating-cart {
  position: fixed;
  bottom: 60px; /* 距離畫面底部20px */
  right: 20px; /* 距離畫面右側20px */
  background-color: #DCC1B0; /* 背景 */
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
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 15px;
  background-color: #949494;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 0.7;
  transition: opacity 0.3s;
}

.scroll-to-top:hover {
  opacity: 1;
}
</style>
<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import cartMixin from '@/mixins/cartMixin'
import CartDisplay from '@/components/CartDisplay.vue'
import UserFooter from '@/components/UserFooter.vue'
export default {
  data () {
    return {
      cart: {},
      cartItemCount: 0, // 保存購物車內商品數量
      showCart: false, // 控制購物車內容顯示的狀態變數,
      status: {
        loadingItem: ''
      },
      showScrollTop: false // 控制箭頭圖標的顯示與隱藏
    }
  },
  mixins: [cartMixin],
  components: {
    ToastMessages,
    CartDisplay,
    UserFooter
  },
  methods: {
    handleMouseEnter () {
      // this.getCart() // 更新購物車內容
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
      this.cart = cart
      this.cartItemCount = cart.carts.reduce((total, item) => total + item.qty, 0)
      console.log('updateCartCount:', this.cartItemCount)
    },
    handleScroll () {
      // 當滾動高度超過300px時顯示箭頭
      this.showScrollTop = window.scrollY > 200
    },
    scrollToTop () {
      // 平滑滾動回頂部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    this.getCart()
  },
  mounted () {
    // 監聽滾動事件
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount () {
    // 移除滾動事件監聽
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
