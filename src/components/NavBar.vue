<script>
import {  mapState } from 'pinia';
import cartStore from "@/stores/cartStore.js";
import productStore from "@/stores/productStore.js";
import { Offcanvas } from 'bootstrap';
export default {
  data() {
    return {
      bsOffcanvas:'',
      cartsNum:0
    }
  },
  computed:{
    ...mapState(cartStore,['carts']),
    ...mapState(productStore,['likeProductsNum']),
  },
  watch:{
    carts(){
      this.cartsNum = this.carts.carts.length
      // console.log(this.cartsNum);
    }
  },
  methods: {
    navbarHide(){
      this.bsOffcanvas.hide()
    }
  },
  mounted() {
    this.bsOffcanvas = new Offcanvas('#offNavbar')
    
  },
}
</script>
<template>
  <nav class="navbar navbar-expand-lg fixed-top">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand position-relative" >
          <img class="max-width-130 w-75" src="../assets/images/logo.png" alt="ORGANIC EGGS">
          <div class="light"></div>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offNavbar"
          aria-controls="offNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offNavbar" aria-labelledby="offNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offNavbarLabel"> </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item" @click="navbarHide()">
                <router-link to="/" class="nav-link"  aria-current="page">首頁</router-link>
              </li>
              <li class="nav-item" @click="navbarHide()">
                <router-link to="/news" class="nav-link" >最新消息</router-link>
              </li>
              <li class="nav-item" @click="navbarHide()">
                <router-link to="/products" class="nav-link" >產品專區</router-link>
              </li>
              <li class="nav-item" @click="navbarHide()">
                <router-link to="/qa" class="nav-link" >知識&QA</router-link>
              </li>
              <li class="nav-item" @click="navbarHide()">
                <router-link to="/order/carts" class="nav-link" data-bs-toggle="tooltip" data-bs-placement="bottom"
                  data-bs-title="購物車"><i class="bi bi-cart-fill position-relative">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {{ cartsNum }}</span>
                  </i>
                </router-link>
              </li>
              <li class="nav-item" @click="navbarHide()">
                <router-link to="/like" class="nav-link" data-bs-toggle="tooltip" data-bs-placement="bottom" title="最愛">
                  <i class="bi bi-heart-fill position-relative">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {{likeProductsNum}}</span>
                  </i></router-link>
              </li>

            </ul>
            <!-- <form class="d-flex mt-3" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form> -->
          </div>
        </div>
      </div>
    </nav>
</template>
<style lang="scss" scoped>
</style>