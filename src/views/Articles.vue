<template>
    <Loading :active="isLoading"></Loading>
    <div class="text-end">
      <div class="btn btn-primary" type="button"
      @click="openArticleModal(true)">
          新增文章
      </div>
    </div>
      <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">標題</th>
          <th>文章內容</th>
          <th>圖片</th>
          <th>tag</th>
          <th >建立日期</th>
          <th >作者</th>
          <th >是否公開</th>
          <th >文章內容</th>
          <th >更新</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articles" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.description }}
          </td>
          <td class="text-right">
            {{ item.image }}
          </td>
          <td class="text-right">
            {{ item.tag }}
          </td>
          <td class="text-right">
            {{ $filters.date(item.create_at) }}
          </td>
          <td>
            {{ item.author }}
          </td>
          <td>
            <span class="text-success" v-if="item.isPublic">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            {{ item.content }}
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
              @click="openArticleModal(false,item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm"
              @click="openDelArticleModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ArticleModal ref="articleModal"
    :article="tempArticle"
    @update-article="updateArticle"></ArticleModal>
    <DelModal ref="delModal"
    :item="tempArticle" @del-item="delArticle"
    ></DelModal>
  </template>

<script>
import ArticleModal from '../components/articleModal.vue'
import DelModal from '../components/DelModal.vue'
export default {
  data () {
    return {
      articles: [],
      tempArticle: {},
      isLoading: false,
      isNew: false
    }
  },
  components: {
    ArticleModal,
    DelModal
  },
  methods: {
    getArticles () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/articles`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            console.log(res.data)
            this.articles = res.data.articles
            this.pagination = res.data.pagination
          }
        })
    },
    openArticleModal (isNew, item) {
      if (isNew) {
        this.tempArticle = {}
        this.tempArticle.isPublic = false
      } else {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`
        console.log(api)
        // this.isLoading = true
        this.$http.get(api)
          .then((res) => {
            console.log(res)
            // this.tempArticle = JSON.parse(JSON.stringify(item))
            // this.tempArticle.content = res.data.item.content
            // this.isLoading = false
          })
        // this.tempArticle = { ...item }
      }
      this.isNew = isNew
      const articleComponent = this.$refs.articleModal
      articleComponent.showModal()
    },
    updateArticle (item) {
      this.tempArticle = item
      //   新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article`
      let httpMethod = 'post'
      //   編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`
        httpMethod = 'put'
      }
      const articleComponent = this.$refs.articleModal
      this.$http[httpMethod](api, { data: this.tempArticle }).then((response) => {
        console.log(response)
        articleComponent.hideModal()
        this.getArticles()
        this.$httpMessageState(response, '更新')
      })
    },
    openDelArticleModal (item) {
      this.tempArticle = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    delArticle () {
      console.log('delete item')
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/article/${this.tempArticle.id}`
      this.$http.delete(api)
        .then((res) => {
          console.log(res.data)
          this.getArticles()
          this.$httpMessageState(res, '刪除')
        })
    }
  },
  created () {
    this.getArticles()
  }
}
</script>
