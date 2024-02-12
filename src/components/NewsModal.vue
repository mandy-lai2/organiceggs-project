<script>
import modalMixin from '@/mixins/modalMixin.js'
const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  props: {
    newId: {
      type: String,
      default() { return ""; },
    },
  },
  data() {
    return {
      tempNew: {},
      modal: ''
    };
  },
  
  mixins: [modalMixin], //混合元件方法 mixins，modal開關元件
  watch: {
    newId() {
      this.getNew()
    }
  },
  methods: {
    getNew(){
      this.$http.get(`${VITE_API}/api/${VITE_APIPATH}/article/${this.newId}`)
      .then((res) => {
          console.log('getnew->',res.data.article);
          this.tempNew = res.data.article
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    clearNew(){
      this.tempNew = {}
    }

    
  },
  
};
</script>

<template>
  <!-- 最新消息Modal -->
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            {{tempNew.title}}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearNew"></button>
        </div>
        <!-- modal-body -->
        <div class="modal-body text-center">
          <div><img :src="tempNew.imageUrl" class="img-fluid w-50"></div>
          <!-- <small>{{tempNew.create_at}}</small> -->
          <h5 class="mt-3">{{tempNew.title}}</h5>
          <p class="my-3" v-html="tempNew.content"></p>
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clearNew">
            取消
          </button>
          
        </div>
      </div>
    </div>
  </div>
</template>
