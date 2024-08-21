<template>
  <Loading :active="isLoading"></Loading>
  <header>
    <div class="side-nav">
      <router-link class="navbar-brand" to="/"><img src="../assets/images/zhuzh_logo.png" alt="post"></router-link>
      <div class="icons">
        <router-link class="navbar-brand" to="/user/list"><i class="bi bi-shop-window"></i></router-link>
        <router-link class="navbar-brand" to="/user/favorite"><i class="bi bi-bookmark-heart-fill"></i></router-link>
        <router-link class="navbar-brand" to="/user/cart"><i class="bi bi-handbag"></i></router-link>
      </div>
      <div class="arrow-down">
        <i class="bi bi-arrow-down-circle"></i>
      </div>
    </div>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/images/home_ad1.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../assets/images/home_ad2.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </header>
  <div class='seperator'></div>
  <h2>Products</h2>
  <hr>
  <div class="container">
    <!-- 商品列表 -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="item in limitedProducts" :key="item.id">
        <div class="product-container">
          <div class="product-image-grid"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
              @click="getProduct(item.id)"
          >
          </div>
          <div class="title-cart">
            <p @click="getProduct(item.id)">{{ item.title }}</p>
            <button type="button" class="btn"
                :disabled="this.status.loadingItem === item.id"
                @click="addCart(item.id)">
              <div v-if="this.status.loadingItem === item.id" class="spinner-grow spinner-grow-sm text-danger" role="status">
                  <span class="visually-hidden">Loading...</span>
              </div>
                  <i class="bi bi-cart-fill"></i>
            </button>
          </div>
          <p style="color: #CE0000;">${{ item.price }}</p>
        </div>
      </div>
    </div>
    <p class="products-more jump-animation" @click="getUserList()"><i class="bi bi-arrow-right"></i>  點我看更多商品</p>
    <div class='seperator'></div>
    <h2>Products Articles</h2>
    <hr>
    <!-- 文章列表 -->
    <div class="article-container">
      <div class="row">
        <div class="col-md-12" v-for="(article,index) in articles" :key="article.id">
          <div
          class="row mb-2"
          :class="[index === (ArticlesNum - 1) ? '' : 'mb-md-4']"
        >
          <div
            class="col-md-6"
            :class="[index%2 === 0 ? '' : 'order-md-1 offset-md-1']"
          >
          <img :src="article.imageUrl" alt="article image" class="img-fluid" />
          </div>
          <div class="col-md-4 offset-md-1 d-flex flex-column justify-content-center py-3">
            <h3 class="fs-4 fw-bold mb-3">
              {{ article.title }}
            </h3>
            <p class="text-secondary text-prewrap mb-3">
              {{ article.description }}
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <UserFooter></UserFooter>
</template>

<style>
/* *{outline: 1px solid #000;} */
header {
  display: flex;
}
.icons {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 使內容在垂直排列中水平居中 */
  justify-content: space-between; /* 讓圖標在垂直方向上分散排列 */
  height: 180px; /* 讓icon容器有適當的高度可以分散 */
}
.icons i{
  font-size: 22px;
  color: #8b7575c9;
}
.side-nav img {
  width: 100px; /* logo寬度設定*/
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}
.arrow-down {
  margin-top: 310px;
  text-align: center;
}
.arrow-down i {
  font-size: 22px;
  color: #8b7575c9;
  display: inline-block; /* 使圖示能夠使用 transform */
  animation: bounce 1s ease-in-out infinite;
  /* 1s 表示動畫的持續時間，ease-in-out 表示動畫的加速和減速方式，infinite 表示動畫將無限次循環 */
}
.carousel-item img {
  object-fit: cover; /* 避免圖片拉伸 */
}
.seperator {
  height: 100px;
}
div h2 {
  text-align: center; /* 使內容置中 */
  color: #8b7575c9; /* 更改文字顏色，這裡使用橙色作為範例 */
}
.product-container {
  position: relative; /* 使容器的子元素能夠使用絕對定位 */
  overflow: hidden; /* 隱藏溢出容器的內容 */
  height: 400px; /* 設定容器高度 */
  width: 100%; /* 設定容器寬度以適應父元素 */
}
.product-image-grid {
  height: 300px; /* 使圖片填滿容器 */
  width: auto; /* 自動調整寬度以保持比例 */
  background-size: cover; /* 確保背景圖片覆蓋容器 */
  background-position: center; /* 圖片居中 */
  transition: transform 0.3s ease; /* 添加過渡效果 */
}
.product-image-grid:hover {
  transform: scale(1.1); /* 鼠標懸停時放大 */
}
.article-container {
  display: flex;
  align-items: center;
  padding: 15px 0; /* 給上下邊緣增加一些間距 */
}

.article-container img {
  width: 80%; /* 確保圖片在其容器中填滿寬度 */
  height: auto; /* 保持圖片的寬高比例 */
  object-fit: cover; /* 確保圖片覆蓋整個區域而不變形 */
  border-radius: 5px; /* 設定圓角 */
  transition: transform 0.3s ease; /* 添加過渡效果以實現平滑移動 */
}
.article-container img:hover {
  transform: translateX(10px); /* 當鼠標移動到圖片上時，向右移動10px */
}
.title-cart {
  display: flex;
  justify-content: space-between;
  margin-top: 15px; /* 增加 margin 來將 .title-cart 下移 */
}
.title-cart .btn {
  color: #777;
  border: none; /* 移除邊框 */
  box-shadow: none; /* 移除按鈕的陰影，避免點擊後有陰影效果 */
  outline: none; /* 避免點擊後有外框 */
}
.title-cart .btn:hover {
  color: #eb9a7adc; /* 滑鼠懸停時的顏色變化 */
}
.title-cart .btn:focus {
  outline: none; /* 移除點擊後的外框 */
  box-shadow: none; /* 移除點擊後的陰影 */
}
.title-cart .btn i {
  font-size: 16px;
}

.title-cart p {
  padding-top: 15px;
  font-size: 15px;
}
.title-cart p:hover {
  color: #636161d5;
  padding-top: 15px;
  cursor: pointer;
}
.products-more {
  text-align: right;
  text-decoration: none;
  color: #777;
}
.products-more:hover {
  cursor: pointer;
}
@keyframes jump {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.jump-animation {
  display: inline-block; /* 使文字能夠使用transform */
  animation: jump 1s ease-in-out infinite;
  /* 1s 表示動畫的持續時間，ease-in-out 表示動畫的加速和減速方式，infinite 表示動畫將無限次循環 */
}
</style>

<script>
import UserFooter from '@/components/UserFooter.vue'
export default {
  data () {
    return {
      ArticlesNum: 3,
      products: [],
      articles: [],
      articlesData: [],
      isLoading: false,
      status: {
        loadingItem: ''
      }
    }
  },
  components: {
    UserFooter
  },
  methods: {
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
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    getUserList () {
      this.$router.push('/user/list')
    },
    getArticles () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.articlesData = res.data.articles
          this.articles = this.articlesData.slice(0, this.ArticlesNum)
          console.log('articles:', res)
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '取得近期文章')
        })
    }
  },
  created () {
    this.getArticles()
    this.getProducts()
  },
  computed: {
    limitedProducts () {
      return this.products.slice(6, 12)
    }
  }
}
</script>
