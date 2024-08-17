<template>
  <div class="floating-cart">
    <i class="bi bi-cart3"></i>
    <!-- 顯示購物車內商品數量 -->
    <div v-if="cartItemCount > 0" class="cart-item-count">{{ cartItemCount }}</div>
  </div>
</template>

<script>
export default {
  props: {
    cartItemCount: {
      type: Number,
      default: 0
    }
  }
}
</script>
