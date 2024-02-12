<script>
const { VITE_API, VITE_APIPATH } = import.meta.env 
import {  mapState,mapActions } from 'pinia';
import cartStore from "@/stores/cartStore.js";

export default {
  data() {
    return {
      "data": {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  computed:{
    ...mapState(cartStore,['carts']),
  },
  methods: {
    ...mapActions(cartStore,['getCarts']),
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '須為正確的手機號碼格式'
    },
    onSubmit() {
      const data = this.data
    this.$http
      .post(`${VITE_API}/api/${VITE_APIPATH}/order`, { data })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message)
        this.$refs.form.resetForm()
        this.$router.push({ path: `payment/${res.data.orderId}` })
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
    }
  },
  mounted() {
    this.getCarts()
  },
}
</script>

<template>
  <header>
    <div class="bgImageCover pageBanner d-flex flex-column justify-content-center  align-items-start">
      <div>
        <h2 class="py-3">填寫資料<span class="text-uppercase">Information</span>
        </h2>
        <hr class="border border-maincolor border-2 opacity-100">
      </div>
    </div>
  </header>
  <section>
    <div class="container my-6">
      <div class="position-relative m-4 orderProgress">
        <div class="progress" style="height: 2px;">
          <div class="progress-bar" role="progressbar" style="width: 33%;" aria-valuenow="33" aria-valuemin="0"
            aria-valuemax="100"></div>
        </div>
        <button class="position-absolute top-0 start-0 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"><i
            class="bi bi-cart3"></i><span class="text-maingray">購物車 </span></button>
        <button class="position-absolute top-0 start-33 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"><i
            class="bi bi-pencil"></i><span class="text-maingray">填寫資料</span></button>
        <button
          class="position-absolute top-0 start-66 translate-middle btn btn-lg btn-secondarylight rounded-pill py-0"><i
            class="bi bi-check-lg"></i><span class="text-maingray">付款方式</span></button>
        <button
          class="position-absolute top-0 start-100 translate-middle btn btn-lg btn-secondarylight rounded-pill py-0"><i
            class="bi bi-clipboard-check"></i><span class="text-maingray">訂單完成</span></button>
      </div>
    </div>
  </section>
  <section>
    <div v-if="carts.carts.length" class="container mt-5">
      <v-form ref="form" class=" bg-light p-sm-5 p-4 w-85 mx-auto" v-slot="{ errors }" @submit="onSubmit">
        <div class="mb-3">
          <label for="inputEmail" class="form-label">Email:</label>
          <v-field type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }" id="inputEmail"
            name="email" placeholder="請輸入Email" rules="email|required" v-model="data.user.email"></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
          <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
        </div>
        <div class="mb-3">
          <label for="inputName" class="form-label">收件人姓名:</label>
          <v-field type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" id="inputName" name="姓名"
            placeholder="請輸入姓名" rules="required" v-model="data.user.name"></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="inputTel" class="form-label">聯絡電話:</label>
          <v-field type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }" id="inputTel" name="電話"
            placeholder="請輸入電話" :rules="isPhone" v-model="data.user.tel"></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="inputAddress" class="form-label">收件人地址:</label>
          <v-field type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }" id="inputAddress" name="地址"
            placeholder="請輸入地址" rules="required" v-model="data.user.address"></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="textareaRemark" class="form-label">備註:</label>
          <v-field as="textarea" class="form-control" id="textareaRemark" name="留言" cols="30" rows="10"
            v-model="data.message"></v-field>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-buttonbg">送出訂單</button>
        </div>
      </v-form>

    </div>
    <h4 v-else class="text-center">購物車裡沒東西喔!!</h4>
  </section>
  <section>
    <div class="container my-5">
      <div class="hstack gap-3">
        <div><router-link to="/order/carts" class="btn btn-buttonbg">上一頁</router-link></div>
        <!-- <div class="ms-auto"><button type="button" class="btn btn-buttonbg">送出訂單</button></div> -->
      </div>
    </div>
  </section>
</template>