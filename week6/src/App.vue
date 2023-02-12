<template>
  <VueLoading :active="loadings.isLoading"></VueLoading>
  <router-view />
</template>

<script>
import { mapState } from 'pinia';
import loadingStore from './stores/loadingStore';

export default {
  computed: {
    ...mapState(loadingStore, ['loadings'])
  }
}
</script>

<style lang="scss">
@import "./assets/all.scss";
</style>
