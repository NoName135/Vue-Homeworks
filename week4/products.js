import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { apiUrl, apiPath } from '../src/api.js';

import pagination from './components/pagination.js';
import updateModal from './components/updateModal.js';
import deleteModal from './components/deleteModal.js';

let productModal;
let delProductModal;

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      ascending: false,
      sortBy: '',
      pagination: {}
    };
  },
  methods: {
    // 登入驗證
    userCheck() {
      axios
        .post(`${apiUrl}/api/user/check`)
        .then((res) => {
          // console.log(res.data);
          this.getProducts();
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    },
    // 將產品加入 products
    getProducts(page = 1) {
      axios
        .get(`${apiUrl}/api/${apiPath}/admin/products?page=${page}`)
        .then((res) => {
          // console.log(res.data)
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
        });
    },
    // 判斷要打開的 Modal
    openModal(type, item) {
      if (type === 'new') {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
          is_enabled: 0,
        };
        productModal.show();
      } else if (type === 'edit') {
        this.isNew = false;
        const tempProduct = { ...item };
        if (tempProduct.imagesUrl) {
          this.tempProduct = { ...item };
        } else {
          this.tempProduct = { ...item, imagesUrl: [] };
        }
        productModal.show();
      } else if (type === 'delete') {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
    hideModal(target) {
      if(target === 'updateProduct'){
        productModal.hide();
      }else{
        delProductModal.hide();
      }
    }
  },
  computed: {
    sortProductsPrice() {
      if (this.sortBy === 'category') {
        return [...this.products].sort((a, b) => {
          return this.ascending
            ? a.category.localeCompare(b.category, 'zh-hant')
            : b.category.localeCompare(a.category, 'zh-hant');
        });
      } else if (this.sortBy) {
        return [...this.products].sort((a, b) => {
          return this.ascending
            ? a[this.sortBy] - b[this.sortBy]
            : b[this.sortBy] - a[this.sortBy];
        });
      } else {
        return this.products;
      }
    },
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common.Authorization = token;

    this.userCheck();

    // 建立新的 Modal
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
  },
  components: {
    pagination
  }
})

// 新增、編輯產品元件
app.component('updateProductModal', updateModal);
// 刪除產品元件
app.component('deleteProductModal', deleteModal);

app.mount('#app');
