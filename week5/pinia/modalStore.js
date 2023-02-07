const { defineStore } = Pinia;

export default defineStore('modalStore', {
  state: () => {
    return {
      userProductModal: {},
      tempProduct: {},
    };
  },
  actions: {
    // 1. 建立儲存 DOM 函式
    createUserProductModalRef(refObj) {
      this.userProductModal = refObj;
    },
    // 開啟 Modal 將產品資料暫存到 store
    openModal(product) {
      this.userProductModal.modalShow();
      this.tempProduct = product;
    },
    // 隱藏 Modal
    hideModal() {
      this.userProductModal.modalHide();
    },
  },
  getters: {},
});
