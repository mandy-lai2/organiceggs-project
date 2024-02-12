import { defineStore } from 'pinia'
import axios from 'axios';
const { VITE_API, VITE_APIPATH } = import.meta.env
import loadingStore from './loadingStore'
const loading = loadingStore()

export default defineStore('adminProductStore',{

state: () => {
  return {
    products: [],
    pagination:{},
    isCloseModal: "",
    // swalWithBootstrapButtons: null
  };
},
actions:{
  //getAdmin產品第頁
  getPageProducts(page = 1){
    loading.isLoading = true
    axios.get(`${VITE_API}/api/${VITE_APIPATH}/admin/products?page=${page}`)
        .then((res) => {
          const { products, pagination } = res.data
          this.products = products
          this.pagination = pagination
          loading.isLoading = false
        })
        .catch((error) => {
          alert(error.response.data.message);
          loading.isLoading = false
        });
  },
  // 新增資料或更新
  updateProduct(effect, tempProduct) {
    loading.isLoading = true
    this.isCloseModal= ""
    let url = "";
    let type = "";
    if (effect === "new") {
      url = `${VITE_API}/api/${VITE_APIPATH}/admin/product`;
      type = "post";
    } else if (effect === "edit") {
      url = `${VITE_API}/api/${VITE_APIPATH}/admin/product/${tempProduct.id}`;
      type = "put";
    }
    axios[type](url, { data: tempProduct })
      .then((res) => {
        loading.isLoading = false
        alert(res.data.message);
        // this.$emit("getProducts");
        this.getPageProducts()
        // this.$emit("closeModal", "modal");
        this.isCloseModal= "modal"
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error.response.data);
        loading.isLoading = false
        
      });
  },
  //  刪除商品
   delProduct(delModal, id) {
    axios
      .delete(
        `${VITE_API}/api/${VITE_APIPATH}/admin/product/${id}`
      )
      .then((res) => {
        delModal.swalWithBootstrapButtons.fire(
          '成功刪除',
          `${res.data.message}`,
          'success'
        )
        this.getPageProducts()
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

},

})