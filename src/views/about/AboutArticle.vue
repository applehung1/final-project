<template>
    <div class="top-container">
        <p><router-link to="/user/about/overview" class="router-link">關於我們</router-link></p>
        <p>/</p>
        <p>文章</p>
    </div>
    <hr>
    <!-- <aside id="sidebar" class="left-sidebar col-md-3">
            <div class="widget_categories">
              <ul>
                <li v-for="(item) in articles" :key="item.id"
                >
                  <router-link :to="`/user/about/${item.id}`">{{ item.title }}</router-link>
                </li>
              </ul>
            </div>
      </aside> -->
    <!-- 文章區 -->
    <div class="one-article-container">
        <h3>Articles</h3>
        <hr>
      <div class="image-container">
        <img :src="oneArticle.imageUrl" alt="article image" class="img-fluid" />
        <div class="text-overlay description">
          <h3 class="fw-bold">
            {{ oneArticle.title }}
          </h3>
          <p class="text-prewrap">
            {{ oneArticle.description }}
          </p>
        </div>
        <div class="text-overlay content">
          <p class="text-prewrap">
            {{ oneArticle.content }}
          </p>
        </div>
      </div>
    </div>
    <router-view></router-view>
</template>

<script>
export default {
  data () {
    return {
      oneArticle: [],
      articles: []
    }
  },
  methods: {
    getOneArticle () {
      const { articleId } = this.$route.params
      console.log(articleId)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/article/${articleId}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.oneArticle = res.data.article
          console.log(this.oneArticle)
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '取得近期文章')
        })
    },
    getArticles () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/articles`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.articles = res.data.articles
          console.log('articles:', res)
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err.response, '取得近期文章')
        })
    }
  },
  created () {
    this.getOneArticle()
    this.getArticles()
  }
}
</script>

<style>
/* *{outline: 1px solid #000;} */
.top-container {
  margin-left: 5px;
  display: flex;
}
.top-container p{
  margin-right: 4px;
  color: #8d7b6d;
}
.router-link {
  text-decoration: none; /* 去除下底線 */
  color: inherit; /* 繼承父元素的顏色 */
}
.one-article-container {
  position: relative;
}
.one-article-container h3 {
    text-align: center;
    color: #af9d95;
}
.one-article-container hr {
    width: 50%;
    margin: 0 auto; /* 水平置中 */
    margin-bottom: 30px;
}
.image-container {
  position: relative;
  margin: 0 auto; /* 水平置中 */
}
.image-container p {
    color: rgb(65, 59, 57);
}
.image-container img {
  width: auto;
  height: 700px;
  filter: brightness(0.7) grayscale(30%); /* 使圖片變暗並降低色彩 */
  display: block; /* 水平置中 */
  margin: 0 auto; /* 水平置中 */
}

.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: #fff;
  color: rgba(49, 46, 42, 0.5);
}

.description {
  top: 100px; /* 距離頂部的距離 */
  left: 300px;;
  width: 500px;
  white-space: normal; /* 允許文字換行 */
  word-wrap: break-word; /* 當單詞過長時進行換行 */
  opacity: 0.9; /* 50% 透明度 */
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); /* 添加陰影 */
}

.content {
  width: 700px;
  top: 400px;
  left: 600px;
  white-space: normal; /* 允許文字換行 */
  word-wrap: break-word; /* 當單詞過長時進行換行 */
  opacity: 0.9; /* 50% 透明度 */
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); /* 添加陰影 */
}
@media (max-width: 768px) {
  /* 顶部容器調整 */
  .top-container {
    flex-direction: column; /* 讓內容垂直排列 */
    align-items: center; /* 讓內容水平居中 */
    margin: 0 auto; /* 讓容器居中 */
    text-align: center; /* 讓文字居中 */
  }
  .top-container p {
    margin: 5px 0; /* 上下各增加5px的距離 */
  }

  /* 调整路由链接的文字大小 */
  .router-link {
    font-size: 14px;
  }

  /* 文章容器調整 */
  .one-article-container h3 {
    font-size: 18px; /* 調整標題字體大小 */
  }

  .one-article-container hr {
    width: 70%; /* 調整分隔線寬度 */
  }

  /* 圖片容器調整 */
  .image-container img {
    width: 100%; /* 使圖片寬度填滿容器 */
    height: auto; /* 讓圖片高度自動調整 */
  }

  /* 文字覆蓋調整 */
  .text-overlay {
    position: static; /* 取消絕對定位，讓文字自動排列 */
    background: transparent; /* 移除背景顏色 */
    color: #333; /* 更改文字顏色 */
    padding: 10px;
    box-shadow: none; /* 移除陰影 */
  }

  /* 調整描述與內容的文字大小和位置 */
  .description, .content {
    width: 100%; /* 調整寬度以適應手機屏幕 */
    top: auto;
    left: auto;
    margin: 20px 0; /* 增加上下邊距 */
    font-size: 14px; /* 調整文字大小 */
    padding: 10px;
    background: rgba(255, 255, 255, 0.9); /* 增加白色半透明背景 */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* 輕微陰影效果 */
  }
}
</style>
