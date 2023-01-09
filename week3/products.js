import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal;
let delProductModal;

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'weekhomeworks',
      products: [],
      tempProduct: {},
      isNew: false,
      ascending: false,
      sortBy: ''
    };
  },
  methods: {
    // 登入驗證
    userCheck() {
      axios.post(`${this.apiUrl}/api/user/check`)
        .then(res => {
          // console.log(res.data);
          this.getProducts();
        })
        .catch(err => {
          // console.log(err);
          alert(err.response.data.message);
          window.location = 'login.html';
        })
    },
    // 將產品加入 products
    getProducts() {
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
        .then(res => {
          // console.log(res.data)
          this.products = res.data.products;
        })
        .catch(err => {
          console.log(err);
          alert(err.response.data.message);
        })
    },
    // 判斷要打開的 Modal
    openModal(type, item) {
      if(type === 'new'){
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
          is_enabled: 0
        };
        productModal.show();
      }else if(type === 'edit'){
        this.isNew = false;
        const tempProduct = {...item}
        if (tempProduct.imagesUrl) {
          this.tempProduct = { ...item };
        } else {
          this.tempProduct = { ...item, imagesUrl: [] };
        }
        productModal.show();
      }else if(type === 'delete'){
        this.tempProduct = {...item}
        delProductModal.show();
      }
    },
    // 更新產品資料
    updateProduct(){
      let httpVerb;
      let url;

      if(this.isNew){
        httpVerb = 'post';
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      }else{
        httpVerb = 'put';
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
      }
      axios[httpVerb](url, {
        data: this.tempProduct
      })
        .then(res => {
          // console.log(res.data);
          alert(res.data.message);
          productModal.hide();
          this.getProducts();
        })
        .catch(err => {
          // console.log(err);
          alert(err.response.data.message);
        })
    },
    // 刪除產品資料
    deleteProduct(){
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          delProductModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
        });
    }
  },
  computed: {
    sortProductsPrice() {
      if(this.sortBy){
        return [...this.products].sort((a, b) => { return this.ascending ? a[this.sortBy] - b[this.sortBy] : b[this.sortBy] - a[this.sortBy] });
      }else{
        return this.products;
      }
    }
  },
  mounted() {
    // 建立新的 Modals
    productModal = new bootstrap.Modal(
      document.querySelector('#productModal'),
      {
        keyboard: false,
        backdrop: 'static',
      }
    );
    delProductModal = new bootstrap.Modal(
      document.querySelector('#delProductModal'),
      {
        keyboard: false,
      }
    );
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,'$1');
    axios.defaults.headers.common.Authorization = token;

    this.userCheck();
  },
}).mount('#app');
