<template>
  <slot name="main">
    <input type="file" class="form-control" @change="(e) => handleFile(e,'imageUrl')" />
  </slot>
  <slot name="multi">
    <input type="file" class="form-control" @change="(e) => handleFile(e, 'imagesUrl', index)" />
  </slot>
</template>

<script>
import axios from 'axios';
const { VITE_API, VITE_PATH} = import.meta.env;

export default {
  props: ['index'],
  emits: ['changeImg'],
  methods: {
    // 上傳圖片
    handleFile(event, target, index) {
      // console.log(event, target, index);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', file);

      if (file) {
        axios
          .post(`${apiUrl}/api/${apiPath}/admin/upload`, formData)
          .then((res) => {
            // console.log(res.data);
            const imgUrl = res.data.imageUrl;
            this.$emit('changeImg', index, target, imgUrl);
          })
          .catch((err) => {
            // console.log(err);
            alert(err.response.data.message);
          });
      }
    },
  }
}
</script>