export default {
  props: { pageObj: Object },
  emits: ['emitPage'],
  template: '#pagination',
  methods: {
    changePage(page) {
      this.$emit('emitPage', page);
    },
  }
};
