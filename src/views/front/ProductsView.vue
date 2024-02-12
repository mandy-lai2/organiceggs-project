<script>
import { mapState, mapActions } from 'pinia';
import productStore from "../../stores/productStore.js";
import cartStore from "../../stores/cartStore.js";
import loadingStore from "../../stores/loadingStore.js";
import LoadingAnimation from '../../components/LoadingAnimation.vue'

export default {
  data() {
    return {
      categorys: {
        '全部商品': ""
      },
      currentCategory: "全部商品",
      
    }
  },
  computed: {
    ...mapState(productStore, ['products']),
    ...mapState(loadingStore, ['isLoading'])
  },
  watch: {
    products() {
      this.getCategorys()
    }
  },
  components:{
    LoadingAnimation
  },
  methods: {
    ...mapActions(productStore, ['getProducts', 'addLikeProduct']),
    ...mapActions(cartStore, ['addCart']),
    getCategorys() {
      this.products.forEach((item) => {
        if (!this.categorys[item.category]) {
          this.categorys[item.category] = 1
        } else {
          this.categorys[item.category] += 1
        }
      })
    },
    //選擇分類按鈕
    selectCategory(category) {
      this.currentCategory = category
    }
  },
  mounted() {
    this.getProducts()
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
        <h2 class="py-3">產品專區<span class="text-uppercase">Products</span>
        </h2>
        <hr class="border border-maincolor border-2 opacity-100">
      </div>
    </div>
  </header>
  <section>
    <div class="container mb-5">
      <div class="d-flex mt-5 mb-2 productsCategory">
        <button v-for="(category, idx) in Object.keys(categorys)" :key="idx" type="button"
          class="btn btn-outline-buttonbg" :class="{ 'active': category == currentCategory }"
          @click="selectCategory(category)">{{ category }}<span v-show="category !== '全部商品'">{{ `(${categorys[category]})`
          }}</span></button>
      </div>

      <div class="row py-4 row-cols-2 row-cols-md-3 g-4">
        <div class="col" v-for="product in products" :key="product.id"
          :class="{ 'd-none': product.category !== currentCategory && currentCategory !== '全部商品' }">
          <div class="card">
            <router-link :to="`/product/${product.id}`">
              <img :src="product.imageUrl" class="card-img-top" :alt="product.title">
            </router-link>
            <div class="card-body">
              <router-link :to="`/product/${product.id}`" class="text-decoration-none link-dark">
                <h5 class="card-title text-start">{{ product.title }}</h5>
                <p class="card-text text-end text-mainred">
                  <span class="text-decoration-line-through text-decoration-line-through text-secondary">
                    原價 ${{ product.origin_price }}元</span>
                  <br>優惠價 ${{ product.price }}元
                </p>
              </router-link>
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-outline-maingreen" @click="addLikeProduct(product.id)"><i
                    class="bi bi-heart-fill"></i> 加入最愛</button>
                <button type="button" class="btn btn-buttonbg" @click="addCart(product.id)"><i class="bi bi-cart"></i>
                  加入購物車</button>

              </div>
            </div>
          </div>

        </div>

      </div>
      <!-- <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center mb-5">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item active"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav> -->
  </div>
</section></template>