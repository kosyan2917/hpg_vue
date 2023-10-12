<template>
  <hpg-header :user="user.name" :role="user.role"/>
  <game-board :fields="fields"/>
</template>

<script>

// import boardField from "@/components/board-field";
import gameBoard from "@/components/board";
import hpgHeader from "@/components/hpg-header";
import {apiService} from "@/services/APIService";
export default {
  name: 'BoardView',
  components: {
    gameBoard,
    hpgHeader
  },
  data () {
    return {
      fields: [],
      user: {}
    }
  },
    mounted() {
    apiService.getBoard().then(response => {
      this.fields = response.data.fields;
      this.user = response.data.user;
      console.log(this.user)
    }).catch(error => {
      console.log(error.response)
      if (error.response.status === 403) {
        this.fields = error.response.data.fields;
        this.user = error.response.data.user;
      } else {
        this.$router.push('/login')
      }
    })
  }
}
</script>
<style scoped>

</style>