<script>
import {  mapActions, mapState } from 'pinia';
import adminProductStore from '@/stores/adminProductStore.js';
import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductModal from '@/components/ProductModal.vue';
import DelProductModal from '@/components/DelProductModal.vue';

export default{
  data() {
    return {
      tempProduct:{}
    }
  },
  components:{
    PaginationComponent,
    ProductModal,
    DelProductModal
  },
  computed:{
    ...mapState(adminProductStore,['products', 'pagination', 'isCloseModal']),
  },
  watch:{
    isCloseModal(){
      if(this.isCloseModal === "modal"){
        this.closeModal(this.isCloseModal)
      }
    }
  },
  methods: {
    ...mapActions(adminProductStore,['getPageProducts']),
    //打開modal
    OpenModal(effect, product){
      const productModal = this.$refs.productModal
      const delProductModal = this.$refs.delProductModal
      if(effect === "new"){
        this.tempProduct = { imagesUrl: [] };
        productModal.openModal()
      }else if(effect === "edit"){
        this.tempProduct = {...product}
        productModal.openModal()
      }else if(effect === "del"){
        // console.log(product);
        this.tempProduct = {...product}
          this.$nextTick(() => {
            delProductModal.openAlert()
          });
      }
    },
    //關閉modal
    closeModal(modal) {
      const productMode = this.$refs.productModal
      // const delProductModal = this.$refs.delProductModal
      if (modal === "modal") {
        productMode.hideModal()
      } 
      // else if (modal === "delModal") {
      //   delProductModal.hideModal()
      // }
    },
  },
  mounted() {
    this.getPageProducts()
  },
}

</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <h5>產品管理</h5>
      <button type="button" class="btn btn-outline-adminbtn" @click="OpenModal('new')">
            建立新的產品〸
      </button>
     
    </div>
        <div class="table-responsive-lg">
          <table class="table  align-middle">
            <thead>
              <tr>
                <th scope="col">分類</th>
                <th scope="col">產品名稱</th>
                <th scope="col">原價</th>
                <th scope="col">售價</th>
                <th scope="col">是否啟用</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <th scope="row" class="w-sm-50">
                  {{product.category}}
                </th>
                <td scope="row" class="w-sm-50">
                  <img class="max-width-130 w-100" :src="product.imageUrl" alt=""> 
                  {{product.title}}
                </td>
                <td>
                    NT${{product.origin_price}}
                </td>
                <td>
                    NT${{product.price}}
                </td>
                <td>
                  <span v-if="product.is_enabled" class="text-adminbtn">啟用</span>
                  <span v-else>未啟用</span>
                </td>
                <td class="text-end">
                  <button type="button" class="btn btn-buttonbg me-3" @click="OpenModal('edit',product)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger" @click="OpenModal('del',product)">
                  <i class="bi bi-trash3"></i>
                </button>
                </td>
              </tr>
             
            </tbody>
          </table>
        </div>
        <PaginationComponent :pages="pagination" @emit-pages="getPageProducts"></PaginationComponent>
        <ProductModal ref="productModal" :product="tempProduct" ></ProductModal>
        <DelProductModal ref="delProductModal" :temp-product="tempProduct" @get-products="getPageProducts"  @close-modal="closeModal"  ></DelProductModal>
      
  </div>
</template>