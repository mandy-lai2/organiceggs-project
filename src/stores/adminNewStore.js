import { defineStore } from 'pinia'
import axios from 'axios';
const { VITE_API, VITE_APIPATH } = import.meta.env
import loadingStore from './loadingStore'
const loading = loadingStore()

export default defineStore('adminNewStore',{

state: () => {
  return {
    news: [],
    pagination:{},
    isCloseModal: "",
    tempNew:{}
  };
},
actions:{
  //get最新消息
  getNews(page = 1){
    loading.isLoading = true
    axios
      .get(`${VITE_API}/api/${VITE_APIPATH}/admin/articles?page=${page}`)
      .then((res) => {
        const {articles, pagination} = res.data
        this.news = articles
        this.pagination = pagination
        loading.isLoading = false
      })
      .catch((error) => {
        alert(error.response.data.message);
        loading.isLoading = false
      });
  },
  //get單筆最新消息
  getNew(id){
    loading.isLoading = true
    axios
      .get(`${VITE_API}/api/${VITE_APIPATH}/admin/article/${id}`)
      .then((res) => {
        // console.log(res.data);
        this.tempNew = {
          ...res.data.article,
          tag: res.data.article.tag || [],
        }
        loading.isLoading = false
      })
      .catch((error) => {
        alert(error.response.data.message);
        loading.isLoading = false
      });
  },
  addNew(tempNew){
    this.tempNew = tempNew
  },

  // 新增資料或更新
  updateNew(effect, tempNew) {
    loading.isLoading = true
    this.isCloseModal= ""
    let url = "";
    let type = "";
    if (effect === "new") {
      url = `${VITE_API}/api/${VITE_APIPATH}/admin/article`;
      type = "post";
    } else if (effect === "edit") {
      url = `${VITE_API}/api/${VITE_APIPATH}/admin/article/${tempNew.id}`;
      type = "put";
    }
    axios[type](url, { data: tempNew })
      .then((res) => {
        alert(res.data.message);
        this.getNews()
        this.isCloseModal= "modal"
        loading.isLoading = false
      })
      .catch((error) => {
        alert(error.response.data.message);
        loading.isLoading = false
      });
  },
  //  刪除最新消息
  delNew(delModal, id) {
    axios
      .delete(
        `${VITE_API}/api/${VITE_APIPATH}/admin/article/${id}`
      )
      .then((res) => {
        delModal.swalWithBootstrapButtons.fire(
          '成功刪除',
          `${res.data.message}`,
          'success'
        )
        this.getNews()
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

}
})