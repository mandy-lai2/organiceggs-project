<script>
import {  mapActions } from 'pinia';
import adminNewStore from '@/stores/adminNewStore.js';
import Swal from 'sweetalert2'

export default {
  // props: {
  //   tempCoupon: {
  //     type: Object,
  //     default() { return {}; },
  //   },
  // },
  data() {
    return {
      swalWithBootstrapButtons: null
    }
  },
  methods: {
    ...mapActions(adminNewStore,['delNew']),
    
    //打開alert
    openAlert(article){
      this.swalWithBootstrapButtons.fire({
        title: '您確定刪除?',
        text: `${article.title}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '刪除',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.delNew(this, article.id)
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
  <div></div>
</template>