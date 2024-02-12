<script>
// import modalMixin from '@/mixins/modalMixin.js'
// const { VITE_API, VITE_APIPATH } = import.meta.env
import {  mapActions } from 'pinia';
import adminProductStore from '@/stores/adminProductStore.js';
import Swal from 'sweetalert2'

export default {
  props: {
    tempProduct: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      swalWithBootstrapButtons: null
    }
  },
  // mixins:[modalMixin], 
  methods: {
    ...mapActions(adminProductStore,['delProduct']),
    // 刪除商品
    // delProduct() {
    //   this.$http
    //     .delete(
    //       `${VITE_API}/api/${VITE_APIPATH}/admin/product/${this.tempProduct.id}`
    //     )
    //     .then((res) => {
    //       // delCheckModal.hide();
    //       this.swalWithBootstrapButtons.fire(
    //         '成功刪除',
    //         `${res.data.message}`,
    //         'success'
    //       )
    //       this.$emit("getProducts");
    //       this.$emit("closeModal", "delModal");
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     });
    // },
    
    //打開alert
    openAlert(){
      this.swalWithBootstrapButtons.fire({
        title: '您確定刪除?',
        text: `${this.tempProduct.title}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '刪除',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.delProduct(this, this.tempProduct.id)
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.swalWithBootstrapButtons.fire(
            '未刪除',
            ' ',
            'error'
          )
        }
      })
    }

  },
  mounted() {
     this.swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success mx-2',
          cancelButton: 'btn btn-danger mx-2'
        },
        buttonsStyling: false
      })
  },
};

</script>

<template>
  <!-- 刪除確認Modal -->
  <div class="modal fade" id="delCheckModal" tabindex="-1" aria-labelledby="delCheckModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-xl">
          <!-- <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="delCheckModalLabel">刪除產品確認</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              是否刪除
              <b class="text-mainred"> {{tempProduct.title}} </b> 商品 (刪除後將無法恢復)
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="delProduct"
              >
                確認刪除
              </button>
            </div>
          </div> -->
        </div>
      </div>
</template>