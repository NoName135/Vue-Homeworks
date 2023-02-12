<template>
  <div id="delProductModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger"></strong> {{tempProduct.title}} (刪除後無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct(pagination.current_page)">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import modalStore from '../stores/Dashboard/modalStore.js';
import productsStore from '../stores/Dashboard/productsStore.js';

import Modal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: '',
    };
  },
  methods: {
    modalShow() {
      this.modal.show();
    },
    modalHide() {
      this.modal.hide();
    },
  },
  computed: {
    ...mapState(modalStore, ['tempProduct', 'deleteProduct']),
    ...mapState(productsStore, ['pagination'])
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static',
    });
  },
}
</script>