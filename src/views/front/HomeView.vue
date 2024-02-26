<script>
// const { VITE_API, VITE_APIPATH } = import.meta.env
import { mapState, mapActions } from 'pinia';
import productStore from "../../stores/productStore.js";
import cartStore from "../../stores/cartStore.js";
import loadingStore from "../../stores/loadingStore.js";
// import LoadingAnimation from '../../components/LoadingAnimation.vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper';

export default {
  data() {
    return {
      modules: [Pagination, Navigation],
      hotProducts: [],
      isAos: true
    }
  },
  computed:{
    ...mapState(productStore,['products']),
    ...mapState(loadingStore, ['isLoading'])
  },
  components: {
    Swiper,
    SwiperSlide,
    // LoadingAnimation
  },
  watch:{
    products(){
      this.filterHotProducts()
    }
  },
  methods: {
    ...mapActions(productStore,['getProducts', 'addLikeProduct','getLikeProduct']),
    ...mapActions(cartStore,['addCart','getCarts']),
    //window.scrollBy() 滾動指定的距離，window.scroll() 滾動至文檔中的絕對位置。
    //往下滾
    scrollDown() {
      window.scrollBy({
        top: window.innerHeight - window.pageYOffset,
        behavior: 'smooth',
      });
    },
    //篩選hot產品
    filterHotProducts() {
      this.hotProducts = this.products.filter((item) => {
        return item.is_hot
      })
      console.log(this.hotProducts);
    },
  },
  mounted() {
    this.getProducts()
    this.getCarts()
    this.getLikeProduct()
  }
}
</script>
<template>
  <!-- <VLoading :active="isLoading">
    <LoadingAnimation></LoadingAnimation>
  </VLoading> -->
  <header>
    <main class="bgImageCover">
      <div class="container">
        <div class="text-end">
          <h1>新鮮有機，健康雞蛋</h1>
          <router-link to="/products" class="btn btn-outline-buttonbg">立即購買</router-link>
        </div>
        <div>
          <img class="w-50" src="../../assets/images/main_egg.png" alt="" data-aos="fade-down-left"
            data-aos-anchor-placement="bottom-bottom" data-aos-duration="2500">
        </div>
        <button type="button"
          class="btn btn-link text-maingray position-absolute bottom-0 start-50 translate-middle-x text-center text-decoration-none"
          @click="scrollDown()">
          往下滑<br><i class="bi bi-arrow-down-short instructDown"></i>
        </button>
      </div>
    </main>
  </header>
  <section>
    <div class="container py-4 my-3">
      <div class="row">
        <div class="col-4">
          <div class="guaranteeCircle  bg-mainbg d-flex flex-column justify-content-center align-items-center m-auto">
            <img src="../../assets/images/guaranteeIcon1.png" alt="">
            <h5>用心養</h5>
            <p>有機飼養</p>
          </div>
        </div>
        <div class="col-4">
        <div class="guaranteeCircle  bg-mainbg d-flex flex-column justify-content-center align-items-center m-auto">
          <img src="../../assets/images/guaranteeIcon2.png" alt="">
          <h5>安心買</h5>
          <p>無抗生素</p>
        </div>
      </div>
      <div class="col-4">
        <div class="guaranteeCircle  bg-mainbg d-flex flex-column justify-content-center align-items-center m-auto">
          <img src="../../assets/images/guaranteeIcon3.png" alt="">
          <h5>放心吃</h5>
          <p>SGS認證</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="newsBg bgImageCover">
  <div class="container text-center py-4 my-3">
    <h3 class="my-3"><span class="border-bottom border-white border-3">最新消息</span></h3>
    <div class="border border-white border-3 bg-white bg-opacity-75 p-5 mb-3">
      2023/3/10 <br>
      <h5>歡慶新開幕!</h5>
      <p>歡慶新開幕，商品7折優惠，單次訂購滿2,000，享免運費！</p>
      <router-link to="/news" class="btn btn-buttonbg">→ 看更多</router-link>
    </div>
  </div>
</section>
<section>
  <div class="container text-center py-4 my-3">
    <h3 class="my-3"><span class="border-bottom border-3 border-maingray">人氣商品</span></h3>
    <div>
      <swiper :slidesPerView="1" :spaceBetween="10" :pagination="{
        clickable: true,      }" :breakpoints="{
        '640': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 3,
          spaceBetween: 40,
        },}" :navigation="true" :modules="modules" class="mySwiper pb-4">
        <swiper-slide v-for="product in hotProducts" :key="product.id">
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
        <!-- <swiper-slide>
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
        </swiper-slide>
        -->
        </swiper>
      </div>

     
    </div>
  </section>
  <section>
    <div class="container py-4 my-3">
      <div class="row row-cols-1 row-cols-md-2 my-4">
        <div class="col text-center" data-aos="fade-right" >  
          <img class="img-thumbnail mw-75" src="../../assets/images/about/eggImg1.jpg">
        </div>
        <div class="col col-lg-5 d-flex align-items-center my-3 my-md-0" data-aos="fade-left">
          「有機下蛋」來自台東鹿野鄉，自家畜牧場的雞蛋，從飼養、生產、包裝、皆不假他人之手，我們時刻注意品質。用友善飼養生產雞蛋，不催生，讓母雞產出最天然的產物。蛋黃、蛋白、蛋清三層分明，味道和口感都與一般雞蛋不同，每顆雞蛋口感扎實，風味佳，無蛋腥味，受到許多不敢吃蛋的消費者青睞。
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-2 my-4">
        <div class="col text-center order-md-1" data-aos="fade-left"><img class="img-thumbnail mw-75"
            src="../../assets/images/about/eggImg2.jpg"></div>
        <div class="col col-lg-5 d-flex align-items-center my-3 my-md-0" data-aos="fade-right">
          不僅要注重居住環境，在飼料方面，就連養雞所使用的飼料也必須嚴謹看待。根據有機畜牧標準法規，飼料必須含有至少80％的有機成分。為了達到這項標準，我們使用有機蔬菜、有機玉米和有機黃豆來自製飼料，為了製作出美味且營養豐富的有機飼料，我們還持續進行飼料粗細的調整與改良。
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-2 my-4">
        <div class="col text-center" data-aos="fade-right"><img class="img-thumbnail mw-75"
            src="../../assets/images/about/eggImg3.jpg"></div>
        <div class="col col-lg-5 d-flex align-items-center my-3 my-md-0" data-aos="fade-left">
          在環境方面，我們提供給母雞一個舒適的居住環境，讓牠們生活在日光充足的森林區，並採用低密度飼養方式，符合動物福利標準。我們為母雞提供舒適的巢箱和棲架，並24小時不間斷地提供飲食和飲水。使用符合歐盟動物福利標準的自動化設備，讓收集雞蛋變得更加安全和衛生。
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-2 my-4">
        <div class="col text-center order-md-1" data-aos="fade-left"><img class="img-thumbnail mw-75"
            src="../../assets/images/about/eggImg4.jpg"></div>
        <div class="col col-lg-5 d-flex align-items-center my-3 my-md-0" data-aos="fade-right">
          在檢驗方面，我們嚴格篩選每一隻母雞，並使用天然穀物飼料，無抗生素、無動物用藥，通過HACCP檢驗，符合國家標準。進一步進行SGS檢驗，項目包括「動物用藥分析48項」、「抗生素及其代謝物殘留」、「芬普尼」，均顯示為「未檢出」，讓您安心食用。
        </div>
      </div>

    </div>
  </section>
</template>
<style lang="scss" scoped>
// 未確認???
html:not(.no-js) [data-aos^=fade][data-aos^=fade]{
  @media (max-width: 860px) {
    transform: none;
  }
}
</style>
