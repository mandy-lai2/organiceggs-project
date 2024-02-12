<script>
import dateMixin from '@/mixins/dateMixin.js'
import PaginationComponent from '@/components/PaginationComponent.vue';
import adminNewModal from '@/components/adminNewModal.vue';
import delAdminNewModal from '@/components/delAdminNewModal.vue';
import {  mapActions,mapState } from 'pinia';
import adminNewStore from '@/stores/adminNewStore.js';

export default{
  data() {
    return {
      // tempNew:{}
    }
  },
  mixins: [dateMixin],
  components:{
    PaginationComponent,
    adminNewModal,
    delAdminNewModal
  },
  computed:{
    ...mapState(adminNewStore,['news', 'pagination','isCloseModal','tempNew']),
  },
  watch:{
    isCloseModal(){
      if(this.isCloseModal === "modal"){
        this.closeModal()
      }
    }
  },
  methods: {
    ...mapActions(adminNewStore,['getNews', 'getNew','addNew']),
    //打開modal
    OpenModal(effect, article){
      const newModal = this.$refs.newModal
      const delNewModal = this.$refs.delNewModal
      if(effect === "new"){
        const tempNew = { 
          create_at: this.dateToTime(),
          isPublic: false,
          tag: []
        };
        this.addNew(tempNew)
        newModal.openModal()
      }else if(effect === "edit"){
        // this.tempNew = {...news}
        this.getNew(article.id)
        newModal.openModal()
      }
      else if(effect === "del"){
        // this.tempNew = {...news}
          this.$nextTick(() => {
            delNewModal.openAlert(article)
          });
      }
    },
    //關閉modal
    closeModal() {
      const newModal = this.$refs.newModal
      newModal.hideModal()
    },
  },
  mounted() {
    this.getNews()
  },
}

</script>

<template>
  <div>
    <div class="d-flex justify-content-between">
      <h5>最新消息管理</h5>
      <button type="button" class="btn btn-outline-adminbtn" @click="OpenModal('new')">
            新增最新消息〸
      </button>
    </div>
        <div class="table-responsive-lg">
          <table class="table  align-middle">
            <thead>
              <tr>
                <th scope="col">標題</th>
                <th scope="col">作者</th>
                <th scope="col">描述</th>
                <th scope="col">建立時間</th>
                <th scope="col">是否公開</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="article in news" :key="article.id">
                <th scope="row" >
                  {{article.title}}
                </th>
                <td scope="row" >
                  {{article.author}}
                </td>
                <td scope="row" >
                  {{article.description}}
                </td>
                <td>
                  {{ timeDate(article.create_at) }}
                </td>
                <td>
                  <span v-if="article.isPublic" class="text-adminbtn">已上架</span>
                  <span v-else>未上架</span>
                </td>
                <td class="text-end">
                  <button type="button" class="btn btn-buttonbg me-3" @click="OpenModal('edit',article)">
                  編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger" @click="OpenModal('del',article)">
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
             
            </tbody>
          </table>
        </div>
        <PaginationComponent :pages="pagination" @emit-pages="getNews"></PaginationComponent>
        <adminNewModal ref="newModal" ></adminNewModal>
        <delAdminNewModal ref="delNewModal" ></delAdminNewModal>
      
  </div>
</template>