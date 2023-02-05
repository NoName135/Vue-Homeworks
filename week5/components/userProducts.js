import { apiUrl, apiPath } from '../../src/api.js';
import userPagination from './userPagination.js';
import loadingStore from '../pinia/loadingStore.js';
import userProductsStore from '../pinia/userProductsStore.js';
import cartStore from '../pinia/cartStore.js'

const { mapActions, mapState } = Pinia;

export default {
  template: `
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" key="product.id">
        <td style="width: 200px">
          <div :style="{height: '100px', backgroundSize: 'cover', backgroundPosition: 'center',
            backgroundImage: 'url('+product.imageUrl+')'}">
          </div>
        </td>
        <td>
          {{ product.title }}
        </td>
        <td>
          <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
          <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
          <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary"
              :disabled="loadings.loadingId === product.id" @click="getProduct(product.id)">
              <i class="fas fa-spinner fa-pulse"
                v-if="loadings.loadingBtn === 'productDetail' && loadings.loadingId === product.id">
              </i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger"
              :disabled="loadings.loadingId === product.id" @click="addToCart(product.id)">
              <i class="fas fa-spinner fa-pulse"
                v-if="loadings.loadingBtn === 'addToCart' && loadings.loadingId === product.id"></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 頁碼 -->
  <user-pagination :page-obj="pagination" @emit-page="getProducts"></user-pagination>`,
  emits: ['product', 'openModal'],
  data() {
    return {
      tempProduct: {},
    };
  },
  methods: {
    ...mapActions(userProductsStore, [
      'getProducts',
      'getProduct',
      'addToCart',
    ]),
    ...mapActions(cartStore, ['addToCart']),
    getProduct(id) {
      const url = `${apiUrl}/api/${apiPath}/product/${id}`;
      this.loadings.loadingId = id;
      this.loadings.loadingBtn = 'productDetail';
      axios
        .get(url)
        .then((res) => {
          // console.log(res.data);
          this.loadings.loadingId = '';
          this.loadings.loadingBtn = '';
          this.tempProduct = res.data.product;
          this.$emit('product', this.tempProduct);
          this.$emit('openModal');
        })
        .catch((err) => {
          this.loadings.loadingId = '';
          this.loadings.loadingBtn = '';
          alert(err.response.data.message);
        });
    },
  },
  computed: {
    ...mapState(loadingStore, ['loadings']),
    ...mapState(userProductsStore, ['products', 'pagination']),
  },
  mounted() {
    this.getProducts();
  },
  components: {
    userPagination,
  },
};
