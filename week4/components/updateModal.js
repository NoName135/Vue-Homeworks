import { apiUrl, apiPath } from '../../src/api.js';

// 上傳圖片元件
const upload = {
  props: ['index'],
  emits: ['changeImg'],
  template: `
    <slot name="main">
      <input type="file" class="form-control" @change="(e) => handleFile(e,'imageUrl')" />
    </slot>
    <slot name="multi">
      <input type="file" class="form-control" @change="(e) => handleFile(e, 'imagesUrl', index)" />
    </slot>
  `,
  methods: {
    // 上傳圖片
    handleFile(event, target, index) {
      // console.log(event, target, index);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);

      if (file) {
        axios
          .post(`${apiUrl}/api/${apiPath}/admin/upload`, formData)
          .then((res) => {
            // console.log(res.data);
            const imgUrl = res.data.imageUrl;
            this.$emit('changeImg', index, target, imgUrl);
          })
          .catch((err) => {
            // console.log(err);
            alert(err.response.data.message);
          });
      }
    },
  },
};

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
    isNew: Boolean,
    product: Object,
    page: Number,
  },
  template: '#updateProductModal',
  methods: {
    // 更新產品資料
    updateProduct(page) {
      let httpVerb = 'post';
      let url = `${apiUrl}/api/${apiPath}/admin/product`;

      if (!this.isNew) {
        httpVerb = 'put';
        url = `${apiUrl}/api/${apiPath}/admin/product/${this.product.id}`;
      }

      axios[httpVerb](url, {
        data: this.product,
      })
        .then((res) => {
          // console.log(res.data);
          alert(res.data.message);
          // productModal.hide();
          this.$emit('hide', 'updateProduct');
          this.$emit('update', page);
        })
        .catch((err) => {
          console.log(err);
          alert(err.response?.data.message);
        });
    },
    // 變更 product 圖片
    changeImage(index, target, imgUrl) {
      // 判斷上傳到主要圖片或多圖區塊
      if (index === undefined) {
        this.product[target] = imgUrl;
      } else {
        this.product[target][index] = imgUrl;
      }
    },
  },
  components: {
    upload,
  }
};
