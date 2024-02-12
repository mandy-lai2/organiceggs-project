<script>
import { Tooltip } from 'bootstrap';
import NavBar from '../components/NavBar.vue'
import FooterComponent from '../components/FooterComponent.vue'
export default {
data() {
  return {
  }
},
components: {
  NavBar,
  FooterComponent
},
mounted() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl);
  });
},
}
</script>
<template>
  <a class="scrollTop position-fixed rounded-circle" href="#scrollTop">Top</a>
  <NavBar></NavBar>
  <div data-bs-spy="scroll" data-bs-smooth-scroll="true">
     <div id="scrollTop"> </div>
  </div>
  <router-view></router-view>
  <FooterComponent></FooterComponent>
</template>
<style lang="scss" scoped>
a{
  &.scrollTop{
    font-weight: bolder;
    right: 20px;
    bottom: 60px;
    color: #fff;
    background-color: #008568;
    border: 1px solid #00745a;
    padding: 10px;
    text-decoration: none;
    z-index: 999;
    &:hover{
      background-color: #fff;
      color: #333;
    }
  }
}

</style>
