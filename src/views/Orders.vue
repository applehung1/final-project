<template>
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
  </div>
    <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買項目</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>動作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in orders" :key="item.id">
        <td>{{ $filters.date(item.create_at) }}</td>
        <td>{{ item.user.email }}</td>
        <td class="text-right">
            <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }}
                 * {{ product.qty }} {{ product.product.unit }}
            </li>
        </td>
        <td class="text-right">
          {{ $filters.currency(item.total) }}
        </td>
        <td>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`"
            v-model="item.is_paid"
            @change="updatePaid(item)">
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-muted" v-else>未付款</span>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
            @click="openOrderModal(item)">檢視</button>
            <button class="btn btn-outline-danger btn-sm"
            @click="openDelOrderModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination :pages="pagination"
  @emit-pages="getOrders"></pagination>
  <OrderModal ref="orderModal"
  :order="tempOrder"></OrderModal>
  <DelModal ref="delModal"
  :item="tempOrder" @del-item="delOrder"
  ></DelModal>
</template>

<script>
import OrderModal from '../components/OrderModal.vue'
import DelModal from '../components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      orders: [],
      pagination: {},
      tempOrder: {},
      isLoading: false
    }
  },
  components: {
    OrderModal,
    DelModal,
    Pagination
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            console.log(res.data)
            this.orders = res.data.orders
            this.pagination = res.data.pagination
          }
        })
    },
    openOrderModal (item) {
      console.log('開啟編輯modal')
      this.tempOrder = { ...item }
      //   打開modal的時候要將資料傳給tempOrder，才能props到modal
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    },
    updatePaid (item) {
      this.isLoading = false
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(api, { data: paid }).then((response) => {
        this.isLoading = false
        // this.getOrders(this.currentPage)
        this.getOrders()
        this.$httpMessageState(response, '更新付款狀態')
      })
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    delOrder () {
      console.log('delete item')
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.$http.delete(api)
        .then((res) => {
          console.log(res.data)
          this.getOrders()
          this.$httpMessageState(res, '刪除')
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
