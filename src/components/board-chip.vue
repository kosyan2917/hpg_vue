<template>
  <div class="rounded" :style="style">
    <img :src="imageUrl" style="width:25px; object-fit: cover">
  </div>
</template>

<script>
export default {
  name: "board-chip",
  props: ['color', 'imageUrl'],
  computed: {
    style() {
      return {
        border: `3px solid ${this.color}`
      }
    }
  }
}
</script>

<style scoped>
  .rounded {
    border-radius: 50px !important;
    width: 30px;
    height: 30px;
    overflow: hidden;
  }
</style>