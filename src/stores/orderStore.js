import { defineStore } from 'pinia'
import axios from 'axios';
import router from '../router'
const { VITE_API, VITE_APIPATH } = import.meta.env
import loadingStore from './loadingStore'
const loading = loadingStore()

export default defineStore('orderStore',{
state: () => {
  return {
    orderData:{},
    orderProducts:[]
  };
},
actions:{
  //訂單資料
  getOrder(id){
    loading.isLoading = true
    axios
    .get(`${VITE_API}/api/${VITE_APIPATH}/order/${id}`)
    .then((res) => {
      this.orderData = res.data.order
      // console.log('orderData->',this.orderData);
      this.orderProducts= Object.values(res.data.order.products)
      // console.log('orderProducts->',this.orderProducts);
      loading.isLoading = false

    })
    .catch((err) => {
      alert(err.response.data.message)
    })
  },
  //付款
  orderPay(id){
    axios
    .post(`${VITE_API}/api/${VITE_APIPATH}/pay/${id}`)
    .then((res) => {
      // console.log('res->',res.data);
      alert(res.data.message)
      router.push({ path: '/order/finish' })
      this.getOrder(id)
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