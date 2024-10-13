<template>
  <Loading :active="isLoading"></Loading>
  <header>
    <div class="side-nav">
      <router-link class="navbar-brand" to="/"><img src="../assets/images/zhuzh_logo.png" alt="post"></router-link>
      <div class="icons">
          <router-link class="navbar-brand" to="/user/list">
            <i class="bi bi-shop-window" title="所有商品"></i>
          </router-link>
          <router-link class="navbar-brand" to="/user/favorite">
            <i class="bi bi-bookmark-heart-fill" title="我的最愛"></i>
          </router-link>
          <router-link class="navbar-brand" to="/user/cart">
            <i class="bi bi-handbag" title="購物車"></i>
          </router-link>
      </div>
      <div class="arrow-down">
        <i class="bi bi-arrow-down-circle"></i>
      </div>
    </div>
    <div class="header_all">
      <div class="header_middle">
        <div class="square">露絲花藝專注於打造獨特且充滿創意的花藝作品，無論是精緻的花束、優雅的花籃，還是量身訂製的婚禮與活動花藝布置，我們都以細緻的手工與藝術眼光為每一件作品注入生命。選用新鮮花材結合現代與傳統風格，為您創造出與眾不同的花藝體驗。無論是表達愛意、慶祝特殊時刻，還是為空間增添一抹綠意，我們都致力於將您的情感以最美的方式呈現。
          <div class="overlay-square"></div>
        </div>
        <router-link to="/user/list" class="no-underline">
          <div class="start_btn">查看商品</div>
        </router-link>
        <div class="ad_title">不凋謝的愛<br>讓時光停留在最美的瞬間</div>
      </div>
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/images/home_ad3.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="../assets/images/home_ad4.jpg" class="d-block w-100" alt="...">
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
    </div>
  </header>
  <div class='seperator'></div>
  <h2>On Sale</h2>
  <hr>
    <div class="coupon_area">
      <router-link to="/user/list">
        <img src="../assets/images/coupon_ad.png" class="d-block w-100" alt="coupon_ad">
      </router-link>
    </div>
  <div class='seperator'></div>
  <h2>How to choose?</h2>
  <p class="article_title">重要時刻還缺了點儀式感對嗎? 一起來看看我們的商品如何增添儀式感吧!</p>
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
            <p @click="getArticle(article.id)" class="moreArticle">more</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  <div class='seperator'></div>
  <h2>人氣商品</h2>
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
                  @click="addFavorite(item.id)"
                ></i>
              </div>
          </div>
          <p style="color: #CE0000;">${{ item.price }}</p>
        </div>
      </div>
    </div>
    <p class="products-more jump-animation" @click="getUserList()"><i class="bi bi-arrow-right"></i>  點我看更多商品</p>
  </div>
  <div class='seperator'></div>
  <h2>情人節花禮</h2>
  <hr>
  <div class="container">
    <!-- 商品列表 -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="item in valetineProducts" :key="item.id">
        <div class="product-container">
          <div class="product-image-grid"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
              @click="getProduct(item.id)"
          >
          </div>
          <div class="title-cart">
            <p @click="getProduct(item.id)">{{ item.title }}</p>
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
                @click="addFavorite(item.id)"
              ></i>
            </div>
          </div>
          <p style="color: #CE0000;">${{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class='seperator'></div>
  <h2>畢業季花禮</h2>
  <hr>
  <div class="container">
    <!-- 商品列表 -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="item in graduateProducts" :key="item.id">
        <div class="product-container">
          <div class="product-image-grid"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
              @click="getProduct(item.id)"
          >
          </div>
          <div class="title-cart">
            <p @click="getProduct(item.id)">{{ item.title }}</p>
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
                  @click="addFavorite(item.id)"
                ></i>
            </div>
          </div>
          <p style="color: #CE0000;">${{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
  <UserFooter></UserFooter>
</template>

<style>
/* *{outline: 1px solid #000;}s */
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
  gap: 20px;
}
.icons i{
  font-size: 22px;
  color: #433939c9;
}
.side-nav {
  position: fixed;
  top: 0; /* 從頁面頂部開始 */
  left: 0; /* 固定在左側 */
  width: 100px; /* 設定寬度 */
  z-index: 1; /* 確保它在其他元素之上 */
  background-color: #fff;
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
  margin-top: 30px;
  text-align: center;
}
.arrow-down i {
  font-size: 22px;
  color: #8b7575c9;
  display: inline-block; /* 使圖示能夠使用 transform */
  animation: bounce 1s ease-in-out infinite;
  /* 1s 表示動畫的持續時間，ease-in-out 表示動畫的加速和減速方式，infinite 表示動畫將無限次循環 */
}
.header_all {
  display: flex;
  margin: auto;
}
.header_middle {
  display: relative;
  margin-left: auto;
}
.square {
  margin-top: 50px;
  background-color: #b78989;
  width: 350px;
  height: 350px;
  padding: 65px 25px 25px 25px;
  color: #fff;
  margin-bottom: 70px;
}
.overlay-square {
  width: 350px; /* 內部方形的寬度 */
  height: 350px; /* 內部方形的高度 */
  border: 1px solid #614949; /* 邊線顏色和厚度 */
  top: 95%; /* 水平垂直居中對齊 */
  left: 0%;
  transform: translate(-10%, -75%);
  background-color: transparent; /* 背景透明 */
}
.start_btn {
  margin-bottom: 70px;
  bottom: 130px;
  width: 70px; /* 圓形的寬度 */
  height: 40px; /* 圓形的高度 */
  border-radius: 5px;
  background-color: #b78989; /* 初始背景顏色 */
  color: #efdcdc;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 增加背景色變化的過渡效果 */
}
.start_btn::before {
  content: '';
  position: absolute;
  border-radius: 50%;
  width: 90px; /* 虛線圈的寬度，比按鈕略大 */
  height: 90px; /* 虛線圈的高度，比按鈕略大 */
  border: 2px dashed #efdcdc; /* 虛線顏色和樣式 */
  animation: rotate 5s linear infinite; /* 虛線旋轉動畫 */
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.no-underline {
  text-decoration: none;
  color: inherit;
}
.ad_title {
  position: relative;
  padding-left: 10px;
  font-size: 24px;
  white-space: pre-wrap; /* 保留空格和換行符，自動換行 */
  bottom: 0;
  font-weight: bolder;
  overflow: hidden;
  color: #b78989;
}
.ad_title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 1px; /* 邊框線的寬度 */
  background: #b78989; /* 邊框線的顏色 */
  transform: translateY(-100%); /* 初始位置在上方 */
  animation: slide-down 2s cubic-bezier(0.42, 0, 0.58, 1) infinite; /* 動畫效果 */
}

@keyframes slide-down {
  from {
    transform: translateY(-100%); /* 從上方開始 */
  }
  to {
    transform: translateY(100%); /* 滑到底部 */
  }
}
#carouselExampleControls {
  margin-left: 50px; /* 調整side-nav的寬度 */
  padding-top: 50px;
  max-width: 600px;

}
.carousel-item img {
  object-fit: cover; /* 避免圖片拉伸 */
  border-radius: 5px;
  width: 100%;
}
.carousel-inner img {
  width: 100%;
  height: auto; /* 確保圖片按比例縮放 */
}
.carousel-indicators button {
  background-color: #000; /* 指示器的颜色 */
}

.seperator {
  height: 100px;
}
.article_title {
  color: rgb(105, 94, 81);
  font-size: 18px;
  text-align: center;
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
  padding: 15px 100px 15px 100px; /* 給上下邊緣增加一些間距 */
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
.moreArticle {
  width: 50px; /* 圓形的寬度 */
  height: 50px; /* 圓形的高度 */
  border-radius: 50%; /* 使元素變成圓形 */
  background-color: #ceb1b1; /* 初始背景顏色 */
  color: #857272;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 增加背景色變化的過渡效果 */
}

.moreArticle:hover {
  background-color: #7a6565; /* 滑鼠懸停時的背景顏色 */
  color: #f3ebeb; /* 滑鼠懸停時的文字顏色 */
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
.title-cart i {
  color: #cc6c6c;
}
.title-cart i:hover {
  color: #debaba;
  cursor: pointer;
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
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  opacity: 0; /* 初始狀態為隱藏 */
  transition: opacity 0.6s ease-out, transform 0.6s ease-out; /* 增加過渡效果 */
}
@media (max-width: 768px) {
  /* Header 圖示在手機上垂直排列 */
  .icons {
    justify-content: space-around;
    height: auto;
    margin-top: 10px;
  }

  .side-nav {
    width: 100%;
    height: auto;
    position: relative;
    padding: 10px 0;
    text-align: center;
  }

  .side-nav img {
    width: 80px;
  }

  .header_all {
    flex-direction: column;
    margin: 0 auto;
    padding: 10px;
  }

  .square {
    width: 100%;
    height: auto;
    padding: 20px;
    margin-top: 20px;
  }

  .overlay-square {
    display: none;
  }
  .header_middle {
    display: flex;
    justify-content: center; /* 水平置中 */
    flex-direction: column;  /* 讓內容在垂直方向排列 */
    align-items: center; /* 垂直方向上居中 */
  }
  .start_btn {
    margin-bottom: 50px;
    width: 100%;
    height: 50px;
    font-size: 16px;
  }

  .ad_title {
    font-size: 20px;
    text-align: center;
    padding-left: 0;
    margin-top: 20px;
  }

  .carousel-item img {
    height: 100%; /* 調整輪播圖片高度以適應手機螢幕 */
  }

  .article-container {
    padding: 10px;
  }

  .article-container .col-md-6 {
    width: 100%;
    padding: 0;
  }

  .article-container .col-md-4 {
    width: 100%;
    padding: 0;
  }

  .product-container {
    width: 100%;
    margin-bottom: 20px;
  }

  .product-image-grid {
    background-size: cover;
    height: 200px;
  }

  .title-cart {
    text-align: center;
    margin-top: 10px;
  }

  .actions {
    display: flex;
    justify-content: center;
    align-items: center; /* 垂直居中按鈕內的內容 */
  }
  .actions button,
  .actions i {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    height: 40px; /* 設定固定高度 */
    border-radius: 50%; /* 讓按鈕成為圓形 */
  }

  /* 調整分隔線的寬度 */
  .seperator {
    margin-top: 20px;
    width: 100%;
  }

  /* 手機版的h2和標題字體調整 */
  h2 {
    font-size: 24px;
    text-align: center;
  }

  .article_title {
    font-size: 18px;
    text-align: center;
  }

  /* 讓購物車和其他按鈕在手機上全寬 */
  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>

<script>
import UserFooter from '@/components/UserFooter.vue'
import cartMixin from '@/mixins/cartMixin'
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
      },
      favoriteItems: [] // 用於存儲已加入最愛的商品 ID
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
    },
    getArticle (id) {
      console.log(id)
      this.$router.push(`/user/about/${id}`)
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
    addFavorite (id) {
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
    this.getArticles()
    this.getProducts()
  },
  computed: {
    valetineProducts () {
      // return this.products.slice(6, 12)
      return this.products.filter(product => {
        return product.category === '情人節花禮'
      }).slice(0, 6)
    },
    graduateProducts () {
      // return this.products.slice(6, 12)
      return this.products.filter(product => {
        return product.category === '畢業季花禮'
      }).slice(0, 6)
    },
    limitedProducts () {
      return this.products.slice(6, 12)
    }
  },
  mixins: [cartMixin]
}
</script>
