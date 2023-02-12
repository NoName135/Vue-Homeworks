<template>
  <div class="home">
    <h1 class="text-center">你現在在前台頁面</h1>
    <div id="nav" class="text-center">
      <router-link to="/">首頁</router-link> |
      <router-link to="/products">前台產品列表</router-link> |
      <router-link to="/cart">前台購物車</router-link> |
      <router-link to="/admin/products">後台管理列表</router-link>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
</script>