<template>
  <!-- v-slot 插槽 Props，將驗證結果的回饋資料帶入區塊 -->
  <V-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <V-field id="email" name="email" type="email" placeholder="請輸入 Email"
        :class="['form-control', { 'is-invalid': errors['email'] }]" rules="required|email">
      </V-field>
      <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label for="name" class="form-label">收件人姓名</label>
      <V-field id="name" name="姓名" type="text" placeholder="請輸入姓名"
        :class="['form-control', { 'is-invalid': errors['姓名'] }]" rules="required">
      </V-field>
      <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label for="tel" class="form-label">收件人電話 (09XXXXXXXX)</label>
      <V-field id="tel" name="電話" type="tel" placeholder="請輸入電話"
        :class="['form-control', { 'is-invalid': errors['電話'] }]" rules="required|phone">
      </V-field>
      <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label for="address" class="form-label">收件人地址</label>
      <V-field id="address" name="地址" type="text" placeholder="請輸入地址"
        :class="['form-control', { 'is-invalid': errors['地址'] }]" rules="required">
      </V-field>
      <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label for="message" class="form-label">留言</label>
      <V-field as="textarea" id="message" name="留言" class="form-control" cols="30" rows="10"></V-field>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-danger">送出訂單</button>
    </div>
  </V-form>
</template>

<script>
import { mapActions } from 'pinia';
import cartStore from '../stores/cartStore.js';

const { VITE_API, VITE_PATH } = import.meta.env

export default {
  methods: {
  ...mapActions(cartStore, ['getCart']),
  createOrder(values) {
    // console.log(values);
    const url = `${VITE_API}/api/${VITE_PATH}/order`;
    this.$http
      .post(url, {
        data: {
          user: {
            name: values['姓名'],
            email: values['email'],
            tel: values['電話'],
            address: values['地址'],
          },
          message: values['留言'],
        },
      })
      .then((response) => {
        alert(response.data.message);
        this.$refs.form.resetForm();
        this.getCart();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    },
  }
}
</script>