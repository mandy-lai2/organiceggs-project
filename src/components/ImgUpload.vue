<script>
const { VITE_API, VITE_APIPATH } = import.meta.env
export default{
  data() {
    return {
      imgUrl: "",
      inputImg: "",
    }
  },
  methods: {
    imgUpload(e) {
      const file = e.target.files[0];
      // console.log(file);
      const formData = new FormData();
      formData.append("file-to-upload", file);  // name="file-to-upload"
      // 建立表單資料 new FormData()，用append新增資料欄位
      // console.log(formData.get('file-to-upload'));
      this.$http
        .post(`${VITE_API}/api/${VITE_APIPATH}/admin/upload`, formData)
        .then((res) => {
          alert(`${res.data.success ? "圖片上傳成功" : "失敗"}`);
          this.imgUrl = res.data.imageUrl;
          this.inputImg = "";
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
    copyLike(){
      if(!this.imgUrl) return;
      navigator.clipboard.writeText(this.imgUrl);
      alert("已複製")
    }
  },
}
</script>
<template>
  <!-- 圖片上傳 -->
  <div class="container">
   <h5>圖片上傳</h5>
   <div class="mb-2">
     <input class="form-control customFileInput" type="file" id="formFile" @change="imgUpload" :value="inputImg">
     <label class="form-label cursor-pointer" for="formFile"><img src="../assets/images/admin/imgUpload.png" class="img-fluid"></label>
   </div>
   <div class="mb-3">
     <label class="form-label">圖片連結👇</label>
     <i class="bi bi-stickies float-end cursor-pointer" @click="copyLike"  data-bs-toggle="tooltip" data-bs-title="點擊複製"></i>
     <textarea class="form-control" rows="5" v-model="imgUrl"></textarea>
   </div>
 </div>
</template>