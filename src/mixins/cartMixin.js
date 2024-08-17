export default {
  data () {
    return {
      cart: {},
      isLoading: false,
      cartItemCount: 0, // 用於存儲購物車商品數量
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    getCart () {
      return new Promise((resolve, reject) => {
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
        this.isLoading = true
        this.$http.get(url)
          .then((response) => {
            console.log(response)
            this.cart = response.data.data
            this.cartItemCount = this.cart.carts.reduce((total, item) => total + item.qty, 0)
            this.isLoading = false
            resolve(response) // 確保 Promise 被 resolved
          })
          .catch((error) => {
            this.isLoading = false
            reject(error) // 確保 Promise 被 rejected
          })
      })
    }
  },
  created () {
    this.getCart()
  }
}
