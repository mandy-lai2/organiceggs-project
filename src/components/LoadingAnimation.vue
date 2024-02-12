<script>
import lottie from 'lottie-web';
export default {
  methods: {
    loadAnimation() {
      const content = this.$refs.loadingEgg;
      lottie.loadAnimation({
        container: content,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../src/assets/data.json'
      });
    }
  },
  mounted() {
    this.loadAnimation()
  }
}

</script>
<template>
  <div ref="loadingEgg"></div>
</template>