<script>
import { mapState, mapActions } from 'pinia';
import productStore from "@/stores/productStore.js";
import cartStore from "@/stores/cartStore.js";
import loadingStore from "../../stores/loadingStore.js";
import LoadingAnimation from '../../components/LoadingAnimation.vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper';

export default {
  data() {
    return {
      currentId:"",
      qty:1,
      modules: [Pagination, Navigation],
    }
  },
  computed:{
    ...mapState(productStore,['tempProduct', 'categoryProducts']),
    ...mapState(loadingStore, ['isLoading'])
  },
  components: {
    Swiper,
    SwiperSlide,
    LoadingAnimation
  },
  watch:{
    qty(){
      if(this.qty<1) this.qty=1
    }
  },
  methods: {
    ...mapActions(productStore,['getProduct', 'addLikeProduct']),
    ...mapActions(cartStore,['addCart']),
    qtyCount(state){
      if(state === 'add'){
        this.qty+=1
      }else if(state === 'subtract' && this.qty>1){
        this.qty-=1
      }
    },

  },
  mounted() {
    this.currentId = this.$route.params.id
    this.getProduct(this.currentId)
    
  },
}
</script>
<template>
  <VLoading :active="isLoading">
    <LoadingAnimation></LoadingAnimation>
  </VLoading>
  <section>
    <div class="container mt-7 mb-5">
      <div class="row">
        <div class="col-md-6 mb-5">
          <img :src="tempProduct.imageUrl" class="img-fluid" alt="">
        </div>
        <div class="col-md-6">
          <div class="vstack gap-3">
            <div>
              <div class="bg-maingray text-white rounded-pill d-inline-block px-2">{{tempProduct.category}}</div>
              <button type="button" class="btn btn-outline-maingreen float-end" @click="addLikeProduct(tempProduct.id)"><i class="bi bi-heart-fill"></i> 加入最愛</button>
            </div>
            <h5 class="">{{tempProduct.title}}</h5>
            <div class="">{{tempProduct.description}}</div>
            <div>付款方式：信用卡、ATM、貨到付款</div>
            <div>運 費：常溫配送免運費</div>
            <div class="hstack justify-content-between flex-column flex-sm-row align-items-end">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-maingreen" @click="qtyCount('subtract')">-</button>
                <input
                    min="1"
                    type="number"
                    class="border border-maingreen productQty btn"
                    v-model.number="qty"
                  />
                <!-- <button type="button" class="btn btn-outline-primary">5</button> -->
                <button type="button" class="btn btn-outline-maingreen" @click="qtyCount('add')">+</button>
              </div>
              <p class="card-text text-end text-mainred">
                <span class="text-decoration-line-through text-decoration-line-through text-secondary">
                  原價 ${{tempProduct.origin_price}}元/ {{ tempProduct.unit }}</span>
                <br>優惠價 ${{tempProduct.price}}元/ {{ tempProduct.unit }}
              </p>
            </div>
            <div class="hstack justify-content-end gap-3">
              <button type="button" class="btn btn-buttonbg" @click="addCart(tempProduct.id, qty)"><i class="bi bi-cart"></i> 加入購物車</button>
              <button type="button" class="btn btn-buttonbg" @click="addCart(tempProduct.id, qty, 'toCarts')"><i class="bi bi-bag"></i> 立即購買</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container my-5">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button"
            role="tab" aria-controls="home-tab-pane" aria-selected="true">商品介紹</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button"
            role="tab" aria-controls="profile-tab-pane" aria-selected="false">詳細規格</button>
        </li>

      </ul>

      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <p class="p-4">
            {{ tempProduct.content }}
            <!-- 食用台灣在地有機驗證雜糧蔬菜等，以無藥、無抗生素、有機飼養方式，於每一寸有機農田裡，孕育出甜心有機雞蛋。雞蛋口感吃起來就是香Q濃郁，沒有腥味，吃得美味，吃得安心。有機土雞蛋或有大小顆、顏色或有深淺。整盒秤足重，恕不接受選色。因夏季天氣炎熱，為顧及品質，將改為冷藏配送。<br>
            食用80%以上有機穀物、蔬果<br>
            零施藥、添加物<br>
            不剪喙、不關籠<br>
            無使用疫苗 -->
          </p>
        </div>
        <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
          <p class="p-4">
            {{ tempProduct.specification }}<br>
            成份：放牧土雞蛋<br>
            安全證明：SGS 檢驗合格<br>
            出貨時間：此商品為有機農場雞隻自由放牧下蛋，出貨時間較不固定，訂購後約５～７個工作天。<br>
            保存期限：冷藏期限約為30天（常溫7天）。<br>
            保存方法：收到雞蛋請立即放入冰箱冷藏，以維持鮮度，讓口感保持在最佳狀態<br>
            注意事項：<br>
            1.有機土雞蛋或有大小顆、顏色或有深淺。每盒含盒及包裝535公克以上，且每盒重量經秤重略一致<br>
            2.因雞蛋較脆弱，我們已於包裝時增加防撞措施，並於箱外貼上易碎貼紙提醒物流司機。若到貨後仍出現破損，請立即拍照並回傳至官方Line。
          </p>
        </div>

      </div>
    </div>
  </section>
  <section>
    <div class="container my-5">
      <hr>
      <h5>您可能也喜歡~</h5>
      <div>
      <swiper :slidesPerView="1" :spaceBetween="10" :pagination="{
        clickable: true,}" :breakpoints="{
  '640': {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  '768': {
    slidesPerView: 3,
    spaceBetween: 40,
  },}" :navigation="true" :modules="modules" class="mySwiper pb-4">
        <swiper-slide v-for="product in categoryProducts" :key="product.id">
          <div class="card">
            <img :src="product.imageUrl" class="card-img-top" :alt="product.title">
            <div class="card-body">
              <h5 class="card-title text-start">{{ product.title }}</h5>
              <p class="card-text text-end text-mainred">
                <span class="text-decoration-line-through text-decoration-line-through text-secondary">
                  原價 ${{ product.origin_price }}元</span>
                <br>優惠價 ${{ product.price }}元
              </p>
                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-outline-maingreen" @click="addLikeProduct(product.id)"><i class="bi bi-heart-fill"></i> 加入最愛</button>
                  <button type="button" class="btn btn-buttonbg" @click="addCart(product.id)"><i class="bi bi-cart"></i> 加入購物車</button>

              </div>
            </div>
          </div>
        </swiper-slide>
        </swiper>
      </div>

      <!-- <div class="row py-4 row-cols-2 row-cols-md-3 g-4">
        <div class="col">
          <div class="card">
            <img src="../../assets/images/products/testEgg1.jpg" class="card-img-top" alt="有機雞蛋">
            <div class="card-body">
              <h5 class="card-title text-start">有機蛋(40顆裝)</h5>
              <p class="card-text text-end text-mainred">
                <span class="text-decoration-line-through text-decoration-line-through text-secondary">
                  原價 $1200元</span>
                <br>優惠價 $1000元
              </p>
              <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-outline-maingreen"><i class="bi bi-heart-fill"></i> 加入最愛</a>
                <a href="#" class="btn btn-buttonbg"><i class="bi bi-cart"></i> 加入購物車</a>

              </div>
            </div>
          </div>
        </div>

      </div> -->
    </div>
  </section>
</template>