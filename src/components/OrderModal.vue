<script>
import modalMixin from '@/mixins/modalMixin.js'
import dateMixin from '@/mixins/dateMixin.js'
export default {
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      tempOrder: {},
      modal: ''
    };
  },
  watch:{
    order(){
      this.tempOrder = this.order;
    }
  },
  mixins: [modalMixin,dateMixin], //混合元件方法 mixins
  methods: {
  }
};
</script>

<template>
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            訂單細節
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- modal-body -->
        <div class="modal-body">
          <div class="row gx-5 orderTable my-3">
            <div class="col-sm-6">
              <h5>用戶資料</h5>
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">姓名</th>
                    <td>{{tempOrder.user?.name}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{{tempOrder.user?.email}}</td>
                  </tr>
                  <tr>
                    <th scope="row">電話</th>
                    <td>{{tempOrder.user?.tel}}</td>
                  </tr>
                  <tr>
                    <th scope="row">地址</th>
                    <td>{{tempOrder.user?.address}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-sm-6">
              <h5>訂單細節</h5>
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">訂單編號</th>
                    <td>{{tempOrder.id}}</td>
                  </tr>
                  <tr>
                    <th scope="row" >下單時間</th>
                    <td>{{timeDate(tempOrder.create_at)}}</td>
                  </tr>
                  <tr>
                    <th scope="row" >付款時間</th>
                    <td>{{timeDate(tempOrder.paid_date)}}</td>
                  </tr>
                  <tr>
                    <th scope="row">付款狀態</th>
                    <td>{{tempOrder.is_paid === true ? "已付款": "未付款"}}</td>
                  </tr>
                  <tr>
                    <th scope="row" >總金額</th>
                    <td>{{tempOrder.total}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-12">
              <h5>選購商品</h5>
              <table class="table">
                <tbody>
                  <tr v-for="product in tempOrder.products" :key="product.id">
                    <td>{{product.product.title}}</td>
                    <td>{{product.qty}} {{ product.product.unit }}</td>
                    <td>NT${{product.final_total}}</td>
                  </tr>
                  <tr>
                    <td class="border-bottom-0">
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="checkPaid" v-model="tempOrder.is_paid">
                        <label class="form-check-label" for="checkPaid">{{tempOrder.is_paid === true ? "已付款" : "未付款"}}</label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('updatePaid', tempOrder)">
            確認修改
          </button> 
          <!-- 直接打emit到父層去做修改 -->
        </div>
      </div>
    </div>
  </div>
</template>
