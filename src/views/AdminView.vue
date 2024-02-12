<script>
import { Offcanvas,Tooltip } from 'bootstrap';
import { mapState } from 'pinia';
import loadingStore from '@/stores/loadingStore.js';
import LoadingAnimation from '@/components/LoadingAnimation.vue'
const { VITE_API } = import.meta.env
export default {
  data() {
    return {
      isOpen:true
    }
  },
  computed: {
    ...mapState(loadingStore, ['isLoading'])
  },
  components:{
    LoadingAnimation
  },
  methods: {
    navOpen(){
      this.isOpen = !this.isOpen
    },
    checkUser () {
      this.$http
        .post(`${VITE_API}/api/user/check`)
        .then(() => {
        })
        .catch((error) => {
          if (!error.response.data.success) {
            alert("checkUser錯誤")
            this.$router.push('/login')
          }
        })
    },
    logout () {
      document.cookie = `userToken=; expires=${new Date()};`
      this.$router.push('/login')
    }
  },
  mounted() {
    const adminNavbar = new Offcanvas(this.$refs.adminNavbar);
    adminNavbar.show();
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
  },
  created () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    this.$http.defaults.headers.common.Authorization = token
    this.checkUser()
  }

}
</script>
<template>
  <VLoading :active="isLoading">
    <LoadingAnimation></LoadingAnimation>
  </VLoading>
  <div class="adminNav">
    <nav class="navbar py-0">
      <div class="container-fluid">
        <!-- <a class="navbar-brand" href="#">Offcanvas navbar</a> -->
        <div class="offcanvas offcanvas-start text-nowrap" data-bs-scroll="true"  data-bs-backdrop="false" tabindex="-1" id="adminNavbar" aria-labelledby="adminNavbarLabel" ref="adminNavbar">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel"><i class="bi bi-tools me-2"></i>後台</h5>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> -->
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/admin/products" class="nav-link"><i class="bi bi-boxes me-2"></i><span>產品管理</span></router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/orders" class="nav-link" ><i class="bi bi-clipboard-data me-2"></i>訂單管理</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/coupons" class="nav-link" ><i class="bi bi-ticket-perforated me-2"></i>優惠券管理</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/admin/news" class="nav-link" ><i class="bi bi-megaphone me-2"></i>最新消息管理</router-link>
              </li>
              <li class="nav-item">
                <a type="button" class="nav-link" @click.prevent="logout"><i class="bi bi-box-arrow-in-left me-2"></i>登出</a>
              </li>

            </ul>

          </div>
        </div>
      </div>
    </nav>
  </div>
  <div class="bg-secondary bg-opacity-10">
    <div class="container-fluid adminRight"  :class="{'navOpen': isOpen}">
      <div class="navBtn sticky-top">
        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#adminNavbar"
                aria-controls="adminNavbar" aria-label="Toggle navigation" @click="navOpen">
                <i class="bi bi-list"></i>
        </button>
      </div>
      <div class="container">
        <div class="mt-2 admincontent">
          <router-view></router-view>
        </div>

      </div>
      <!-- <div class="py-5"> </div> -->
      <footer class="text-center py-3 mt-5">
        本網站僅供個人作品使用，無任何商業用途<br>
    Copyright © 2023 xxxx
      </footer>
    </div>
  </div>
</template>

<style></style>
