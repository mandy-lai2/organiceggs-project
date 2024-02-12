<script>
import dateMixin from '@/mixins/dateMixin.js'
import PaginationComponent from '@/components/PaginationComponent.vue';
import OrderModal from '@/components/OrderModal.vue';
import DelOrderModal from '@/components/DelOrderModal.vue';
import {  mapActions, mapState } from 'pinia';
import adminOrderStore from '@/stores/adminOrderStore.js';

export default{
  data() {
    return {
      tempOrder:{}
    }
  },
  computed:{
    ...mapState(adminOrderStore,['orders', 'pagination', 'isCloseModal']),
  },
  components:{
    PaginationComponent,
    OrderModal,
    DelOrderModal
  },
  mixins: [dateMixin],
  watch:{
    isCloseModal(){
      if(this.isCloseModal === "modal"){
        this.closeModal(this.isCloseModal)
      }
    }
  },
  methods: {
    ...mapActions(adminOrderStore,['getOrders','updateOrder']),
    // 開啟modal
    OpenModal(effect, order) {
      const orderModal = this.$refs.orderModal
      const delOrderModal = this.$refs.delOrderModal
     
      if (effect === "edit") {
        this.tempOrder = { ...order };
        orderModal.openModal()
      } else if (effect === "del") {
        this.tempOrder = { ...order };
        this.$nextTick(() => {
          delOrderModal.openAlert()
          });
      }
    },
    //關閉modal
    closeModal(modal) {
      const orderModal = this.$refs.orderModal
      // const delOrderModal = this.$refs.delOrderModal
      if (modal === "modal") {
        orderModal.hideModal()
      } 
      // else if (modal === "delModal") {
      //   delOrderModal.hideModal()
      // }
    },
  },
  mounted() {
    this.getOrders()
  }

}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <h5>訂單管理</h5>
    </div>
        <div class="table-responsive-lg">
          <table class="table  align-middle">
            <thead>
              <tr>
                <th scope="col">購買時間</th>
                <th scope="col">Email</th>
                <th scope="col">購買項目</th>
                <th scope="col">應付金額</th>
                <th scope="col">是否付款</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <th scope="row" class="w-sm-50">
                  {{timeDate(order.create_at)}}
                </th>
                <td scope="row" class="w-sm-50">
                  {{order.user.email}}
                </td>
                <td>
                  <ul class="list-unstyled">
                    <li v-for="product in order.products" :key="product.id" class="text-success mb-2">{{ product.product.title }} 數量：{{ product.qty }}</li>
                  </ul>
                </td>
                <td>
                    NT${{order.total}}
                </td>
                <td>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" :id="`checkPaid${order.id}`" v-model="order.is_paid" @change="updateOrder(order)">
                    <label class="form-check-label" :for="`checkPaid${order.id}`">{{ order.is_paid ? "已付款": "未付款"}}</label>
                  </div>
                </td>
                <td class="text-end">
                  <button type="button" class="btn btn-buttonbg me-3" @click="OpenModal('edit', order)">
                    檢視
                  </button>
                  <button type="button" class="btn btn-outline-danger" @click="OpenModal('del', order)">
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PaginationComponent :pages="pagination" @emit-pages="getOrders"></PaginationComponent>
        <OrderModal ref="orderModal" :order="tempOrder"  @update-paid="updateOrder"></OrderModal>
        <DelOrderModal ref="delOrderModal" :order="tempOrder" @get-orders="getOrders"></DelOrderModal>

  </div>
</template>