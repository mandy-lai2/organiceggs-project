import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'


import App from './App.vue'
import router from './router'

//bootstrap5
import 'bootstrap'
import './assets/css/all.scss'

//sweetalert2
import 'sweetalert2/src/sweetalert2.scss'

// VeeValidate 元件跟功能
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
// VeeValidate 的驗證規則
import VeeValidateRules from '@vee-validate/rules'
// VeeValidate  i18n 功能
import { localize, setLocale } from '@vee-validate/i18n'
// 繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// 全部加入，將驗證規則加入 VeeValidate
Object.keys(VeeValidateRules).forEach((rule) => {
  defineRule(rule, VeeValidateRules[rule])
})
// VeeValidate 的語系設定為繁體中文
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文
  validateOnInput: true // 輸入文字時，就立即進行驗證
})
// 設定預設語系
setLocale('zh_TW')

//vue-loading
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

// 加入 CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(CKEditor)
// app.use(IconName)

app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)
app.component('VLoading', Loading);

app.mount('#app')
