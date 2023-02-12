<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ tempProduct.title }}</span>
          </h5>
          <button type="button" class="btn-close bg-white"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ tempProduct.category }}</span>
              <p>商品描述：{{ tempProduct.description || '無'}}</p>
              <p>商品內容：{{ tempProduct.content || '無' }}</p>
              <div class="h5" v-if="!tempProduct.price">{{ tempProduct.origin_price }} 元</div>
              <del class="h6" v-if="tempProduct.price">原價 {{ tempProduct.origin_price }} 元</del>
              <div class="h5" v-if="tempProduct.price">現在只要 {{ tempProduct.price }} 元</div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control" min="1" v-model.number="qty">
                  <button type="button" class="btn btn-primary" @click="() =>{modalHide(); addToCart(tempProduct.id, qty)}">加入購物車</button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import loadingStore from "../stores/loadingStore.js";
import cartStore from '../stores/cartStore.js';
import modalStore from '../stores/modalStore.js';

import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: '',
      qty: 1,
    };
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),

    modalShow() {
      this.qty = 1;
      this.modal.show();
    },
    modalHide() {
      this.modal.hide();
    },
  },
  computed: {
    ...mapState(loadingStore, ['loadings']),
    ...mapState(modalStore, ['tempProduct']),
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static',
    });
  }
};
</script>
