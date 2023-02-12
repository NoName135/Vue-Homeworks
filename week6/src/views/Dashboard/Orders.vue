<template>
  <h4 class="text-center">這裡是 後台 訂單列表</h4>
  <div class="table-responsive mt-4">
    <table class="table mt-4 text-nowrap">
      <thead>
          <tr>
              <th>訂單編號</th>
              <th>聯絡人</th>
              <th>聯絡地址</th>
              <th>電子郵件</th>
              <th>訂單品項</th>
              <th>訂單日期</th>
              <th>訂單狀態</th>
              <th>操作</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>
            <p>{{ order.user.name }}</p>
            <p>{{ order.user.tel }}</p>
          </td>
          <td>{{ order.user.address }}</td>
          <td>{{ order.user.email }}</td>
          <td>
            <div v-for="(item, key, i) in order.products" :key="i">
              {{ i+1 }}. {{ item.product.title }} x{{ item.qty }}
            </div>
          </td>
          <td>{{ new Date(order.create_at * 1000).getFullYear() }}/{{ new Date(order.create_at * 1000).getMonth()+1 }}/{{ new Date(order.create_at * 1000).getDate() }}</td>
          <td class="orderStatus">
            <a href="#" @click.prevent="changePaid(order.id)">{{ order.is_paid ? '已處理' : '未處理' }}</a>
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="delOrder(order.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 頁碼 -->
    <pagination :page-obj="pagination" @emit-page="getOrders"></pagination>
  </div>
</template>

<script>
import pagination from "../../components/Pagination.vue"
import loadingStore from "../../stores/loadingStore.js"
import { mapState } from "pinia"

const { VITE_API, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      orders: {},
      pagination: {}
    }
  },
  methods: {
    getOrders(page = 1) {
      this.loadings.isLoading = true;
      this.$http
        .get(`${VITE_API}/api/${VITE_PATH}/admin/orders?page=${page}`)
          .then((res) => {
            // console.log(res.data)
            const { orders, pagination } = res.data;
            this.orders = orders;
            this.pagination = pagination;
            this.loadings.isLoading = false;
          })
          .catch((err) => {
            // console.log(err);
            this.loadings.isLoading = false;
            alert(err.response.data.message);
          });
    },
    delOrder(id) {
      this.loadings.isLoading = true;
      this.$http
        .delete(`${VITE_API}/api/${VITE_PATH}/admin/order/${id}`)
          .then((res) => {
            // console.log(res.data)
            alert('已刪除訂單');
            this.getOrders(this.pagination.current_page);
            this.loadings.isLoading = false;
          })
          .catch((err) => {
            // console.log(err);
            alert(err.response.data.message);
            this.loadings.isLoading = false;
          });
    },
    changePaid(id){
      const orderItem = this.orders.find(item => item.id === id)

      this.loadings.isLoading = true;
      this.$http
        .put(`${VITE_API}/api/${VITE_PATH}/admin/order/${id}`, {
          data: {
            is_paid: !orderItem.is_paid
          }
        })
          .then((res) => {
            // console.log(res.data)
            alert('已變更付款狀態');
            this.getOrders(this.pagination.current_page);
            this.loadings.isLoading = false;
          })
          .catch((err) => {
            // console.log(err);
            alert(err.response.data.message);
            this.loadings.isLoading = false;
          });
    }
  },
  computed: {
    ...mapState(loadingStore, ['loadings'])
  },
  mounted() {
    this.getOrders();
  },
  components: {
    pagination
  }
}
</script>