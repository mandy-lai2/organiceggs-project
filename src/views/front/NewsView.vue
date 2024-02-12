<script>
import NewsModal from '@/components/NewsModal.vue'
// import { mapState } from 'pinia';
// import loadingStore from "../../stores/loadingStore.js";
import LoadingAnimation from '../../components/LoadingAnimation.vue'

const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  data() {
    return {
      news:[],
      tempNew:'',
      isLoading:false
    }
  },
  components:{
    NewsModal,
    LoadingAnimation
  },
  methods:{
    getNews(){
      this.isLoading = true
      console.log(this.isLoading);
      this.$http.get(`${VITE_API}/api/${VITE_APIPATH}/articles`)
      .then((res)=>{
        this.news = res.data.articles
        // console.log(this.news);
        this.isLoading = false
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
    },
    //打開
    OpenModal(id){
     const newsModal = this.$refs.newsModal
     this.tempNew = id
     newsModal.openModal()
    },
    
  },
  mounted() {
    this.getNews()
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
        <h2 class="py-3">最新消息<span class="text-uppercase">News</span>
        </h2>
        <hr class="border border-maincolor border-2 opacity-100">
      </div>
    </div>
  </header>
  <section>
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6" v-for="item in news" :key="item.id">
          <div class="card mb-3 newsCard" @click="OpenModal(item.id)">
            <div class="row g-0">
              <div class="col-4 align-self-center">
                <img :src="item.imageUrl" class="img-fluid object-cover rounded-start"
                  :alt="item.title">
              </div>
              <div class="col-8">
                <div class="card-body">
                  <small>{{item.create_at}}</small>
                  <h5 class="card-title">{{item.title}}</h5>
                  <p class="card-text">{{ item.description }}</p>
                  <button type="button" class="btn btn-buttonbg">看更多</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NewsModal ref="newsModal" :new-id="tempNew"></NewsModal>



      <!-- <div class="col-6">
          <button class="nav-link" id="v-pills-profile2-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile2" type="button" role="tab" aria-controls="v-pills-profile2">
              <div class="card bg-transparent">
                <div class="row">
                  <div class="col-6">
                    <img src="../../assets/images/products/testEgg3.jpg" class="img-fluid rounded-start" alt="最新消息2">
                  </div>
                  <div class="col-6">
                    <div class="card-body">
                        <small>2023/3/10</small>
                      <h5 class="card-title">歡慶新開幕!</h5>
                      <p class="card-text">歡慶新開幕，指定商品7折優惠，單次訂購滿2,000，享免運費！</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
        </div> -->
      <!-- <div class="col">
          <div class="tab-content" id="v-pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
              <div class="card mb-3">
                <img src="../../assets/images/products/testEgg1.jpg" class="card-img-top">
                <div class="card-body">
                  <p class="card-text"><small>2023/3/10</small></p>
                  <h5 class="card-title">歡慶新開幕!</h5>
                  <p class="card-text">歡慶新開幕，指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！</p>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
              <div class="card mb-3">
                <img src="../../assets/images/products/testEgg2.jpg" class="card-img-top">
                <div class="card-body">
                  <p class="card-text"><small>2023/3/10</small></p>
                  <h5 class="card-title">歡慶新開幕!</h5>
                  <p class="card-text">歡慶新開幕，指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！</p>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="v-pills-profile2" role="tabpanel" aria-labelledby="v-pills-profile2-tab" tabindex="0">
              <div class="card mb-3">
                <img src="../../assets/images/products/testEgg3.jpg" class="card-img-top">
                <div class="card-body">
                    <p class="card-text"><small>2023/3/10</small></p>
                    <h5 class="card-title">歡慶新開幕!</h5>
                    <p class="card-text">歡慶新開幕，指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！指定商品7折優惠，單次訂購滿2,000，享免運費！</p>
                  </div>
                </div>
              </div>
            </div>

          </div> -->
      </div>

    </div>
  </section>
</template>