(function(){"use strict";var e={9217:function(e,t,n){var o=n(5130),r=n(4373),i=n(6942),a=n(6768);function s(e,t){const n=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.Wv)(n)}var l=n(1241);const c={},u=(0,l.A)(c,[["render",s]]);var d=u,p=n(1387),f=n(4232),h=n(5510),m=n.p+"img/home_ad1.200e9f30.jpg",b=n.p+"img/home_ad2.cdf74835.jpg";const v={class:"side-nav"},g=(0,a.Lk)("img",{src:h,alt:"post"},null,-1),k={class:"icons"},L=(0,a.Lk)("i",{class:"bi bi-shop-window"},null,-1),y=(0,a.Lk)("i",{class:"bi bi-bookmark-heart-fill"},null,-1),x=(0,a.Lk)("i",{class:"bi bi-handbag"},null,-1),w=(0,a.Lk)("div",{class:"arrow-down"},[(0,a.Lk)("i",{class:"bi bi-arrow-down-circle"})],-1),C=(0,a.Fv)('<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000"><div class="carousel-inner"><div class="carousel-item active"><img src="'+m+'" class="d-block w-100" alt="..."></div><div class="carousel-item"><img src="'+b+'" class="d-block w-100" alt="..."></div></div><button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div>',1),E=(0,a.Lk)("div",{class:"seperator"},null,-1),A=(0,a.Lk)("h2",null,"Products",-1),P=(0,a.Lk)("hr",null,null,-1),j={class:"container"},_={class:"row"},F={class:"product-container"},O=["onClick"],S={class:"title-cart"},$=["onClick"],N=["disabled","onClick"],I={key:0,class:"spinner-grow spinner-grow-sm text-danger",role:"status"},T=(0,a.Lk)("span",{class:"visually-hidden"},"Loading...",-1),M=[T],D=(0,a.Lk)("i",{class:"bi bi-cart-fill"},null,-1),K={style:{color:"#CE0000"}},U=(0,a.Lk)("i",{class:"bi bi-arrow-right"},null,-1),X=(0,a.Lk)("div",{class:"seperator"},null,-1),z=(0,a.Lk)("h2",null,"Product Articles",-1),B=(0,a.Lk)("hr",null,null,-1),W={class:"article-container"},q={class:"row"},V=["src"],H={class:"col-md-4 offset-md-1 d-flex flex-column justify-content-center py-3"},Q={class:"fs-4 fw-bold mb-3"},Z={class:"text-secondary text-prewrap mb-3"};function G(e,t,n,o,r,i){const s=(0,a.g2)("Loading"),l=(0,a.g2)("router-link"),c=(0,a.g2)("UserFooter");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(s,{active:r.isLoading},null,8,["active"]),(0,a.Lk)("header",null,[(0,a.Lk)("div",v,[(0,a.bF)(l,{class:"navbar-brand",to:"/"},{default:(0,a.k6)((()=>[g])),_:1}),(0,a.Lk)("div",k,[(0,a.bF)(l,{class:"navbar-brand",to:"/user/list"},{default:(0,a.k6)((()=>[L])),_:1}),(0,a.bF)(l,{class:"navbar-brand",to:"/user/favorite"},{default:(0,a.k6)((()=>[y])),_:1}),(0,a.bF)(l,{class:"navbar-brand",to:"/user/cart"},{default:(0,a.k6)((()=>[x])),_:1})]),w]),C]),E,A,P,(0,a.Lk)("div",j,[(0,a.Lk)("div",_,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(i.limitedProducts,(t=>((0,a.uX)(),(0,a.CE)("div",{class:"col-md-4 mb-4",key:t.id},[(0,a.Lk)("div",F,[(0,a.Lk)("div",{class:"product-image-grid",style:(0,f.Tr)({backgroundImage:`url(${t.imageUrl})`}),onClick:e=>i.getProduct(t.id)},null,12,O),(0,a.Lk)("div",S,[(0,a.Lk)("p",{onClick:e=>i.getProduct(t.id)},(0,f.v_)(t.title),9,$),(0,a.Lk)("button",{type:"button",class:"btn",disabled:this.status.loadingItem===t.id,onClick:n=>e.addCart(t.id)},[this.status.loadingItem===t.id?((0,a.uX)(),(0,a.CE)("div",I,M)):(0,a.Q3)("",!0),D],8,N)]),(0,a.Lk)("p",K,"$"+(0,f.v_)(t.price),1)])])))),128))]),(0,a.Lk)("p",{class:"products-more jump-animation",onClick:t[0]||(t[0]=e=>i.getUserList())},[U,(0,a.eW)(" 點我看更多商品")]),X,z,B,(0,a.Lk)("div",W,[(0,a.Lk)("div",q,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(r.articles,((e,t)=>((0,a.uX)(),(0,a.CE)("div",{class:"col-md-12",key:e.id},[(0,a.Lk)("div",{class:(0,f.C4)(["row mb-2",[t===r.ArticlesNum-1?"":"mb-md-4"]])},[(0,a.Lk)("div",{class:(0,f.C4)(["col-md-6",[t%2===0?"":"order-md-1 offset-md-1"]])},[(0,a.Lk)("img",{src:e.imageUrl,alt:"article image",class:"img-fluid"},null,8,V)],2),(0,a.Lk)("div",H,[(0,a.Lk)("h3",Q,(0,f.v_)(e.title),1),(0,a.Lk)("p",Z,(0,f.v_)(e.description),1)])],2)])))),128))])])]),(0,a.bF)(c)],64)}n(4114);var J=n(7072),R={data(){return{ArticlesNum:3,products:[],articles:[],articlesData:[],isLoading:!1,status:{loadingItem:""}}},components:{UserFooter:J.A},methods:{getProducts(){const e="https://vue3-course-api.hexschool.io/api/applehung1-api/products/all";this.isLoading=!0,this.$http.get(e).then((e=>{this.products=e.data.products,console.log("products:",e),this.isLoading=!1}))},getProduct(e){this.$router.push(`/user/product/${e}`)},getUserList(){this.$router.push("/user/list")},getArticles(){const e="https://vue3-course-api.hexschool.io/api/applehung1-api/articles";this.isLoading=!0,this.$http.get(e).then((e=>{this.articlesData=e.data.articles,this.articles=this.articlesData.slice(0,this.ArticlesNum),console.log("articles:",e),this.isLoading=!1})).catch((e=>{this.$httpMessageState(e.response,"取得近期文章")}))}},created(){this.getArticles(),this.getProducts()},computed:{limitedProducts(){return this.products.slice(6,12)}}};const Y=(0,l.A)(R,[["render",G]]);var ee=Y;const te=[{path:"/",name:"home",component:ee},{path:"/aboutView",name:"about",component:()=>n.e(594).then(n.bind(n,603))},{path:"/login",component:()=>n.e(463).then(n.bind(n,8463))},{path:"/dashboard",component:()=>Promise.all([n.e(462),n.e(81)]).then(n.bind(n,3081)),children:[{path:"products",component:()=>Promise.all([n.e(462),n.e(134),n.e(624)]).then(n.bind(n,3624))},{path:"orders",component:()=>Promise.all([n.e(462),n.e(134),n.e(414)]).then(n.bind(n,7414))},{path:"coupons",component:()=>Promise.all([n.e(462),n.e(134),n.e(947)]).then(n.bind(n,947))},{path:"articles",component:()=>Promise.all([n.e(462),n.e(134),n.e(773)]).then(n.bind(n,3773))}]},{path:"/user",component:()=>Promise.all([n.e(462),n.e(394)]).then(n.bind(n,7500)),children:[{path:"list",component:()=>n.e(730).then(n.bind(n,8730))},{path:"product/:productId",component:()=>n.e(715).then(n.bind(n,5715))},{path:"checkout/:orderId",component:()=>n.e(13).then(n.bind(n,5013))},{path:"cart",component:()=>n.e(991).then(n.bind(n,5991))},{path:"checkinfo",component:()=>n.e(705).then(n.bind(n,2705))},{path:"favorite",component:()=>n.e(896).then(n.bind(n,5896))},{path:"about",component:()=>n.e(34).then(n.bind(n,6034)),children:[{path:"overview",name:"overview",component:()=>n.e(51).then(n.bind(n,2051))},{path:":articleId",name:"article",component:()=>n.e(461).then(n.bind(n,3461))}]}]}],ne=(0,p.aE)({history:(0,p.Bt)(),routes:te,scrollBehavior(e,t,n){return n||{top:0}}});var oe=ne,re=n(5756);n(323);function ie(e){const t=parseInt(e,10);return`${t.toFixed(0).replace(/./g,((e,t,n)=>t&&"."!==e&&(n.length-t)%3===0?`, ${e}`.replace(/\s/g,""):e))}`}function ae(e){const t=new Date(1e3*e);return t.toLocaleDateString()}var se=n(1600);function le(e,t="更新"){if(e.data.success)se.A.emit("push-message",{style:"success",title:`${t}成功`});else{const n="string"===typeof e.data.message?[e.data.message]:e.data.message;se.A.emit("push-message",{style:"danger",title:`${t}失敗`,content:n.join("、")})}}var ce=n(482),ue=n(3224),de=n(4164),pe=n(1066),fe=n(595);const he=(0,fe.A)(),me=(0,o.Ef)(d);me.config.globalProperties.$filters={date:ae,currency:ie},Object.keys(ue).forEach((e=>{"function"===typeof ue[e]&&(0,ce.Km)(e,ue[e])})),(0,ce.jK)({generateMessage:(0,de.kg)({zh_TW:pe}),validateOnInput:!0}),(0,de.xS)("zh_TW"),me.config.globalProperties.$httpMessageState=le,me.config.globalProperties.emitter=he,me.provide("emitter",he),me.use(i.A,r.A),me.use(oe),me.component("Loading",re.A),me.component("Form",ce.lV),me.component("Field",ce.D0),me.component("ErrorMessage",ce.Kw),me.mount("#app")},1600:function(e,t,n){var o=n(595);const r=(0,o.A)();t.A=r},7072:function(e,t,n){n.d(t,{A:function(){return v}});var o=n(6768);const r=(0,o.Lk)("div",{class:"footer-separator"},null,-1),i={ref:"section",class:"footer"},a={class:"footer-content pt-4 px-4 pb-3"},s={class:"row flex-column flex-xl-row"},l={class:"col-xl-10 d-flex flex-column mb-5 mb-xl-0"},c=(0,o.Lk)("h6",{class:"fw-bold text-white"}," Zhuzh露絲花藝 ",-1),u=(0,o.Lk)("hr",{class:"custom-hr"},null,-1),d=(0,o.Fv)('<ul class="information"><li><i class="bi bi-geo-alt-fill"></i> 新北市成功區中正路一段33號1樓</li><li><i class="bi bi-phone-fill"></i> (02)2233-2233</li><li><i class="bi bi-envelope-open-fill"></i> applehung1@gmail.com</li><li><i class="bi bi-clock-fill"></i> 星期一至星期六 11:00 a.m – 08:00 p.m. 星期天 11:00 a.m – 06:00 p.m.</li></ul><p class="text-white" style="text-align:left;font-size:12px;"> © 2024. 版面設計修改自六角學院授權設計稿，圖片來自於Sundia桑迪亞國際花藝。此網站為個人作品展示，非商業使用。 </p>',2),p=(0,o.Lk)("div",{class:"col-xl-2 d-flex justify-content-xl-end"},null,-1);function f(e,t){const n=(0,o.g2)("router-link");return(0,o.uX)(),(0,o.CE)(o.FK,null,[r,(0,o.Lk)("footer",i,[(0,o.Lk)("div",a,[(0,o.Lk)("div",s,[(0,o.Lk)("div",l,[(0,o.bF)(n,{class:"text-decoration-none align-self-start",to:"/"},{default:(0,o.k6)((()=>[c,u])),_:1}),d]),p])])],512)],64)}var h=n(1241);const m={},b=(0,h.A)(m,[["render",f]]);var v=b},5510:function(e,t,n){e.exports=n.p+"img/zhuzh_logo.e9d1ce7e.png"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){n.amdO={}}(),function(){var e=[];n.O=function(t,o,r,i){if(!o){var a=1/0;for(u=0;u<e.length;u++){o=e[u][0],r=e[u][1],i=e[u][2];for(var s=!0,l=0;l<o.length;l++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[l])}))?o.splice(l--,1):(s=!1,i<a&&(a=i));if(s){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+(594===e?"about":e)+"."+{13:"3174c9fc",34:"7845acf6",51:"6ac49cf9",81:"27829455",134:"8aa8b5bd",394:"bf6b0f2e",414:"fbe933a0",461:"fdbdc4b2",462:"07ba5d55",463:"94254652",594:"49315007",624:"4c610bfa",705:"0cffc94b",715:"5bce1896",730:"7b269ab8",773:"2919bf62",896:"c69e35a4",947:"187d452b",991:"c3204d55"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{51:"0969d081",394:"f960c7f0",461:"9b95c2a5",715:"ab8ea160",730:"9e709a2f",896:"74e08261",991:"ce1ccffc"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="final-project:";n.l=function(o,r,i,a){if(e[o])e[o].push(r);else{var s,l;if(void 0!==i)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+i){s=d;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+i),s.src=o),e[o]=[r];var p=function(t,n){s.onerror=s.onload=null,clearTimeout(f);var r=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),r&&r.forEach((function(e){return e(n)})),t)return t(n)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),l&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/final-project/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,o,r,i){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",n.nc&&(a.nonce=n.nc);var s=function(n){if(a.onerror=a.onload=null,"load"===n.type)r();else{var o=n&&n.type,s=n&&n.target&&n.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+o+": "+s+")");l.name="ChunkLoadError",l.code="CSS_CHUNK_LOAD_FAILED",l.type=o,l.request=s,a.parentNode&&a.parentNode.removeChild(a),i(l)}};return a.onerror=a.onload=s,a.href=t,o?o.parentNode.insertBefore(a,o.nextSibling):document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){r=a[o],i=r.getAttribute("data-href");if(i===e||i===t)return r}},o=function(o){return new Promise((function(r,i){var a=n.miniCssF(o),s=n.p+a;if(t(a,s))return r();e(o,s,null,r,i)}))},r={524:0};n.f.miniCss=function(e,t){var n={51:1,394:1,461:1,715:1,730:1,896:1,991:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}}(),function(){var e={524:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=i);var a=n.p+n.u(t),s=new Error,l=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,r[1](s)}};n.l(a,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,a=o[0],s=o[1],l=o[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(l)var u=l(n)}for(t&&t(o);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(u)},o=self["webpackChunkfinal_project"]=self["webpackChunkfinal_project"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(9217)}));o=n.O(o)})();
//# sourceMappingURL=app.6a6dedac.js.map