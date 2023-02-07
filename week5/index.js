import userProducts from './components/userProducts.js'
import userProductModal from './components/userProductModal.js'
import cart from './components/cart.js'
import orderForm from './components/orderForm.js';

import userProductsStore from './pinia/userProductsStore.js';
import modalStore from './pinia/modalStore.js';

const { createPinia, mapActions, mapState } = Pinia;

const app = Vue.createApp({
  mounted() {
    // 3. 初始化時先將 Modal DOM 存到 store
    const modal = this.$refs.userProductModal;
    this.createUserProductModalRef(modal);
  },
  methods: {
    // 2. 引入 store DOM 的函式
    ...mapActions(modalStore, ['createUserProductModalRef']),
  },
  computed: {
    ...mapState(userProductsStore, ['isLoading'])
  }
});

const pinia = createPinia();
app.use(pinia);
app.component('loading', VueLoading.Component);
app.component('userProducts', userProducts)
app.component('userProductModal', userProductModal);
app.component('cart', cart);
app.component('orderForm', orderForm);
app.mount('#app');