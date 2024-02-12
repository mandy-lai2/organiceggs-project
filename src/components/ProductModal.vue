<script>
import ImgUpload from '@/components/ImgUpload.vue';
import modalMixin from '@/mixins/modalMixin.js'
import {  mapActions } from 'pinia';
import adminProductStore from '@/stores/adminProductStore.js';

export default {
  props: {
    product: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      tempProduct: {},
      // modal: ''
    };
  },
  components: {
    ImgUpload
  },
  mixins: [modalMixin], //混合元件方法 mixins，modal開關元件
  watch: {
    product() {
      this.tempProduct = this.product;
      
    }
  },
  methods: {
    ...mapActions(adminProductStore,['updateProduct']),
    addImage() {
      this.tempProduct.imagesUrl
        ? this.tempProduct.imagesUrl.push("")
        : (this.tempProduct.imagesUrl = [""]);
    },
    removeImage(key) {
      this.tempProduct.imagesUrl.splice(key, 1);
    },
    confirmSend(tempProduct){
      this.$refs.form.validate().then(valid => {
        if (valid.valid) {
          // console.log('表單驗證通過');
          this.updateProduct(tempProduct.id ? 'edit' : 'new' , this.tempProduct)
        } else {
          alert('送出失敗')
          // console.log('表單驗證失敗');
        }
      });
    }
  }
};
</script>

<template>
  <!-- 新增編輯產品Modal -->
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="false" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            <span v-if="tempProduct.id">編輯產品</span>
            <span v-else>新增產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- modal-body -->
        <div class="modal-body">
          <v-form ref="form" class="row g-3 mb-3" v-slot="{ errors }">
            <div class="col-md-8">
              <div class="row modal-mb">
                <div class="col-12">
                  <label for="inputTitle" class="form-label">標題</label>
                  <!-- <input type="text" class="form-control" id="inputTitle" placeholder="請輸入標題"
                    v-model="tempProduct.title" /> -->
                  <v-field type="text" class="form-control" :class="{ 'is-invalid': errors['標題'] }" id="inputTitle" name="標題" placeholder="請輸入標題" rules="required" v-model="tempProduct.title"></v-field>
                  <error-message name="標題" class="invalid-feedback"></error-message>
                </div>
                <div class="col-md-6">
                  <label for="inputCategory" class="form-label">分類</label>
                  <!-- <input type="text" class="form-control" id="inputCategory" placeholder="請輸入分類"
                    v-model="tempProduct.category" /> -->
                    <v-field type="text" class="form-control" :class="{ 'is-invalid': errors['分類'] }" id="inputCategory" name="分類" placeholder="請輸入分類" rules="required" v-model="tempProduct.category"></v-field>
                    <error-message name="分類" class="invalid-feedback"></error-message>
                </div>
                <div class="col-md-6">
                  <label for="inputUnit" class="form-label">單位</label>
                  <!-- <input type="text" class="form-control" id="inputUnit" placeholder="請輸入單位" v-model="tempProduct.unit" /> -->
                  <v-field type="text" class="form-control" :class="{ 'is-invalid': errors['分類'] }" id="inputCategory" name="分類" placeholder="請輸入分類" rules="required" v-model="tempProduct.category"></v-field>
                    <error-message name="分類" class="invalid-feedback"></error-message>
                </div>
                <div class="col-md-6">
                  <label for="inputOriginPrice" class="form-label">原價</label>
                  <!-- <input type="number" min=0 class="form-control" id="inputOriginPrice" placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price" /> -->
                    <v-field type="number" min=0 class="form-control" :class="{ 'is-invalid': errors['原價'] }" id="inputOriginPrice" name="原價" placeholder="請輸入原價" rules="required" v-model.number="tempProduct.origin_price"></v-field>
                    <error-message name="原價" class="invalid-feedback"></error-message>
                </div>
                <div class="col-md-6">
                  <label for="inputPrice" class="form-label">售價</label>
                  <v-field type="number" min=0 class="form-control" :class="{ 'is-invalid': errors['售價'] }" id="inputPrice" name="售價" placeholder="請輸入售價"
                    v-model.number="tempProduct.price"  rules="required"></v-field>
                    <error-message name="售價" class="invalid-feedback"></error-message>
                </div>
                <div class="col-12">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea class="form-control" id="description" rows="3" placeholder="請輸入產品描述"
                    v-model="tempProduct.description"></textarea>
                </div>
                <div class="col-12">
                  <label for="productContent" class="form-label">說明內容</label>
                  <textarea class="form-control" id="productContent" rows="3" placeholder="請輸入說明內容"
                    v-model="tempProduct.content"></textarea>
                </div>
                <div class="col-12 mb-3">
                  <input class="form-check-input" type="checkbox" id="isEnabled" v-model="tempProduct.is_enabled" />
                  <label class="form-check-label" for="isEnabled">
                    是否啟用
                  </label>
                  <input class="form-check-input" type="checkbox" id="isHotProduct" v-model="tempProduct.is_hot" />
                  <label class="form-check-label" for="isHotProduct">
                    是否人氣商品
                  </label>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <label for="mainImage" class="form-label">主要圖片</label>
              <input type="text" class="form-control" id="mainImage" placeholder="請輸入圖片連結"
                v-model="tempProduct.imageUrl" />
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="圖片" />
              <div class="text-secondary">
                <hr>
              </div>
              <ImgUpload></ImgUpload>

            </div>
            <div class="text-secondary">
                <hr>
              </div>
            <div class="col-12">
               <!-- 多圖 -->
              <h5 class="mt-2 d-inline-block me-2">多圖新增</h5>
              <button type="button" class="btn btn-outline-primary" @click="addImage">
                新增圖片
              </button>
              <div class="row g-5">
                <div class="col-4" v-for="(img, idx) in tempProduct.imagesUrl" :key="idx">
                  <label for="imageUrl" class="form-label mt-3">圖片網址</label>
                  <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[idx]" />
                  <img class="img-fluid" :src="img" alt="圖片" />
                  <button type="button" class="btn btn-outline-danger w-100 mt-2" @click="removeImage(idx)">
                    刪除
                  </button>
                </div>
              </div>
              <!-- <template></template> -->
            </div>
          </v-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="confirmSend(tempProduct)">
            確認
          </button>
          <!-- <button type="button" class="btn btn-primary" @click="updateProduct(tempProduct.id ? 'edit' : 'new' , this.tempProduct)">
            確認
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
