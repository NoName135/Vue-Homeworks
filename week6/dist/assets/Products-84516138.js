import{m as u,e as M,f as m,l as g,g as b,_ as C,o as a,c as n,a as t,t as d,h as r,i as S,v as E,j as V,k as P,F as y,n as B,b as f,r as _,p as L,q,d as A}from"./index-388b8486.js";import{M as D}from"./modal-f57a8a5f.js";import{p as U}from"./Pagination-cb2b1606.js";const H={data(){return{modal:"",qty:1}},methods:{...u(M,["addToCart"]),modalShow(){this.qty=1,this.modal.show()},modalHide(){this.modal.hide()}},computed:{...m(g,["loadings"]),...m(b,["tempProduct"])},mounted(){this.modal=new D(this.$refs.modal,{keyboard:!1,backdrop:"static"})}},N={class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},R={class:"modal-dialog modal-xl",role:"document"},j={class:"modal-content border-0"},z={class:"modal-header bg-dark text-white"},F={class:"modal-title",id:"exampleModalLabel"},O=t("button",{type:"button",class:"btn-close bg-white","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),G={class:"modal-body"},J={class:"row"},K={class:"col-sm-6"},Q=["src"],W={class:"col-sm-6"},X={class:"badge bg-primary rounded-pill"},Y={key:0,class:"h5"},Z={key:1,class:"h6"},x={key:2,class:"h5"},tt={class:"input-group"};function ot(o,e,l,i,c,p){return a(),n("div",N,[t("div",R,[t("div",j,[t("div",z,[t("h5",F,[t("span",null,d(o.tempProduct.title),1)]),O]),t("div",G,[t("div",J,[t("div",K,[t("img",{class:"img-fluid",src:o.tempProduct.imageUrl,alt:""},null,8,Q)]),t("div",W,[t("span",X,d(o.tempProduct.category),1),t("p",null,"商品描述："+d(o.tempProduct.description||"無"),1),t("p",null,"商品內容："+d(o.tempProduct.content||"無"),1),o.tempProduct.price?r("",!0):(a(),n("div",Y,d(o.tempProduct.origin_price)+" 元",1)),o.tempProduct.price?(a(),n("del",Z,"原價 "+d(o.tempProduct.origin_price)+" 元",1)):r("",!0),o.tempProduct.price?(a(),n("div",x,"現在只要 "+d(o.tempProduct.price)+" 元",1)):r("",!0),t("div",null,[t("div",tt,[S(t("input",{type:"number",class:"form-control",min:"1","onUpdate:modelValue":e[0]||(e[0]=h=>c.qty=h)},null,512),[[E,c.qty,void 0,{number:!0}]]),t("button",{type:"button",class:"btn btn-primary",onClick:e[1]||(e[1]=()=>{p.modalHide(),o.addToCart(o.tempProduct.id,c.qty)})},"加入購物車")])])])])])])])],512)}const et=C(H,[["render",ot]]),{VITE_API:v,VITE_PATH:k}={VITE_API:"https://vue3-course-api.hexschool.io/v2/",VITE_PATH:"weekhomeworks",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},$=V("userProducts",{state:()=>({products:[],pagination:{}}),actions:{getProducts(o=1){const e=`${v}/api/${k}/products?page=${o}`,{loadings:l}=g();l.isLoading=!0,P.get(e).then(i=>{const{products:c,pagination:p}=i.data;this.products=c,this.pagination=p,l.isLoading=!1}).catch(i=>{l.isLoading=!1,alert(i.response.data.message)})},getProduct(o){const{loadings:e}=g(),l=`${v}/api/${k}/product/${o}`;e.loadingId=o,e.loadingBtn="productDetail",P.get(l).then(i=>{e.loadingId="",e.loadingBtn="",this.tempProduct=i.data.product}).catch(i=>{e.loadingId="",e.loadingBtn="",alert(i.response.data.message)})}},getters:{}}),st={methods:{...u(b,["createUserProductModalRef"]),...u($,["getProducts","getProduct","addToCart"]),...u(M,["addToCart"]),...u(b,["openModal"])},computed:{...m(g,["loadings"]),...m($,["products","pagination"])},mounted(){const o=this.$refs.userProductModal;this.createUserProductModalRef(o),this.getProducts()},components:{userProductModal:et,pagination:U}},at={class:"table align-middle"},dt=t("thead",null,[t("tr",null,[t("th",null,"圖片"),t("th",null,"商品名稱"),t("th",null,"價格"),t("th")])],-1),nt={style:{width:"200px"}},it={key:0,class:"h5"},lt={key:1,class:"h6"},rt={key:2,class:"h5"},ct={class:"btn-group btn-group-sm"},ut=["disabled","onClick"],pt=["disabled","onClick"];function mt(o,e,l,i,c,p){const h=_("font-awesome-icon"),I=_("pagination"),T=_("user-product-modal");return a(),n(y,null,[t("table",at,[dt,t("tbody",null,[(a(!0),n(y,null,B(o.products,s=>(a(),n("tr",{key:s.id},[t("td",nt,[t("div",{style:L({height:"100px",backgroundSize:"cover",backgroundPosition:"center",backgroundImage:"url("+s.imageUrl+")"})},null,4)]),t("td",null,d(s.title),1),t("td",null,[s.price?r("",!0):(a(),n("div",it,d(s.origin_price)+" 元",1)),s.price?(a(),n("del",lt,"原價 "+d(s.origin_price)+" 元",1)):r("",!0),s.price?(a(),n("div",rt,"現在只要 "+d(s.price)+" 元",1)):r("",!0)]),t("td",null,[t("div",ct,[t("button",{type:"button",class:"btn btn-outline-secondary",disabled:o.loadings.loadingId===s.id,onClick:w=>o.openModal(s)}," 查看更多 ",8,ut),t("button",{type:"button",class:"btn btn-outline-danger",disabled:o.loadings.loadingId===s.id,onClick:w=>o.addToCart(s.id)},[o.loadings.loadingId===s.id?(a(),q(h,{key:0,icon:["fas","spinner"],spin:""})):r("",!0),A(" 加到購物車 ")],8,pt)])])]))),128))])]),f(I,{"page-obj":o.pagination,onEmitPage:o.getProducts},null,8,["page-obj","onEmitPage"]),f(T,{ref:"userProductModal"},null,512)],64)}const bt=C(st,[["render",mt]]);export{bt as default};
