<template>
  <div>
    <p>購物車內的商品：</p>
    <div v-if="cart.carts && cart.carts.length > 0">
      <ul v-for="item in cart.carts" :key="item.id">
        <div class="cart-item-details">
          <span class="item-title">{{ item.product.title }}</span>
          <span class="item-info">{{ item.qty }} / {{ item.product.unit }} * {{ item.product.price }} = {{ $filters.currency(item.final_total) }}</span>
        </div>
      </ul>
      <p class="cart-total">總共:{{ cart.total }}元</p>
    </div>
    <div v-else>目前沒有商品</div>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Object,
      default: () => ({ carts: [], total: 0 })
    }
  }
}
</script>
