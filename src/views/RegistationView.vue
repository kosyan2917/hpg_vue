<template>
  <div>
    <h1>Register</h1>
    <form>
      <label for="username">Username</label>
      <input type="text" id="username" name="username" v-model="username">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="password">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" v-model="email">
      <button type="submit" @click="register">Register</button>
    </form>
  </div>
</template>

<script>
import {apiService} from "@/services/APIService";

export default {
  name: "RegistationView",
  data() {
    return {
      username: "",
      password: "",
      email: "",
    }
  },
  methods: {
    register() {
      event.preventDefault()
      apiService.register(this.email, this.username, this.password).then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('refresh', response.data.refresh_token)
        this.$router.push('/')
      }).catch(error => {
        console.log(error.response.data)
      })
    }
  }
}
</script>

<style scoped>

</style>