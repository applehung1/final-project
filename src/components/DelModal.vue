<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">刪除確認</h5>
          <button type="button" class="btn-close" @click="hideModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>確定要刪除這個產品嗎？</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideModal">取消</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  methods: {
    confirmDelete () {
      console.log('confirmDelete called')
      this.$emit('del-item')
      this.hideModal()
    }
  },
  mixins: [modalMixin]
}
</script>
