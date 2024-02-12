import { defineStore } from 'pinia'
import axios from 'axios';
import router from '../router'
const { VITE_API, VITE_APIPATH } = import.meta.env
import loadingStore from './loadingStore'
const loading = loadingStore()
import Swal from 'sweetalert2'

export default defineStore('cartStore',{
state: () => {
  return {
    carts:{}
  };
},
actions:{
  //加入購物車
  addCart (id, qty = 1, isCarts = "") {
    loading.isLoading = true
    const data = {
      product_id: id,
      qty
    }
    axios
      .post(`${VITE_API}/api/${VITE_APIPATH}/cart`, { data })
      .then((res) => {
        // alert(res.data.message)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1800
        })
        this.getCarts()
        if(isCarts === 'toCarts'){
          this.pushCarts()
        }
        loading.isLoading = false
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  },
  pushCarts(){
    router.push({ path: '/order/carts' })
  },
  //get購物車
  getCarts(){
    loading.isLoading = true
    axios
      .get(`${VITE_API}/api/${VITE_APIPATH}/cart`)
      .then((res) => {
        this.carts = res.data.data
        // console.log('購物車:',this.carts);
        loading.isLoading = false
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  },
  //更新購物車
  updateCart(id, productId, qty){
    if (qty < 1) qty = 1
    loading.isLoading = true
    const data = {
      product_id: productId,
      qty
    }
    axios
      .put(`${VITE_API}/api/${VITE_APIPATH}/cart/${id}`, { data })
      .then((res) => {
        // console.log(res.data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.getCarts()
        loading.isLoading = false
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  },
  //刪除購物車
  delCart(id){
    loading.isLoading = true
    axios
      .delete(`${VITE_API}/api/${VITE_APIPATH}/cart/${id}`)
      .then((res) => {
        // console.log('刪除購物車:',res.data);
        // alert(res.data.message)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.getCarts()
        loading.isLoading = false
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  },
  //輸入優惠券
  sentCoupon(coupon){
    loading.isLoading = true
    const data = {
      "code": coupon
    }
    axios
      .post(`${VITE_API}/api/${VITE_APIPATH}/coupon`, { data })
      .then((res) => {
        // alert(res.data.message)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.getCarts()
        loading.isLoading = false
      })
      .catch((err) => {
        alert(err.response.data.message)
      })

  }

},
getters:{
  // sortProducts:({products})=>{
  //   return products.sort((a,b)=> a.price - b.price);
  // }
}
})