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
            <span>新增優惠券</span>
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
                  v-model="tempCoupon.title"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="code" class="form-label">優惠碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    v-model="tempCoupon.code"
                    placeholder="請輸入優惠碼"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="due_date" class="form-label">到期日</label>
                  <input
                    type="date"
                    class="form-control"
                    id="due_date"
                    v-model="formattedDate"
                    @input="updateDueDate"
                    placeholder="請輸入到期日"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="percent" class="form-label">折扣百分比</label>
                  <input
                    type="number"
                    class="form-control"
                    id="percent"
                    v-model.number="tempCoupon.percent"
                    placeholder="請輸入折扣百分比"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempCoupon.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
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
            @click="$emit('update-coupon', tempCoupon)"
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
    coupon: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    coupon: {
      immediate: true, // 確保coupon在組件初始化時就觸發，否則程式會在讀取props傳入之前就讀取tempCoupon.title
      handler (newCoupon) {
        this.tempCoupon = { ...newCoupon }
        // 如果沒有到期日，設置為今天的日期
        if (!this.tempCoupon.due_date) {
          this.tempCoupon.due_date = Math.floor(Date.now() / 1000)
        }
      }
    }
  },
  data () {
    return {
      modal: {},
      tempCoupon: {
        due_date: Math.floor(Date.now() / 1000)
      }
    }
  },
  computed: {
    formattedDate () {
      const date = new Date(this.tempCoupon.due_date * 1000)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  },
  methods: {
    updateDueDate (event) {
      const selectedDate = new Date(event.target.value)
      this.tempCoupon.due_date = Math.floor(selectedDate.getTime() / 1000)
    }
  },
  mixins: [modalMixin]
}
</script>
