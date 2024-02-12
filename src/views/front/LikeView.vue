<script>
import { mapState, mapActions } from 'pinia';
import productStore from "../../stores/productStore.js";
import cartStore from "../../stores/cartStore.js";
import loadingStore from "../../stores/loadingStore.js";
import LoadingAnimation from '../../components/LoadingAnimation.vue'

export default{
  data() {
    return {
    }
  },
  computed:{
    ...mapState(productStore,['likeProducts']),
    ...mapState(loadingStore, ['isLoading'])
  },
  components:{
    LoadingAnimation
  },
  methods: {
    ...mapActions(productStore,['getLikeProduct','delLikeProduct']),
    ...mapActions(cartStore,['addCart']),
  },
  mounted() {
    // this.getLikeProduct()
  }
}
</script>
<template>
  <VLoading :active="isLoading">
    <LoadingAnimation></LoadingAnimation>
  </VLoading>
  <!-- <header>
    <div class="bgImageCover pageBanner d-flex flex-column justify-content-center  align-items-start">
      <div>
        <h2 class="py-3">我的最愛<span class="text-uppercase">like</span>
        </h2>
        <hr class="border border-maincolor border-2 opacity-100">
      </div>
    </div>
  </header> -->
  <section>
    <div class="container my-6">
      <h3>我的最愛</h3>
      <div class="row py-4 row-cols-2 row-cols-md-3 g-4">
        <div class="col" v-for="product in likeProducts" :key="product.id">
          <div class="card">
            <router-link :to="`/product/${product.id}`">
              <img :src="product.imageUrl" class="card-img-top" :alt="product.title">
            </router-link>
            <div class="card-body">
              <router-link :to="`/product/${product.id}`"  class="text-decoration-none link-dark">
              <h5 class="card-title text-start">{{ product.title }}</h5>
              <p class="card-text text-end text-mainred">
                <span class="text-decoration-line-through text-decoration-line-through text-secondary">
                  原價 ${{ product.origin_price }}元</span>
                <br>優惠價 ${{ product.price }}元
              </p>
            </router-link>
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-maingreen" @click="delLikeProduct(product.id)">刪除最愛</button>
                <button type="button" class="btn btn-buttonbg" @click="addCart(product.id)"><i class="bi bi-cart"></i> 加入購物車</button>

              </div>
            </div>
          </div>
        </div>
        
        
      </div>
      
    </div>
  </section>
</template>