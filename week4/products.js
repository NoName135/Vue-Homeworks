import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal;
let delProductModal;

const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'weekhomeworks',
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
        .post(`${this.apiUrl}/api/user/check`)
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
        .get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`)
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
  }
})

// 頁碼元件
app.component('pagination', {
  props: {pageObj: Object},
  template: '#pagination',
  methods: {
    changePage(page){
      this.$emit('emitPage', page)
    }
  }
})

// 上傳圖片元件
const upload = {
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'weekhomeworks',
    };
  },
  props: ['index'],
  template: `
    <slot name="main">
      <input type="file" class="form-control" @change="(e) => handleFile(e,'imageUrl')" />
    </slot>
    <slot name="multi">
      <input type="file" class="form-control" @change="(e) => handleFile(e, 'imagesUrl', index)" />
    </slot>
  `,
  methods: {
    // 上傳圖片
    handleFile(event, target, index) {
      // console.log(event, target, index);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);

      if (file) {
        axios
          .post(`${this.apiUrl}/api/${this.apiPath}/admin/upload`, formData)
          .then((res) => {
            // console.log(res.data);
            // 判斷上傳到主要圖片或多圖區塊
            const imgUrl = res.data.imageUrl;
            this.$emit('changeImg', index, target, imgUrl);
          })
          .catch((err) => {
            // console.log(err);
            alert(err.response.data.message);
          });
      }
    },
  },
};

// 新增、編輯產品元件
app.component('updateProductModal', {
  props: {
    url: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
    isNew: Boolean,
    product: Object,
    page: Number,
  },
  template: '#updateProductModal',
  methods: {
    // 更新產品資料
    updateProduct(page) {
      let httpVerb;
      let url;

      if (this.isNew) {
        httpVerb = 'post';
        url = `${this.url}/api/${this.path}/admin/product`;
      } else {
        httpVerb = 'put';
        url = `${this.url}/api/${this.path}/admin/product/${this.product.id}`;
      }
      axios[httpVerb](url, {
        data: this.product,
      })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          productModal.hide();
          this.$emit('update', page);
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
        });
    },
    // 變更 product 圖片
    changeImage(index, target, imgUrl){
      if (index === undefined) {
        this.product[target] = imgUrl;
      } else {
        this.product[target][index] = imgUrl;
      }
    }
  },
  mounted() {
    // 建立新的 Modal
    productModal = new bootstrap.Modal(
      document.querySelector('#productModal'),
      {
        keyboard: false,
        backdrop: 'static',
      }
    );
  },
  components: {
    upload
  },
});

// 刪除產品元件
app.component('deleteProductModal', {
  props: {
    url: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
    product: Object,
    page: Number
  },
  template: '#deleteProductModal',
  methods: {
    // 刪除產品資料
    deleteProduct(page) {
      axios
        .delete(
          `${this.url}/api/${this.path}/admin/product/${this.product.id}`
        )
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          delProductModal.hide();
          this.$emit('update', page);
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    // 建立新的 Modal
    delProductModal = new bootstrap.Modal(
      document.querySelector('#delProductModal'),
      {
        keyboard: false,
      }
    );
  },
});

app.mount('#app');
