<script>
import modalMixin from '@/mixins/modalMixin.js'
import dateMixin from '@/mixins/dateMixin.js'
import { mapActions, mapState } from 'pinia';
import adminNewStore from '@/stores/adminNewStore.js';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  // props: {
  //   newData: {
  //     type: Object,
  //     default() { return {}; },
  //   },
  // },
  data() {
    return {
      // tempNew: {},
      tempDate: "",
      editor: ClassicEditor,
      editorData: '<p>Hello world!!</p>',
      editorConfig: {
        toolbar: [
                'undo', 'redo',
                '|', 'heading',
                '|', 'bold', 'italic',
                '|', 'link', 'uploadImage', 'insertTable', 'mediaEmbed',
                '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
            ],
        dataProcessor: {
          writer: {
            enter: '<br>'
          }
        }
      }
    };
  },
  computed: {
    ...mapState(adminNewStore, ['tempNew']),
  },
  mixins: [modalMixin, dateMixin],
  watch: {
    tempNew() {
      // this.tempNew = this.newData;
      this.tempDate = this.timeDate(this.tempNew.create_at)
    },
    tempDate() {
      this.tempNew.create_at = this.dateToTime(this.tempDate)
    }
  },
  methods: {
    ...mapActions(adminNewStore, ['updateNew']),
    confirmSend(tempNew){
      this.$refs.form.validate().then(valid => {
        if (valid.valid && tempNew.content) {
          this.updateNew(tempNew.id ? 'edit' : 'new', tempNew)
        } else {
          alert('送出失敗，是否未填寫文章內容')
        }
      });
    }
  }
};
</script>
<template>
  <!-- 新增編輯Modal -->
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="false" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            <span v-if="tempNew.title">編輯貼文</span>
            <span v-else>新增</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- modal-body -->
        <div class="modal-body">
          <v-form ref="form" class="row g-3 mb-3 modal-mb" v-slot="{ errors }">
            <div class="col-md-6">
              <label for="inputTitle" class="form-label">標題</label>
              <!-- <input type="text" class="form-control" id="inputTitle" placeholder="請輸入標題" v-model="tempNew.title" /> -->
              <v-field type="text" class="form-control" :class="{ 'is-invalid': errors['標題'] }" id="inputTitle" name="標題" placeholder="請輸入標題" rules="required" v-model="tempNew.title"></v-field>
              <error-message name="標題" class="invalid-feedback"></error-message>
            </div>
            <div class="col-md-6">
              <label for="inputImage" class="form-label">輸入圖片網址</label>
              <input type="text" class="form-control" id="inputImage" placeholder="請輸入圖片連結" v-model="tempNew.image" />
            </div>
            <div class="col-md-6">
              <label for="inputAuthor" class="form-label">作者</label>
              <v-field type="text" class="form-control" :class="{ 'is-invalid': errors['作者'] }" id="inputAuthor" name="作者" placeholder="請輸入作者" rules="required" v-model="tempNew.author" ></v-field>
              <error-message name="作者" class="invalid-feedback"></error-message>
            </div>
            <div class="col-md-6">
              <label for="inputCreate" class="form-label">文章建立日期</label>
              <input type="date" class="form-control" id="inputCreate" v-model="tempDate" />
            </div>
            <div class="col-12">
              <label for="inputTag" class="form-label">標籤</label>
              <div class="row flex-wrap gap-3">
                <div class="col-auto">
                  <button type="button" class="btn btn-outline-maingreen" @click="tempNew.tag.push('')">
                    新增標籤
                  </button>
                </div>
                <div class="col-3 col-sm-2 hstack" v-for=" (tag, idx) in tempNew.tag" :key="idx">
                  <input type="text" class="form-control form-control-sm rounded-0 rounded-start" :id="`tag${idx}`" placeholder="請輸入"
                    v-model="tempNew.tag[idx]" />
                  <button class="btn btn-outline-secondary rounded-0 rounded-end btn-sm" type="button" @click="tempNew.tag.splice(idx,1)">X</button>
                </div>
              </div>

            </div>
            <div class="col-12">
              <label for="inputDescription" class="form-label">文章描述</label>
              <input type="text" class="form-control" id="inputDescription" placeholder="請輸入描述"
                v-model="tempNew.description" />
            </div>
            <div class="col-12">
              <label for="inputContent" class="form-label">文章內容</label>
              <ckeditor :editor="editor" v-model="tempNew.content" :config="editorConfig"></ckeditor>
                
            </div>
            <div class="col-12 mb-3">
              <input class="form-check-input" type="checkbox" id="isPublic" v-model="tempNew.isPublic" />
              <label class="form-check-label" for="isPublic">
                是否啟用
              </label>
            </div>
          </v-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="confirmSend(tempNew)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
