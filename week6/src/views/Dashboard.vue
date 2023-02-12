<template>
  <div>
    <h1 class="text-center">你現在在後台頁面</h1>
    <div id="nav" class="text-center">
      <router-link to="/">回到前台</router-link> |
      <router-link to="/admin/products">後台產品列表</router-link> |
      <router-link to="/admin/orders">後台訂單</router-link> |
      <a href="#" @click.prevent="logOut">登出</a>
    </div>
    <div class="container">
      <router-view v-if="checkLogin"></router-view>
    </div>
  </div>
</template>

<script>
const { VITE_API } = import.meta.env;

export default {
  data() {
    return {
      checkLogin: false
    }
  },
  methods: {
    userCheck() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/, "$1"
      );
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`;
        // 登入驗證
        this.$http
          .post(`${VITE_API}/api/user/check`)
          .then(() => {
            this.checkLogin = true;
          })
          .catch((err) => {
            alert(err.response.data.message);
            this.$router.push("/login");
          });
      } else {
        alert("您尚未登入。");
        this.$router.push("/login");
      }
    },
    logOut() {
      document.cookie = "loginToken=;expires=;";
      this.$router.push("/login");
    },
  },
  mounted() {
    this.userCheck();
  }
}
</script>