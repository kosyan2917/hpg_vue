<template>
  <div v-for="item in info" :key="item._id">
    <p>{{item.name}}</p>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "board-field",
  props: ['id', 'points', ],
  data() {
    return {
      info: "azaza"
    }
  },
  mounted() {
    axios
        .get('http://localhost:8080/board')
        .then(response => (this.info = response.data.data.fields));
  }
}


</script>

<style scoped>

</style>