import axios from "axios";

import loadingStore from "./loadingStore.js";
import modalStore from "./modalStore.js";

import { defineStore } from "pinia";

const { VITE_API, VITE_PATH } = import.meta.env;

export default defineStore("cartItems", {
  state: () => {
    return {
      isLoading: false,
      cart: {},
    };
  },
  actions: {
    getCart() {
      const url = `${VITE_API}/api/${VITE_PATH}/cart`;
      const { loadings } = loadingStore();
      loadings.isLoading = true;
      axios
        .get(url)
        .then((res) => {
          // console.log(res.data);
          this.cart = res.data.data;
          loadings.isLoading = false;
        })
        .catch((err) => {
          loadings.isLoading = false;
          alert(err.response.data.message);
        });
    },
    addToCart(id, qty = 1) {
      const { loadings } = loadingStore();
      const { hideModal } = modalStore();

      const url = `${VITE_API}/api/${VITE_PATH}/cart`;
      loadings.loadingId = id;
      loadings.loadingBtn = "addToCart";
      axios
        .post(url, {
          data: {
            product_id: id,
            qty: qty,
          },
        })
        .then((res) => {
          // console.log(res.data);
          loadings.loadingId = "";
          loadings.loadingBtn = "";
          alert("已加入購物車");
        })
        .catch((err) => {
          loadings.loadingId = "";
          loadings.loadingBtn = "";
          alert(err.response.data.message);
        });
    },
    deleteCart(id) {
      const { loadings } = loadingStore();
      const url = id
        ? `${VITE_API}/api/${VITE_PATH}/cart/${id}`
        : `${VITE_API}/api/${VITE_PATH}/carts`;
      loadings.loadingCartId = id;
      axios
        .delete(url)
        .then((res) => {
          // console.log(res.data);
          loadings.loadingCartId = "";
          this.getCart();
          if (id) {
            alert("已從購物車移除商品");
          } else {
            alert("已清空購物車");
          }
        })
        .catch((err) => {
          loadings.loadingCartId = "";
          alert(err.response.data.message);
        });
    },
    updateCart(data, qty) {
      const { loadings } = loadingStore();
      const url = `${VITE_API}/api/${VITE_PATH}/cart/${data.id}`;

      const cartItem = this.cart.carts.find((item) => item.id === data.id);
      if(cartItem.qty == qty) {
        return
      }else{
        cartItem.qty = qty * 1;
      }

      loadings.loadingCartId = data.id;
      axios
        .put(url, {
          data: {
            product_id: data.product_id,
            qty: cartItem.qty,
          },
        })
        .then((res) => {
          // console.log(res.data);
          loadings.loadingCartId = "";
          this.getCart();
          alert("已更新商品數量");
        })
        .catch((err) => {
          loadings.loadingCartId = "";
          alert(err.response.data.message);
        });
    },
  },
  getters: {},
});
