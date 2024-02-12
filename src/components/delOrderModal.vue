<script>
import Swal from 'sweetalert2'
import {  mapActions } from 'pinia';
import adminOrderStore from '@/stores/adminOrderStore.js';

export default {
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      swalWithBootstrapButtons: null
    }
  },
  methods: {
    ...mapActions(adminOrderStore,['delOrder']),
    //打開alert
    openAlert(){
      this.swalWithBootstrapButtons.fire({
        title: '您確定刪除?',
        text: `${this.order.id}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '刪除',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.delOrder(this, this.order.id)
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
        <!-- <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="delCheckModalLabel">刪除訂單</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              是否刪除
              <span class="text-danger">
                {{ order.id }}
              </span>
               訂單(刪除後將無法恢復)
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
                @click="delOrder"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div> -->
  </div>
</template>
