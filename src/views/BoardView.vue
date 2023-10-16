<template>
  <hpg-header :user="user.name" :role="user.role"/>
  <game-board :fields="fields" :chips="users" @roll="roll"/>
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
    hpgHeader,
  },
  data () {
    return {
      base_url: "http://localhost:8080",
      fields: [],
      user: {},
      users: [],
    }
  },
  methods: {
    getFields() {
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
    },
    getUsers() {
      apiService.getUsers().then(response => {
        if (response.data === null) {
          this.users = []
        } else {
          this.users = response.data;
          console.log(this.users)
        }
      }).catch(error => {
        this.users = error.response.data;
        console.log(error.response)
      })
    },
    roll() {
      this.getUsers()
    },
  },
  mounted() {
    this.getFields()
    this.getUsers()
  }
}
</script>
<style scoped>

</style>