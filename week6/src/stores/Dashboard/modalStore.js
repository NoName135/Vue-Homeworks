import axios from "axios";

import { defineStore } from "pinia";
import productsStore from "../Dashboard/productsStore.js";

const { VITE_API, VITE_PATH } = import.meta.env;
const { getProducts } = productsStore();

export default defineStore("modalStore", {
  state: () => {
    return {
      productModal: {},
      delProductModal: {},
      isNew: false,
      tempProduct: {},
    };
  },
  actions: {
    // 1. 建立儲存 DOM 函式
    createProductModalRef(refObj) {
      this.productModal = refObj;
    },
    createDeleteModalRef(refObj) {
      this.delProductModal = refObj;
    },
    // 判斷要打開的 Modal
    openModal(type, item) {
      if (type === "new") {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
          is_enabled: 0,
        };
        this.productModal.modalShow();
      } else if (type === "edit") {
        this.isNew = false;
        const tempProduct = { ...item };
        if (tempProduct.imagesUrl) {
          this.tempProduct = { ...item };
        } else {
          this.tempProduct = { ...item, imagesUrl: [] };
        }
        this.productModal.modalShow();
      } else if (type === "delete") {
        this.tempProduct = { ...item };
        this.delProductModal.modalShow();
      }
    },
    // 隱藏 Modal
    hideModal(target) {
      if (target === "updateProduct") {
        this.productModal.modalHide();
      } else {
        this.delProductModal.modalHide();
      }
    },
    // 更新產品資料
    updateProduct(page) {
      let httpVerb = "post";
      let url = `${VITE_API}/api/${VITE_PATH}/admin/product`;

      if (!this.isNew) {
        httpVerb = "put";
        url = `${VITE_API}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
      }

      axios[httpVerb](url, {
        data: this.tempProduct,
      })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          this.productModal.modalHide();
          getProducts(page);
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response?.data.message);
        });
    },
    // 刪除產品資料
    deleteProduct(page) {
      axios
        .delete(`${VITE_API}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          this.delProductModal.modalHide();
          getProducts(page);
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
        });
    },
  },
  getters: {},
});
