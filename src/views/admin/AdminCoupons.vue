<script>
import dateMixin from '@/mixins/dateMixin.js'
import PaginationComponent from '@/components/PaginationComponent.vue';
import CouponModal from '@/components/CouponModal.vue';
import delCouponModal from '@/components/delCouponModal.vue';
import {  mapActions,mapState } from 'pinia';
import adminCouponStore from '@/stores/adminCouponStore.js';

export default{
  data() {
    return {
      tempCoupon:{}
    }
  },
  mixins: [dateMixin],
  components:{
    PaginationComponent,
    CouponModal,
    delCouponModal
  },
  computed:{
    ...mapState(adminCouponStore,['coupons', 'pagination','isCloseModal']),
  },
  watch:{
    isCloseModal(){
      if(this.isCloseModal === "modal"){
        this.closeModal()
      }
    }
  },
  methods: {
    ...mapActions(adminCouponStore,['getCoupons']),
    //打開modal
    OpenModal(effect, coupon){
      const couponModal = this.$refs.couponModal
      const delCouponModal = this.$refs.delCouponModal
      if(effect === "new"){
        this.tempCoupon = { 
          due_date: this.dateToTime(),
          is_enabled : 1
        };
        couponModal.openModal()
      }else if(effect === "edit"){
        this.tempCoupon = {...coupon}
        couponModal.openModal()
      }
      else if(effect === "del"){
        this.tempCoupon = {...coupon}
          this.$nextTick(() => {
            delCouponModal.openAlert()
          });
      }
    },
    //關閉modal
    closeModal() {
      const couponModal = this.$refs.couponModal
      couponModal.hideModal()
    },
  },
  mounted() {
    this.getCoupons()
  },
}

</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <h5>優惠券管理</h5>
      <button type="button" class="btn btn-outline-adminbtn" @click="OpenModal('new')">
            建立新優惠券〸
      </button>
    </div>
        <div class="table-responsive-lg">
          <table class="table  align-middle">
            <thead>
              <tr>
                <th scope="col">名稱</th>
                <th scope="col">優惠碼</th>
                <th scope="col">折扣百分比</th>
                <th scope="col">到期日</th>
                <th scope="col">是否啟用</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="coupon in coupons" :key="coupon.id">
                <th scope="row" >
                  {{coupon.title}}
                </th>
                <td scope="row" >
                  {{coupon.code}}
                </td>
                <td scope="row" >
                  {{coupon.percent}}%
                </td>
                <td>
                  {{ timeDate(coupon.due_date) }} 
                </td>
                <td>
                  <span v-if="coupon.is_enabled" class="text-adminbtn">啟用</span>
                  <span v-else>未啟用</span>
                </td>
                <td class="text-end">
                  <button type="button" class="btn btn-buttonbg me-3" @click="OpenModal('edit',coupon)">
                  編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger" @click="OpenModal('del',coupon)">
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
             
            </tbody>
          </table>
        </div>
        <PaginationComponent :pages="pagination" @emit-pages="getCoupons"></PaginationComponent>
        <CouponModal ref="couponModal" :coupon="tempCoupon"></CouponModal>
        <delCouponModal ref="delCouponModal" :temp-coupon="tempCoupon"></delCouponModal>
      
  </div>
</template>