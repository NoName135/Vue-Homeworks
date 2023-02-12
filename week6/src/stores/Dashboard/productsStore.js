import axios from "axios";

import loadingStore from "../../stores/loadingStore.js";
import { defineStore } from "pinia";

const { VITE_API, VITE_PATH } = import.meta.env;

export default defineStore("products", {
  state: () => {
    return {
      products: [],
      pagination: {},
    };
  },
  actions: {
    getProducts(page = 1) {
      const { loadings } = loadingStore();
      loadings.isLoading = true;
      axios
        .get(`${VITE_API}/api/${VITE_PATH}/admin/products?page=${page}`)
        .then((res) => {
          // console.log(res.data)
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
          loadings.isLoading = false;
        })
        .catch((err) => {
          // console.log(err);
          loadings.isLoading = false;
          alert(err.response.data.message);
        });
    },
  },
  getters: {},
});
