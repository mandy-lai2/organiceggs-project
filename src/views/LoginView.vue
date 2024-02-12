<script>
const { VITE_API } = import.meta.env
import { gsap } from 'gsap';

export default{
  data() {
    return {
      airplane:null,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods:{
    goAirplane(){
     this.airplane = gsap.to(".loginAirplane > img" , { keyframes: [
    {duration: 2, x: -120, y:-40 , opacity:1},
    {duration: 1, x: -200, y:-80, opacity:0 ,delay: 1},
  ],repeat: -1,stagger: 0.5,})
    },
    pauseAirplane(){
      this.airplane.pause()
      gsap.to(".gotoPc", {
        duration: 1,
        scale: 1.2
      })
    },
    playAirplane(){
      this.airplane.play()
      gsap.to(".gotoPc", {
        duration: 1,
        scale: 1
      })
    },
    login () {
      this.$http
        .post(`${VITE_API}/admin/signin`, this.user)
        .then((res) => {
          // console.log("登入->",res);
          const { token, expired } = res.data
          document.cookie = `userToken=${token}; expires=${new Date(expired)};`
          alert("登入成功")
          this.$router.push('/admin/products')
          
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
  },
  mounted() {
    this.goAirplane()
  },
}
</script>
<template>
  <section class="loginBg d-flex align-items-center">
    <div class="container py-5">
      <div class="row row-cols-sm-2 g-4 ">
        <div class="col-12">
          <div class="goFront w-75 m-auto" @mouseover="pauseAirplane" @mouseout="playAirplane">
            <router-link to="/">
              <img src="../assets/images/loginPc.png" alt="" class="img-fluid gotoPc">
              <div class="loginAirplane">
                <img src="../assets/images/loginAirplane.png" >
                <img src="../assets/images/loginAirplane2.png" >
              </div>
            </router-link>

          </div>
        </div>
        <div class="col-12">
          <div class="loginForm">
            <i class="bi bi-person-fill fs-1"></i>
            <h3>後台請先登入</h3>
            <form id="form"  @submit.prevent="login">
              <div class="form-floating mb-3">
                <input type="email" class="form-control" id="username"
                  placeholder="name@example.com" required autofocus v-model="user.username">
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input type="password" class="form-control" id="password"
                  placeholder="Password" required  v-model="user.password">
                <label for="password">Password</label>
              </div>
              <button class="btn btn-lg btn-buttonbg w-100 mt-3" type="submit">
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>