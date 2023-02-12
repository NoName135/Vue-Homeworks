import axios from "axios";

import loadingStore from "./loadingStore.js";
import { defineStore } from "pinia";

const { VITE_API, VITE_PATH } = import.meta.env;

export default defineStore("userProducts", {
  state: () => {
    return {
      products: [],
      pagination: {},
    };
  },
  actions: {
    getProducts(page = 1) {
      const url = `${VITE_API}/api/${VITE_PATH}/products?page=${page}`;
      const { loadings } = loadingStore();
      loadings.isLoading = true;
      axios
        .get(url)
        .then((res) => {
          // console.log(res);
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
          loadings.isLoading = false;
        })
        .catch((err) => {
          loadings.isLoading = false;
          alert(err.response.data.message);
        });
    },
    getProduct(id) {
      const { loadings } = loadingStore();
      const url = `${VITE_API}/api/${VITE_PATH}/product/${id}`;
      loadings.loadingId = id;
      loadings.loadingBtn = "productDetail";
      axios
        .get(url)
        .then((res) => {
          // console.log(res.data);
          loadings.loadingId = "";
          loadings.loadingBtn = "";
          this.tempProduct = res.data.product;
        })
        .catch((err) => {
          loadings.loadingId = "";
          loadings.loadingBtn = "";
          alert(err.response.data.message);
        });
    },
  },
  getters: {},
});
