export default {
  props: { pageObj: Object },
  template: '#pagination',
  methods: {
    changePage(page) {
      this.$emit('emitPage', page);
    },
  },
};