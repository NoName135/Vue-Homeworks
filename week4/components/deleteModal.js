import { apiUrl, apiPath } from "../../src/api.js";

export default {
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
    page: Number,
  },
  template: '#deleteProductModal',
  methods: {
    // 刪除產品資料
    deleteProduct(page) {
      axios
        .delete(`${apiUrl}/api/${apiPath}/admin/product/${this.product.id}`)
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          // delProductModal.hide();
          this.$emit('hide', 'delProduct');
          this.$emit('update', page);
        })
        .catch((err) => {
          // console.log(err);
          alert(err.response.data.message);
        });
    },
  }
};
