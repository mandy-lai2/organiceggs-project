<script>
import {  mapState } from 'pinia';
import orderStore from "@/stores/orderStore.js";
import loadingStore from "@/stores/loadingStore.js";
import LoadingAnimation from '@/components/LoadingAnimation.vue'
import dateMixin from '@/mixins/dateMixin.js';
export default {
  data() {
    return {
    }
  },
  components:{
    LoadingAnimation
  },
  computed:{
    ...mapState(orderStore,['orderData']),
    ...mapState(loadingStore, ['isLoading']),
  },
  mixins: [dateMixin],
  methods: {
    // ...mapActions(orderStore,['orderPay','getOrder']),
  },
  mounted() {
  },
}
</script>
<template>
  <VLoading :active="isLoading">
    <LoadingAnimation></LoadingAnimation>
  </VLoading>
  <header>
    <div class="bgImageCover pageBanner d-flex flex-column justify-content-center  align-items-start">
      <div>
        <h2 class="py-3">訂單完成<span class="text-uppercase">Finish</span>
        </h2>
        <hr class="border border-maincolor border-2 opacity-100">
      </div>
    </div>
  </header>
  <section>
    <div class="container my-6">
      <div class="position-relative m-4 orderProgress">
        <div class="progress" style="height: 2px;">
          <div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="33" aria-valuemin="0"
            aria-valuemax="100"></div>
        </div>
        <button class="position-absolute top-0 start-0 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"><i
            class="bi bi-cart3"></i><span class="text-maingray">購物車 </span></button>
        <button class="position-absolute top-0 start-33 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"><i
            class="bi bi-pencil"></i><span class="text-maingray">填寫資料</span></button>
        <button class="position-absolute top-0 start-66 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"><i
            class="bi bi-check-lg"></i><span class="text-maingray">付款方式</span></button>
        <button class="position-absolute top-0 start-100 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"><i
            class="bi bi-clipboard-check"></i><span class="text-maingray">訂單完成</span></button>
      </div>
    </div>
  </section>
  <section>
    <div class="container mt-5">
      <div class="w-50 mx-auto text-center">
        <h3 class="text-maingray"><i class="bi bi-check-circle fs-1"></i><br>訂單完成<br>感謝您的購買</h3>
      </div>
    </div>
  </section>
  <section>
    <div class="container my-3">
      <div class="bg-light mx-auto p-4 lh-lg w-fit">
        <p>
          下單時間: {{timeDate(orderData.create_at)}}<br>
          訂單編號: {{orderData.id}}<br>
          收件人姓名: {{ orderData.user.name }}<br>
          收件人地址: {{orderData.user.address}}<br>
          聯絡電話: {{orderData.user.tel}}<br>
          總金額: ${{orderData.total}}<br>
          付款狀態:{{ orderData.is_paid ? '已付款' : '未付款' }}<br>
          備註:{{orderData.message}}
        </p>
      </div>
    </div>
  </section>
  <section>
    <div class="container my-5">
      <div class="hstack gap-3">
        <div><router-link to="/"  class="btn btn-outline-buttonbg">回首頁</router-link></div>
        <div class="ms-auto"><router-link to="/products" class="btn btn-buttonbg">繼續購物</router-link></div>
      </div>
    </div>
  </section>
</template>