<template>
  <div class="wrapper">
    <board-field v-for="field in fields" :key="field.id" :id="field.id" :imageUrl="image_base_url + field.imageUrl"></board-field>
    <wall-text v-for="i in 3" :key="i" :id="i"></wall-text>
  </div>
</template>

<script>
import boardField from "@/components/board-field";
import wallText from "@/components/wall-text";
export default {
  name: "game-board",
  props: ['fields'],
  data() {
    return {
      image_base_url: "http://localhost:8080/static/field/"
    }
  },
  components: {
    boardField,
    wallText
  },

}


</script>

<style scoped>
.wrapper {
  display: grid;
  height: 100vh;
  width: 75vw;
  margin: 0;
  grid-template-columns: calc(98%/11) calc(98%/11) calc(98%/11) calc(98%/11) calc(98%/11) calc(98%/11) calc(98%/11) calc(98%/11) calc(98%/11) calc(98%/11) calc(98%/11);
  grid-template-rows: calc(92%/11) calc(92%/11) calc(92%/11) calc(92%/11) calc(92%/11) calc(92%/11) calc(92%/11) calc(92%/11) calc(92%/11) calc(92%/11) calc(92%/11);

}
</style>