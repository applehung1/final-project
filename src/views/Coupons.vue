<template>
    <Loading :active="isLoading"></Loading>
    <div class="text-end">
      <div class="btn btn-primary" type="button"
      @click="openCouponModal(true)">
          增加優惠券
      </div>
    </div>
      <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">標題</th>
          <th>優惠碼</th>
          <th width="120">到期日</th>
          <th width="120">折扣百分比</th>
          <th width="100">是否啟用</th>
          <th width="200">更新優惠券</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.code }}
          </td>
          <td class="text-right">
            {{ $filters.date(item.due_date) }}
          </td>
          <td>
            {{ item.percent }}%
          </td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false,item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm"
              @click="openDelCouponModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal ref="couponModal"
    :coupon="tempCoupon"
    @update-coupon="updateCoupon"></CouponModal>
    <DelModal ref="delModal"
    :item="tempCoupon" @del-item="delCoupon"
    ></DelModal>
  </template>

<script>
import CouponModal from '../components/CouponModal.vue'
import DelModal from '../components/DelModal.vue'
export default {
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      isLoading: false,
      isNew: false
    }
  },
  components: {
    CouponModal,
    DelModal
  },
  methods: {
    getCoupons () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            console.log(res.data)
            this.coupons = res.data.coupons
            this.pagination = res.data.pagination
          }
        })
    },
    openCouponModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
        this.tempCoupon.is_enabled = 0
      } else {
        this.tempCoupon = { ...item }
      }
      this.isNew = isNew
      const couponComponent = this.$refs.couponModal
      couponComponent.showModal()
    },
    updateCoupon (item) {
      this.tempCoupon = item
      //   新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      //   編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethod = 'put'
      }
      const couponComponent = this.$refs.couponModal
      this.$http[httpMethod](api, { data: this.tempCoupon }).then((response) => {
        console.log(response)
        couponComponent.hideModal()
        this.getCoupons()
        this.$httpMessageState(response, '更新')
      })
    },
    openDelCouponModal (item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    delCoupon () {
      console.log('delete item')
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http.delete(api)
        .then((res) => {
          console.log(res.data)
          this.getCoupons()
          this.$httpMessageState(res, '刪除')
        })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
