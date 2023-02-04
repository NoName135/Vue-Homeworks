import userProducts from './components/userProducts.js'
import userProductModal from './components/userProductModal.js'
import cart from './components/cart.js'
import orderForm from './components/orderForm.js';

const { createPinia } = Pinia;
const app = Vue.createApp({
  data() {
    return {
      tempProduct: {},
    };
  },
  methods: {
    openProductModal() {
      this.$refs.userProductModal.openModal();
    },
    changeProduct(product) {
      this.tempProduct = product;
    },
  }
});

const pinia = createPinia();
app.use(pinia);

app.component('userProducts', userProducts)
app.component('userProductModal', userProductModal);
app.component('cart', cart);
app.component('orderForm', orderForm);
app.mount('#app');