<script>
import {  mapState, mapActions } from 'pinia';
import orderStore from "@/stores/orderStore.js";
import loadingStore from "@/stores/loadingStore.js";
import LoadingAnimation from '@/components/LoadingAnimation.vue'

export default {
  data() {
    return {
      currentOrderId:"",
    }
  },
  components:{
    LoadingAnimation
  },
  computed:{
    ...mapState(orderStore,['orderData','orderProducts']),
    ...mapState(loadingStore, ['isLoading']),
  },
  methods: {
    ...mapActions(orderStore,['orderPay','getOrder']),
    
  },
  mounted() {
    this.currentOrderId = this.$route.params.orderId
    this.getOrder(this.currentOrderId)
    
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
        <h2 class="py-3">付款方式<span class="text-uppercase">payment</span>
        </h2>
        <hr class="border border-maincolor border-2 opacity-100">
      </div>
    </div>
  </header>
  <template v-if="!orderData.is_paid">
  <section>
    <div class="container my-6">
      <div class="position-relative m-4 orderProgress">
        <div class="progress" style="height: 2px;">
          <div class="progress-bar" role="progressbar" style="width: 66%;" aria-valuenow="33" aria-valuemin="0"
            aria-valuemax="100"></div>
        </div>
        <button class="position-absolute top-0 start-0 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"><i
            class="bi bi-cart3"></i><span class="text-maingray">購物車 </span></button>
        <button class="position-absolute top-0 start-33 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"><i
            class="bi bi-pencil"></i><span class="text-maingray">填寫資料</span></button>
        <button class="position-absolute top-0 start-66 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"><i
            class="bi bi-check-lg"></i><span class="text-maingray">付款方式</span></button>
        <button
          class="position-absolute top-0 start-100 translate-middle btn btn-lg btn-secondarylight rounded-pill py-0"><i
            class="bi bi-clipboard-check"></i><span class="text-maingray">訂單完成</span></button>
      </div>
    </div>
  </section>
  
    <section>
      <div class="container mt-5">
        <h5>訂單明細</h5>
        <div class=" border">
          <div class="table-responsive-lg">
            <table class="table  align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col"> </th>
                  <th scope="col">訂購品項</th>
                  <th scope="col">價格</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in orderProducts" :key="item.id">
                  <th scope="row" class="w-sm-50">
                    <img class="max-width-130 w-100" :src="item.product.imageUrl" alt="">
                  </th>
                  <td>{{item.product.title}}
                    <div class="text-maingreen"> 數量: {{item.qty}} </div>
                  </td>
                  <td>
                    <div class="text-decoration-line-through text-mainred">NT${{ item.product.origin_price }}</div>
                    NT${{ item.product.price }}
                  </td>
                  <td>NT${{ item.final_total }}
                    <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                  </td>
                </tr>
                <!-- <tr>
                  <th scope="row" class="w-sm-50">
                    <img class="max-width-130 w-100" src="../../../assets/images/about/eggImg2.jpg" alt="">
                  </th>
                  <td>有機蛋(40顆裝)
                    <div class="text-maingreen"> 數量: 3 </div>
                  </td>
                  <td>
                    <div class="text-decoration-line-through text-mainred">NT$1000</div>
                    NT$500
                  </td>
                  <td>NT$1500</td>
                </tr> -->

              </tbody>
            </table>
          </div>
          <div class="vstack gap-2 text-end totalInfo">
            <!-- <div class="">總金額: NT$3000</div>
            <div class="text-mainred">
              優惠折抵: NT$2000
            </div> -->
            <div class="fw-bolder">應付金額: NT${{orderData.total}}</div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container my-5">
        <div class="d-flex">
          <div class="p-2 col-md-6">
            <h5>訂購資訊</h5>
            <table class="table border">
              <tbody v-if="orderData.user">
                <tr>
                  <th scope="row">收件人姓名</th>
                  <td>{{orderData.user.name}}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{{orderData.user.email}}</td>
                </tr>
                <tr>
                  <th scope="row">聯絡電話</th>
                  <td>{{orderData.user.tel}}</td>
                </tr>
                <tr>
                  <th scope="row">收件人地址</th>
                  <td>{{orderData.user.address}}</td>
                </tr>
                <tr>
                  <th scope="row">備註</th>
                  <td>{{orderData.message}}</td>
                </tr>


              </tbody>
            </table>
          </div>
          <div class="p-2 col-md-6">
            <h5>付款方式</h5>
            <select class="form-select" aria-label="selectPay">
              <option selected>請選擇付款方式</option>
              <option value="1">貨到付款</option>
              <option value="2">信用卡</option>
              <option value="3">ATM</option>
            </select>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container my-5">
        <div class="hstack gap-3">
          <!-- <div><button type="button" class="btn btn-outline-buttonbg">繼續購物</button></div> -->
          <div class="ms-auto"><button type="button" class="btn btn-buttonbg" @click="orderPay(currentOrderId)">確認結帳</button></div>
        </div>
      </div>
    </section>
  </template>
  <div v-else class="my-5 text-center">
    <h4 class="mb-3">請前往購物</h4>
    <router-link to="/products" class="btn btn-outline-buttonbg">產品專區</router-link>
  </div>
</template>