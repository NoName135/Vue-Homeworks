import { apiUrl, apiPath } from '../../src/api.js';

const { defineStore } = Pinia;

export default defineStore('userProducts', {
  state: () => {
    return {
      products: [],
      pagination: {},
    };
  },
  actions: {
    getProducts(page = 1) {
      const url = `${apiUrl}/api/${apiPath}/products?page=${page}`;
      axios
        .get(url)
        .then((res) => {
          // console.log(res);
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  },
  getters: {},
});
