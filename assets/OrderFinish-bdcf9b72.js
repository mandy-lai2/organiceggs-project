import{_ as u,m as r,r as e,o as b,c as p,b as n,w as i,a as t,d as s,t as o,F as m}from"./index-56eba1de.js";import{o as _}from"./orderStore-17d01653.js";import{l as g}from"./loadingStore-b73227ed.js";import{L as h}from"./LoadingAnimation-6ffff200.js";import{d as v}from"./dateMixin-70f8a72b.js";const f={data(){return{}},components:{LoadingAnimation:h},computed:{...r(_,["orderData"]),...r(g,["isLoading"])},mixins:[v],methods:{},mounted(){}},y=t("header",null,[t("div",{class:"bgImageCover pageBanner d-flex flex-column justify-content-center align-items-start"},[t("div",null,[t("h2",{class:"py-3"},[s("訂單完成"),t("span",{class:"text-uppercase"},"Finish")]),t("hr",{class:"border border-maincolor border-2 opacity-100"})])])],-1),D=t("section",null,[t("div",{class:"container my-6"},[t("div",{class:"position-relative m-4 orderProgress"},[t("div",{class:"progress",style:{height:"2px"}},[t("div",{class:"progress-bar",role:"progressbar",style:{width:"100%"},"aria-valuenow":"33","aria-valuemin":"0","aria-valuemax":"100"})]),t("button",{class:"position-absolute top-0 start-0 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"},[t("i",{class:"bi bi-cart3"}),t("span",{class:"text-maingray"},"購物車 ")]),t("button",{class:"position-absolute top-0 start-33 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"},[t("i",{class:"bi bi-pencil"}),t("span",{class:"text-maingray"},"填寫資料")]),t("button",{class:"position-absolute top-0 start-66 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"},[t("i",{class:"bi bi-check-lg"}),t("span",{class:"text-maingray"},"付款方式")]),t("button",{class:"position-absolute top-0 start-100 translate-middle btn btn-lg btn-buttonbg rounded-pill py-0"},[t("i",{class:"bi bi-clipboard-check"}),t("span",{class:"text-maingray"},"訂單完成")])])])],-1),x=t("section",null,[t("div",{class:"container mt-5"},[t("div",{class:"w-50 mx-auto text-center"},[t("h3",{class:"text-maingray"},[t("i",{class:"bi bi-check-circle fs-1"}),t("br"),s("訂單完成"),t("br"),s("感謝您的購買")])])])],-1),k={class:"container my-3"},L={class:"bg-light mx-auto p-4 lh-lg w-fit"},w=t("br",null,null,-1),V=t("br",null,null,-1),$=t("br",null,null,-1),B=t("br",null,null,-1),F=t("br",null,null,-1),S=t("br",null,null,-1),A=t("br",null,null,-1),C={class:"container my-5"},N={class:"hstack gap-3"},j={class:"ms-auto"};function E(a,I,M,O,P,T){const d=e("LoadingAnimation"),c=e("VLoading"),l=e("router-link");return b(),p(m,null,[n(c,{active:a.isLoading},{default:i(()=>[n(d)]),_:1},8,["active"]),y,D,x,t("section",null,[t("div",k,[t("div",L,[t("p",null,[s(" 下單時間: "+o(a.timeDate(a.orderData.create_at)),1),w,s(" 訂單編號: "+o(a.orderData.id),1),V,s(" 收件人姓名: "+o(a.orderData.user.name),1),$,s(" 收件人地址: "+o(a.orderData.user.address),1),B,s(" 聯絡電話: "+o(a.orderData.user.tel),1),F,s(" 總金額: $"+o(a.orderData.total),1),S,s(" 付款狀態:"+o(a.orderData.is_paid?"已付款":"未付款"),1),A,s(" 備註:"+o(a.orderData.message),1)])])])]),t("section",null,[t("div",C,[t("div",N,[t("div",null,[n(l,{to:"/",class:"btn btn-outline-buttonbg"},{default:i(()=>[s("回首頁")]),_:1})]),t("div",j,[n(l,{to:"/products",class:"btn btn-buttonbg"},{default:i(()=>[s("繼續購物")]),_:1})])])])])],64)}const K=u(f,[["render",E]]);export{K as default};
