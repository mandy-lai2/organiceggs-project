import Modal from 'bootstrap/js/dist/modal';
// import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'


export default {
  //modal 開跟關 方法
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    // this.modal = new bootstrap.Modal(this.$refs.modal)
  },
};
