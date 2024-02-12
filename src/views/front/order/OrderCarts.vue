<script>
import {  mapState, mapActions } from 'pinia';
import cartStore from "@/stores/cartStore.js";
import toThousandMixin from '@/mixins/toThousandMixin.js';
import loadingStore from "@/stores/loadingStore.js";
import LoadingAnimation from '@/components/LoadingAnimation.vue'

export default{
  data() {
    return {
      tempCoupon:""
    }
  },
  computed:{
    ...mapState(cartStore,['carts']),
    ...mapState(loadingStore, ['isLoading']),
    countDiscount(){
      return this.toThousands(this.carts.total) - this.toThousands(this.carts.final_total) 
    }
  },
  components:{
    LoadingAnimation
  },
  mixins: [toThousandMixin],
  methods: {
    ...mapActions(cartStore,['getCarts','updateCart','delCart','sentCoupon']),
    copyCoupon(){
      navigator.clipboard.writeText("555");
      alert("已複製")
    }
  },
  mounted(){
    this.getCarts()
  }
}
</script>
<template>
  <VLoading :active="isLoading">
    <LoadingAnimation></LoadingAnimation>
  </VLoading>
  <header>
    <div class="bgImageCover pageBanner d-flex flex-column justify-content-center  align-items-start">
      <div>
        <h2 class="py-3">購物車<span class="text-uppercase">Cart</span>
        </h2>
        <hr class="border border-maincolor border-2 opacity-100">
      </div>
    </div>
  </header>
  <section>
    <div class="container my-6">
      <div class="position-relative m-4 orderProgress">
        <div class="progress" style="height: 2px;">
          <div class="progress-bar" role="progressbar"  aria-valuenow="33" aria-valuemin="0"
            aria-valuemax="100"></div>
        </div>
        <button 
          class="position-absolute top-0 start-0 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0" ><i
            class="bi bi-cart3"></i><span class="text-maingray">購物車 </span></button>
        <button 
          class="position-absolute top-0 start-33 translate-middle btn btn-lg btn-secondarylight rounded-pill py-0"><i
            class="bi bi-pencil"></i><span class="text-maingray">填寫資料</span></button>
        <button 
          class="position-absolute top-0 start-66 translate-middle btn btn-lg btn-secondarylight rounded-pill py-0"><i
            class="bi bi-check-lg"></i><span class="text-maingray">付款方式</span></button>
        <button 
          class="position-absolute top-0 start-100 translate-middle btn btn-lg btn-secondarylight rounded-pill py-0"><i
            class="bi bi-clipboard-check"></i><span class="text-maingray">訂單完成</span></button>
      </div>
    </div>
  </section>
  <section>
    <div class="container mt-5">
      <div class="table-responsive-lg">
        <table class="table  align-middle">
          <thead class="border-top">
            <tr>
              <th scope="col"> </th>
              <th scope="col">商品</th>
              <!-- <th scope="col">數量</th> -->
              <th scope="col">價格</th>
              <!-- <th scope="col">折扣價</th> -->
              <th scope="col">小計</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="carts.carts.length" >
              <tr v-for="item in carts.carts" :key="item.id">
                <th scope="row" class="w-sm-50">
                  <img class="max-width-130 w-100" :src="item.product.imageUrl" :alt="item.product.title">
                </th>
                <td>{{item.product.title}}<br>
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-outline-maingreen" @click="updateCart(item.id, item.product.id, item.qty-1)">-</button>
                  <input
                      min="1"
                      type="number"
                      class="border border-maingreen productQty btn"
                      v-model.number="item.qty"
                      @change="updateCart(item.id, item.product.id, item.qty)"
                    />
                    <button type="button" class="btn btn-outline-maingreen" @click="updateCart(item.id, item.product.id, item.qty+1)">+</button>
                  
                  </div>
                </td>
                <td>
                  <div class="text-decoration-line-through text-mainred">NT${{ item.product.origin_price }}</div>
                  NT${{ item.product.price }}
                  
                </td>
                <td>NT${{toThousands(item.final_total)}}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                </td>
                <td> <button type="button" class="btn btn-outline-mainred" @click="delCart(item.id)"><i class="bi bi-trash3-fill"></i></button></td>
              </tr>
            </template>
            <tr v-else><h3>快去選購商品吧~</h3></tr>
          </tbody>
          <!-- <tfoot>
            <tr>
              <td colspan="6"> </td>
              <td>總金額: $3000</td>
            </tr>
            <tr>
              <td colspan="2">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Recipient's username"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                </div>
              </td>
              <td colspan="4"> </td>
              <td>優惠折抵: $2000</td>
            </tr>
            <tr>
              <td colspan="6"> </td>
              <td>應付金額: $1000</td>
            </tr>
          </tfoot> -->
        </table>
      </div >
      <div class="vstack gap-3 text-end my-4 totalInfo">
        <div class="border-bottom">總金額: ${{toThousands(carts.total)}}</div>
        <div class="hstack">
          <div class="input-group mb-3 w-50 ">
            <input type="text" class="form-control" placeholder="優惠碼" aria-label="coupon" aria-describedby="couponText" v-model="tempCoupon">
            <button class="btn btn-secondary" type="button" id="coupon" @click="sentCoupon(tempCoupon)">輸入優惠券</button>
          </div>
          <div class="ms-auto text-mainred">
            優惠折抵: ${{ countDiscount }}
          </div>
        </div>
        <button type="button" class="btn btn-link w-fit" @click="copyCoupon">優惠券代碼:555 (點擊即可複製)</button>
        <div class="fw-bolder">應付金額: ${{toThousands(carts.final_total)}}</div>
      </div>
    </div>
  </section>
  <section>
    <div class="container my-5">
      <div class="hstack gap-3">
        <div><router-link to="/products" class="btn btn-outline-buttonbg">繼續購物</router-link></div>
        <div class="ms-auto"><router-link to="/order/subscriber" class="btn btn-buttonbg">下一步</router-link></div>
      </div>
    </div>
  </section>
</template>