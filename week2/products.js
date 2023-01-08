import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = {
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'weekhomeworks', // 自己的 API 路徑
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    // 登入驗證
    userCheck() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then((res) => {
          // console.log(res)
          this.getProducts();
        })
        .catch((err) => {
          // console.log(err)
          alert(err.response.data.message)
          window.location = 'login.html';
        })
    },
    // 取得產品資料
    getProducts() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          // console.log(res)
          this.products = res.data.products;
        })
        .catch((err) => {
          // console.log(err)
          alert(err.response.data.message);
        })
    },
    // 查看細節按鈕
    chooseProduct(item) {
      this.tempProduct = item;
    }
  },
  mounted() {
    // 取出 Token
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie#示例_3_只执行某事一次
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // defaults 每次都會帶入
    axios.defaults.headers.common.Authorization = token;

    this.userCheck()
  }
}

createApp(app).mount('#app');
