<script>
import modalMixin from '@/mixins/modalMixin.js'
import dateMixin from '@/mixins/dateMixin.js'
import {  mapActions } from 'pinia';
import adminCouponStore from '@/stores/adminCouponStore.js';

export default {
  props: {
    coupon: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      tempCoupon: {},
      tempDate:""
    };
  },
  mixins: [modalMixin, dateMixin], 
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      this.tempDate = this.timeDate(this.tempCoupon.due_date)
      // console.log('this.tempCoupon->',this.tempCoupon);
      // console.log('this.tempDate->',this.tempDate);
      
    }, 
    tempDate(){
      this.tempCoupon.due_date = this.dateToTime(this.tempDate)
    }
  },
  methods: {
    ...mapActions(adminCouponStore,['updateCoupon']),
    confirmSend(tempCoupon){
      this.$refs.form.validate().then(valid => {
        if (valid.valid) {
          this.updateCoupon(tempCoupon.id ? 'edit' : 'new' , tempCoupon)
        } else {
          alert('送出失敗')
        }
      });
    }
   
  }
};
</script>

<template>
  <!-- 新增編輯Modal -->
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="false" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            <span v-if="tempCoupon.id">編輯優惠券</span>
            <span v-else>新增優惠券</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- modal-body -->
        <div class="modal-body">
          <v-form ref="form" class="row g-3 mb-3 modal-mb" v-slot="{ errors }">
                <div class="col-12">
                  <label for="inputTitle" class="form-label">標題</label>
                  <!-- <input type="text" class="form-control" id="inputTitle" placeholder="請輸入標題"
                    v-model="tempCoupon.title" /> -->
                    <v-field type="text" class="form-control" :class="{ 'is-invalid': errors['標題'] }" id="inputTitle" name="標題" placeholder="請輸入標題" rules="required" v-model="tempCoupon.title"></v-field>
                  <error-message name="標題" class="invalid-feedback"></error-message>
                </div>
                <div class="col-12">
                  <label for="inputCode" class="form-label">優惠碼</label>
                  <v-field type="text" class="form-control" :class="{ 'is-invalid': errors['優惠碼'] }" id="inputCode" name="優惠碼" placeholder="請輸入優惠碼" rules="required" v-model="tempCoupon.code" ></v-field>
                  <error-message name="優惠碼" class="invalid-feedback"></error-message>
                </div>
                <div class="col-12">
                  <label for="inputDuedate" class="form-label">到期日</label>
                  <input type="date" class="form-control" id="inputDuedate" placeholder="" 
                   v-model="tempDate" /> 
                </div>
                <div class="col-12">
                  <label for="inputPercent" class="form-label">折扣百分比</label>
                  <v-field type="number" min="0" max="100" class="form-control" :class="{ 'is-invalid': errors['折扣百分比'] }" id="inputPercent" name="折扣百分比" placeholder="請輸入折扣百分比" rules="required"  v-model="tempCoupon.percent" ></v-field>
                  <error-message name="折扣百分比" class="invalid-feedback"></error-message>
                </div>
                <div class="col-12 mb-3">
                  <input class="form-check-input" type="checkbox" id="isEnabled" :true-value="1" :false-value="0"  v-model="tempCoupon.is_enabled"/>
                  <label class="form-check-label" for="isEnabled">
                    是否啟用
                  </label>
                </div>
          </v-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="confirmSend(tempCoupon)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
