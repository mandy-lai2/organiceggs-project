import{E as u,G as a}from"./index-e19f4a21.js";import{l as g}from"./loadingStore-c2872b6d.js";import{S as l}from"./sweetalert2.all-904252d4.js";const{VITE_API:i,VITE_APIPATH:c}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"mandyapi",BASE_URL:"/organiceggs-project/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},s=g(),P=u("productStore",{state:()=>({products:[],tempProduct:{},categoryProducts:[],likeProducts:[],likeProductsNum:0}),actions:{getProducts(){s.isLoading=!0,a.get(`${i}/api/${c}/products/all`).then(t=>{this.products=t.data.products,s.isLoading=!1}).catch(t=>{alert(t.response.data.message)})},getProduct(t){s.isLoading=!0,a.get(`${i}/api/${c}/product/${t}`).then(e=>{this.tempProduct=e.data.product,this.getCategoryProducts(),s.isLoading=!1}).catch(e=>{alert(e.response.data.message)})},getCategoryProducts(){const{category:t}=this.tempProduct;a.get(`${i}/api/${c}/products?category=${t}`).then(e=>{this.categoryProducts=e.data.products}).catch(e=>{alert(e.response.data.message)})},addLikeProduct(t=" "){let e=localStorage.getItem("likeItem"),o=e?JSON.parse(e):[];o.some(r=>r===t)||o.push(t),localStorage.setItem("likeItem",JSON.stringify(o)),this.getLikeProduct(),setTimeout(()=>{l.fire({position:"center",icon:"success",title:"成功加入最愛",showConfirmButton:!1,timer:1500})},500)},delLikeProduct(t=""){let e=localStorage.getItem("likeItem"),o=e?JSON.parse(e):[];o.forEach((r,d)=>{r===t&&(o.splice(d,1),console.log("getdata->",o))}),localStorage.setItem("likeItem",JSON.stringify(o)),this.getLikeProduct(),setTimeout(()=>{l.fire({position:"center",icon:"success",title:"已刪除",showConfirmButton:!1,timer:1500})},500)},getLikeProduct(){s.isLoading=!0;let t=localStorage.getItem("likeItem"),e=t?JSON.parse(t):[];this.likeProducts=[],Promise.all(e.map(o=>a.get(`${i}/api/${c}/product/${o}`))).then(o=>{this.likeProducts=o.map(r=>r.data.product),this.likeProductsNum=this.likeProducts.length,s.isLoading=!1,console.log("likeProducts->",this.likeProducts)})}},getters:{}});export{P as p};
