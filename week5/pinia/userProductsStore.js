import { apiUrl, apiPath } from '../../src/api.js';
import loadingStore from '../pinia/loadingStore.js';

const { defineStore } = Pinia;

export default defineStore('userProducts', {
  state: () => {
    return {
      isLoading: false,
      products: [],
      pagination: {},
    };
  },
  actions: {
    getProducts(page = 1) {
      const url = `${apiUrl}/api/${apiPath}/products?page=${page}`;
      this.isLoading = true;
      axios
        .get(url)
        .then((res) => {
          // console.log(res);
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          alert(err.response.data.message);
        });
    },
    getProduct(id) {
      const { loadings } = loadingStore();
      const url = `${apiUrl}/api/${apiPath}/product/${id}`;
      loadings.loadingId = id;
      loadings.loadingBtn = 'productDetail';
      axios
        .get(url)
        .then((res) => {
          // console.log(res.data);
          loadings.loadingId = '';
          loadings.loadingBtn = '';
          this.tempProduct = res.data.product;
        })
        .catch((err) => {
          loadings.loadingId = '';
          loadings.loadingBtn = '';
          alert(err.response.data.message);
        });
    },
  },
  getters: {},
});
