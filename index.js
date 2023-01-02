import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      // console.log(this.user)
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(api, this.user)
        .then((res) => {
          // console.log(res)
          const { token, expired } = res.data;
          // 將 token 加入 cookie
          // expires 設置 cookie 有效時間
          document.cookie = `loginToken=${token}; expires=${new Date(expired)}; path=/`;
          window.location = 'products.html';
        })
        .catch((err) => {
          // console.log(err)
          alert(err.response.data.message);
        });
    },
  },
}).mount('#app');