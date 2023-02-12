<template>
  <div class="container">
    <div class="mt-5">
      <a class="btn btn-link" @click="$router.push('/')">回首頁</a>
    </div>
    <div class="mt-4">
      <V-form class="row justify-content-center" v-slot="{ errors }" @submit="login">
        <div class="col-md-6">
          <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
          <div class="mb-2">
            <label for="email" class="sr-only">Email address</label>
            <V-field
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              v-model="user.username"
              autofocus
              :class="['form-control', { 'is-invalid': errors['email'] }]" rules="required|email"
            >
            </V-field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-2">
            <label for="password" class="sr-only">Password</label>
            <V-field
              type="password"
              id="password"
              name="password"
              class="form-control"
              v-model="user.password"
              placeholder="Password"
              :class="['form-control', { 'is-invalid': errors['password'] }]" rules="required"
            >
            </V-field>
            <ErrorMessage name="password" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="text-end mt-4">
            <button class="btn btn-lg btn-primary btn-block" type="submit">
              登入
            </button>
          </div>
        </div>
      </V-form>
    </div>
  </div>
</template>

<script>
const { VITE_API } = import.meta.env;
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      const api = `${VITE_API}admin/signin`;
      this.$http
        .post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `loginToken=${token};expires=${new Date(expired)};`;
          this.$router.push("/admin/products");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
}
</script>