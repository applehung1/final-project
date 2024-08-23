<template>
    <div class="container">
      <div class="container-inside">
        <aside id="sidebar" class="left-sidebar col-md-3">
          <h4 class="widget-title">關於About</h4>
          <hr>
              <div class="widget_categories">
                <ul>
                  <li>
                    <router-link to="overview">文章閱讀</router-link>
                  </li>
                </ul>
              </div>
        </aside>
        <div class="col-md-9">
            <header class="content-top clearfix">
              <h1 class="main-title">關於我們</h1>
            </header>
            <hr>
            <h4>探索花藝世界的美麗</h4>
            <p>在這裡，您可以發現各式各樣的花卉設計，無論是浪漫的玫瑰還是清新的百合，
                我們的專家團隊都致力於為您提供最精緻的花束和花藝裝飾。
                幫助您在任何場合中展現花卉的獨特魅力。無論您是尋找完美的禮物，
                還是想要裝飾您的家，我們都能滿足您的需求，讓花卉的美麗成為您生活的一部分。</p>
            <div class="product-grid">
                <!-- 文章列表 -->
                <div class="about-article-container">
                    <div v-for="article in articles" :key="article.id">
                        <div class="article-grid">
                            <img :src="article.imageUrl" alt="article image" class="img-fluid" />
                            <div class="article-title-description">
                                <h3>
                                    {{ article.title }}
                                </h3>
                                <p class="text-secondary text-prewrap">
                                    {{ article.description }}
                                </p>
                                <span><router-link :to="`/user/about/${article.id}`"
                                    class="router-text">
                                    查看全文
                                </router-link></span>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>

<script>

export default {
  data () {
    return {
      ArticlesNum: 3,
      articles: [],
      articlesData: [],
      isLoading: false
    }
  },
  methods: {
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
  }
}
</script>

<style>
/* *{outline: 1px solid #000;} */
.container-inside {
  display: flex;
}
.left-sidebar hr {
  width: 86%;
  margin-left: 32px; /* 往右移 */
}
.widget-title {
  padding: 20px 0px 20px 30px;
}
.widget_categories ul li {
  list-style-type: none;
  font-weight: 600;
  border: 1px solid #ddd; /* 添加一個淺灰色的邊線 */
  padding: 3px; /* 增加內部填充，使邊線不緊貼內容 */
  margin: 13px;
  margin-left: 0px;
  margin-top: 5px;
  text-align: left;
}
.widget_categories ul li a {
  text-decoration: none; /* 去除 a 標籤的下底線 */
  font-size: 15px;
  display: block;
  padding: 7px 10px 7px 25px;
  line-height: 24px;
  color: #777;
}
.widget_categories ul li.active a {
  font-weight: bold; /* 加粗字體 */
  background-color: #e6e6e6; /* 添加背景色 */
  border-color: #000; /* 改變邊框顏色 */
}
.article-grid {
    display: flex;
    padding-top: 30px;
}
.about-article-container img {
  width: auto; /* 確保圖片在其容器中填滿寬度 */
  height: 300px; /* 保持圖片的寬高比例 */
  object-fit: cover; /* 確保圖片覆蓋整個區域而不變形 */
  border-radius: 5px; /* 設定圓角 */
  transition: transform 0.3s ease; /* 添加過渡效果以實現平滑移動 */
}
.article-title-description {
    margin-left: 15px;
}
.router-text {
    text-decoration: none; /* 去除下底線 */
    color: #8d7b6d;
}
@media only screen and (max-width: 768px) {
  .container-inside {
    flex-direction: column; /* 將左右佈局改為上下佈局 */
  }

  .left-sidebar {
    width: 100%; /* 左側欄位佔滿整個寬度 */
    padding: 0 15px; /* 增加左右內間距 */
    margin-bottom: 20px; /* 下方增加空間 */
  }

  .left-sidebar hr {
    width: 100%;
    margin-left: 0; /* 取消向右移動，讓 hr 佔滿整個寬度 */
  }

  .widget-title {
    padding: 20px 0px 20px 15px; /* 調整 padding 使其更適應手機螢幕 */
  }

  .widget_categories ul li {
    font-size: 14px; /* 減小字體大小 */
    padding: 5px; /* 調整填充以適應較小的螢幕 */
    margin: 10px 0; /* 縮小 margin */
  }

  .col-md-9 {
    width: 100%; /* 主要內容區域佔滿整個寬度 */
    padding: 0 15px; /* 增加左右內間距 */
  }

  .article-grid {
    flex-direction: column; /* 將文章內容和圖片上下排列 */
    align-items: center; /* 讓內容居中對齊 */
  }

  .about-article-container img {
    width: 100%; /* 圖片佔滿整個寬度 */
    height: auto; /* 自動調整高度以保持比例 */
  }

  .article-title-description {
    margin-left: 0; /* 取消左側邊距 */
    text-align: center; /* 標題與描述居中 */
    padding-top: 10px; /* 增加與圖片間的距離 */
  }

  .main-title {
    font-size: 24px; /* 調整標題大小 */
    text-align: center; /* 標題居中對齊 */
  }

  .widget_categories ul li a {
    padding-left: 15px; /* 調整內間距 */
    font-size: 16px; /* 調整字體大小 */
  }

  .widget_categories ul li {
    margin: 8px 0; /* 減少 margin */
  }

  .router-text {
    font-size: 14px; /* 調整連結字體大小 */
  }
}
</style>
