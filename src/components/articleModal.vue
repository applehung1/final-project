<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true"
  ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增文章</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
                    <div class="row">
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempArticle.title"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="description" class="form-label">文章內容</label>
                  <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempArticle.description"
                    placeholder="請輸入文章內容"
                  />
                </div>
                <div class="col-sm-4">
                  <div class="mb-3">
                    <label for="image" class="form-label">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      v-model="tempArticle.imageUrl"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="customFile" class="form-label"
                      >或 上傳圖片
                      <i class="fas fa-spinner fa-spin"></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      ref="fileInput"
                      @change="uploadFile"
                    />
                  </div>
                  <img class="img-fluid" :src="tempArticle.imageUrl" alt="" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="tag" class="form-label">tag</label>
                  <input
                    type="text"
                    class="form-control"
                    id="tag"
                    v-model="tempArticle.tag"
                    placeholder="請輸入標籤"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="create_at" class="form-label">建立日期</label>
                  <input
                    type="date"
                    class="form-control"
                    id="create_at"
                    v-model="formattedDate"
                    @input="updateCreateDate"
                    placeholder="請輸入建立日期"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="percent" class="form-label">作者</label>
                  <input
                    type="text"
                    class="form-control"
                    id="percent"
                    v-model="tempArticle.author"
                    placeholder="請輸入作者"
                  />
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="content" class="form-label">內容</label>
                  <input
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempArticle.content"
                    placeholder="請輸入文章內容"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempArticle.isPublic"
                    :true-value="true"
                    :false-value="false"
                    id="isPublic"
                  />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-article', tempArticle)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
// 取用library的概念
export default {
  props: {
    article: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    article: {
      immediate: true, // 確保Article在組件初始化時就觸發，否則程式會在讀取props傳入之前就讀取tempArticle.title
      handler (newArticle) {
        this.tempArticle = { ...newArticle }
        // 如果沒有到期日，設置為今天的日期
        if (!this.tempArticle.due_date) {
          this.tempArticle.due_date = Math.floor(Date.now() / 1000)
        }
      }
    }
  },
  data () {
    return {
      modal: {},
      tempArticle: {
        due_date: Math.floor(Date.now() / 1000)
      }
    }
  },
  computed: {
    formattedDate () {
      const date = new Date(this.tempArticle.create_at * 1000)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  },
  methods: {
    updateCreateDate (event) {
      const selectedDate = new Date(event.target.value)
      this.tempArticle.create_at = Math.floor(selectedDate.getTime() / 1000)
    },
    uploadFile () {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.isLoading = true
      this.$http.post(url, formData).then((response) => {
        console.log(response.data)
        this.isLoading = false
        if (response.data.success) {
          this.tempArticle.imageUrl = response.data.imageUrl
          //  把遠端路徑儲存到tempArticle
        }
      })
    }
  },
  mixins: [modalMixin]
}
</script>
