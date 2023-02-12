<template>
  <h4 class="text-center">這裡是 後台 產品列表</h4>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openModal('new')">
      建立新的產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th
          width="120"
          style="cursor: pointer"
          @click="
            sortBy = 'category';
            ascending = sortBy === 'category' ? !ascending : true;
          "
        >
          分類
          <template v-if="sortBy === 'category'">
            <span v-if="ascending">▲</span>
            <span v-else>▼</span>
          </template>
        </th>
        <th>產品名稱</th>
        <th
          width="120"
          style="cursor: pointer"
          @click="
            sortBy = 'origin_price';
            ascending = sortBy === 'origin_price' ? !ascending : true;
          "
        >
          原價
          <template v-if="sortBy === 'origin_price'">
            <span v-if="ascending">▲</span>
            <span v-else>▼</span>
          </template>
        </th>
        <th
          width="120"
          style="cursor: pointer"
          @click="
            sortBy = 'price';
            ascending = sortBy === 'price' ? !ascending : true;
          "
        >
          售價
          <template v-if="sortBy === 'price'">
            <span v-if="ascending">▲</span>
            <span v-else>▼</span>
          </template>
        </th>
        <th
          width="100"
          style="cursor: pointer"
          @click="
            sortBy = 'is_enabled';
            ascending = sortBy === 'is_enabled' ? !ascending : true;
          "
        >
          是否啟用
          <template v-if="sortBy === 'is_enabled'">
            <span v-if="ascending">▲</span>
            <span v-else>▼</span>
          </template>
        </th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in sortProductsPrice" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-end">{{ product.origin_price }}</td>
        <td class="text-end">{{ product.price }}</td>
        <td>
          <span class="text-success" v-if="product.is_enabled">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', product)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', product)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 頁碼 -->
  <pagination :page-obj="pagination" @emit-page="getProducts"></pagination>
  <!-- Modals -->
  <product-modal ref="productModal"></product-modal>
  <delete-modal ref="deleteModal"></delete-modal>
</template>

<script>
import productModal from "../../components/ProductModal.vue"
import deleteModal from "../../components/DeleteModal.vue"
import pagination from "../../components/Pagination.vue"

import { mapActions,mapState } from 'pinia';
import productsStore from '../../stores/Dashboard/productsStore.js';
import modalStore from "../../stores/Dashboard/modalStore.js";

export default {
  data() {
    return {
      ascending: false,
      sortBy: "",
    }
  },
  methods: {
    // 2. 引入 store DOM 的函式
    ...mapActions(modalStore, ['createProductModalRef', 'createDeleteModalRef', 'openModal']),
    ...mapActions(productsStore, ['getProducts'])
  },
  computed: {
    ...mapState(productsStore, ['products', 'pagination']),
    sortProductsPrice() {
      if (this.sortBy === "category") {
        return [...this.products].sort((a, b) => {
          return this.ascending
            ? a.category.localeCompare(b.category, "zh-hant")
            : b.category.localeCompare(a.category, "zh-hant");
        });
      } else if (this.sortBy) {
        return [...this.products].sort((a, b) => {
          return this.ascending
            ? a[this.sortBy] - b[this.sortBy]
            : b[this.sortBy] - a[this.sortBy];
        });
      } else {
        return this.products;
      }
    }
  },
  mounted() {
    // 3. 初始化時先將 Modal DOM 存到 store
    const productModal = this.$refs.productModal;
    this.createProductModalRef(productModal);
    const deleteModal = this.$refs.deleteModal;
    this.createDeleteModalRef(deleteModal);
    // 渲染 products
    this.getProducts();
  },
  components: {
    productModal,
    deleteModal,
    pagination
  }
}
</script>
