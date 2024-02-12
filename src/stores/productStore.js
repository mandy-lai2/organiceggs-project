import { defineStore } from 'pinia'
import axios from 'axios';
const { VITE_API, VITE_APIPATH } = import.meta.env
import loadingStore from './loadingStore'
const loading = loadingStore()
import Swal from 'sweetalert2'

export default defineStore('productStore',{
// data, methods, computed  對應的
// state, actions, getters

state: () => {
  return {
    products: [],
    tempProduct:{},
    categoryProducts:[],
    likeProducts:[],
    likeProductsNum:0,
    
  };
},
actions:{
  //get所有產品
  getProducts() {
    loading.isLoading = true
    axios.get(`${VITE_API}/api/${VITE_APIPATH}/products/all`)
      .then((res) => {
        // console.log(res.data);
        this.products = res.data.products
        // console.log('全部產品2:', this.products);
        loading.isLoading = false
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  },
  //get單一產品
  getProduct(id) {
    loading.isLoading = true
    axios.get(`${VITE_API}/api/${VITE_APIPATH}/product/${id}`)
      .then((res) => {
        this.tempProduct = res.data.product
        this.getCategoryProducts()
        loading.isLoading = false
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  },
  //get同類產品
  getCategoryProducts(){
    const {category} = this.tempProduct
    axios.get(`${VITE_API}/api/${VITE_APIPATH}/products?category=${category}`)
      .then((res) => {
        this.categoryProducts = res.data.products
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  },

  //加入最愛
  addLikeProduct(id =" ") {
    let getData = localStorage.getItem('likeItem');
    let getDataAry =  getData ? JSON.parse(getData) : []
    
    if(!getDataAry.some((item)=> item === id)){
      getDataAry.push(id);
    }
    localStorage.setItem('likeItem', JSON.stringify(getDataAry));
    this.getLikeProduct()
    // Swal.fire('成功加入最愛')
    setTimeout(()=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '成功加入最愛',
        showConfirmButton: false,
        timer: 1500
      })
    },500)
  },
  //刪除最愛
  delLikeProduct(id=""){
    let getData = localStorage.getItem('likeItem');
    let getDataAry =  getData ? JSON.parse(getData) : []
    getDataAry.forEach((item,idx)=>{
      if(item === id){
        getDataAry.splice(idx,1)
        console.log('getdata->',getDataAry);
      }
    })
    localStorage.setItem('likeItem', JSON.stringify(getDataAry));
    this.getLikeProduct()
    setTimeout(()=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '已刪除',
        showConfirmButton: false,
        timer: 1500
      })
    },500)
  },
  //get最愛產品
  getLikeProduct(){
    loading.isLoading = true
    let getData = localStorage.getItem('likeItem');
    let getDataAry =  getData ? JSON.parse(getData) : []
    this.likeProducts=[]
    Promise.all(
      getDataAry.map((item)=>{
        return axios.get(`${VITE_API}/api/${VITE_APIPATH}/product/${item}`)
      })
    ).then((res)=>{
      this.likeProducts = res.map((item)=>{
        return item.data.product
      })
      this.likeProductsNum = this.likeProducts.length
      loading.isLoading = false
      console.log('likeProducts->',this.likeProducts);
    // console.log('likeProductsNum->',this.likeProductsNum);
    })

  }
  
},
getters:{
  // sortProducts:({products})=>{
  //   return products.sort((a,b)=> a.price - b.price);
  // }
}
})