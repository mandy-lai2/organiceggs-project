import { defineStore } from 'pinia'
import axios from 'axios';
const { VITE_API, VITE_APIPATH } = import.meta.env
import loadingStore from './loadingStore'
const loading = loadingStore()

export default defineStore('adminCouponStore',{

state: () => {
  return {
    coupons: [],
    pagination:{},
    isCloseModal: "",
  };
},
actions:{
  //get優惠券
  getCoupons(page = 1){
    loading.isLoading = true
    axios
      .get(`${VITE_API}/api/${VITE_APIPATH}/admin/coupons?page=${page}`)
      .then((res) => {
        // console.log(res.data);
        const {coupons, pagination} = res.data
        this.coupons = coupons
        this.pagination = pagination
        loading.isLoading = false
      })
      .catch((error) => {
        alert(error.response.data.message);
        loading.isLoading = false
      });
  },
  // 新增資料或更新
  updateCoupon(effect, tempCoupon) {
    loading.isLoading = true
    this.isCloseModal= ""
    let url = "";
    let type = "";
    if (effect === "new") {
      url = `${VITE_API}/api/${VITE_APIPATH}/admin/coupon`;
      type = "post";
    } else if (effect === "edit") {
      url = `${VITE_API}/api/${VITE_APIPATH}/admin/coupon/${tempCoupon.id}`;
      type = "put";
    }
    axios[type](url, { data: tempCoupon })
      .then((res) => {
        alert(res.data.message);
        this.getCoupons()
        this.isCloseModal= "modal"
        loading.isLoading = false
      })
      .catch((error) => {
        alert(error.response.data.message);
        loading.isLoading = false
      });
  },
  //  刪除Coupon
  delCoupon(delModal, id) {
    axios
      .delete(
        `${VITE_API}/api/${VITE_APIPATH}/admin/coupon/${id}`
      )
      .then((res) => {
        delModal.swalWithBootstrapButtons.fire(
          '成功刪除',
          `${res.data.message}`,
          'success'
        )
        this.getCoupons()
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

}
})