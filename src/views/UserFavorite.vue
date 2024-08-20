<template>
    <Loading :active="isLoading"></Loading>
    <!-- 收藏清單 -->
    <div class="col-md-10 mx-auto">
      <div v-if="filteredFavorites().length > 0">
        <hr>
        <p>收藏清單</p>
        <hr>
        <!-- 商品列表 -->
        <div class="row">
          <div class="col-md-4" v-for="item in filteredFavorites()" :key="item.id">
            <div class="product-card">
              <div class="product-image"
                   :style="{backgroundImage: `url(${item.imageUrl})`}"
                   @click="getProduct(item.id)">
              </div>
              <div class="product-info">
                <div class="product-info-list">
                  <p @click="getProduct(item.id)">{{ item.title }}</p>
                  <div class="price" @click="getProduct(item.id)">
                    <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                    <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                    <div class="h7" v-if="item.price">單價 {{ item.price }} 元</div>
                  </div>
                </div>
                <i class="bi bi-suit-heart-fill" @click="removeFromFavorites(item.id)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>目前沒有收藏清單</p>
      </div>
    </div>
  </template>

<script>

export default {
  data () {
    return {
      favoriteList: [],
      products: [], // 儲存所有產品
      isLoading: false
    }
  },
  methods: {
    loadFavorites () {
      // 從 localStorage 讀取收藏項目
      const savedFavorites = JSON.parse(localStorage.getItem('favoriteItems')) || []
      this.favoriteList = savedFavorites
      console.log('從 localStorage 加載收藏清單', this.favoriteList)
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
    filteredFavorites () {
      return this.products.filter(product => this.favoriteList.includes(product.id))
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    removeFromFavorites (id) {
      // 從 favoriteList 中移除指定項目
      this.favoriteList = this.favoriteList.filter(favId => favId !== id)
      // 更新 localStorage
      localStorage.setItem('favoriteItems', JSON.stringify(this.favoriteList))
      console.log('移除收藏清單', this.favoriteList)
    }
  },
  created () {
    this.loadFavorites()
    this.getProducts()
  }
}
</script>

<style>
.product_grid {
    cursor: pointer;
}
.product-card {
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 15px;
  text-align: left;
}

.product-image {
  height: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
}

.product-info {
  margin-top: 10px;
}
.product-info {
    display: flex;
    justify-content: space-between;
}
.price .h5 {
  font-size: 1.25rem;
}

.price .h6 {
  font-size: 1rem;
  color: #888;
}
.product-card .bi {
    color: #888;
}

</style>
