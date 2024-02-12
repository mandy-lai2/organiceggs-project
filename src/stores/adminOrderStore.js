import { defineStore } from 'pinia'
import axios from 'axios';
const { VITE_API, VITE_APIPATH } = import.meta.env
import loadingStore from './loadingStore'
const loading = loadingStore()

export default defineStore('adminOrderStore',{

state: () => {
  return {
    orders: [],
    pagination:{},
    isCloseModal: "",
  };
},
actions:{
   // get訂單
   getOrders(page = 1) {
    loading.isLoading = true
    axios
    .get(`${VITE_API}/api/${VITE_APIPATH}/admin/orders?page=${page}`)
    .then((res) => {
          const { pagination, orders } = res.data;
          this.orders = orders;
          this.pagination = pagination
          // console.log(this.orders, this.pagination);
          loading.isLoading = false
        })
        .catch((error) => {
          alert(error.response.data.message);
          loading.isLoading = false
        });
  },
  // 更新訂單
  updateOrder(order){
    loading.isLoading = true
    this.isCloseModal= ""
    axios
      .put(`${VITE_API}/api/${VITE_APIPATH}/admin/order/${order.id}`,{data:order})
      .then((res) => {
        alert(res.data.message);
        this.getOrders()
        // this.closeModal('modal')
        this.isCloseModal= "modal"
        loading.isLoading = false
      })
      .catch((error) => {
        alert(error.response.data.message);
        loading.isLoading = false
      });
  },
  // 刪除商品 
  delOrder(delModal, id) {
    axios
      .delete(
        `${VITE_API}/api/${VITE_APIPATH}/admin/order/${id}`
      )
      .then((res) => {
        // this.$emit("getOrders");
        this.getOrders()
        delModal.swalWithBootstrapButtons.fire(
          '成功刪除',
          `${res.data.message}`,
          'success'
        )
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  },

},
})