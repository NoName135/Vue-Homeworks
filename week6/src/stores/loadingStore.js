import { defineStore } from "pinia";

export default defineStore('loading', {
  state: () => {
    return {
      loadings: {
        isLoading: false,
        loadingId: '',
        loadingCartId: ''
      }
    };
  },
  actions: {
  },
  getters: {},
});
