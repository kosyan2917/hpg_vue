<template>
  <div>
    <h1>Login</h1>
    <p> {{correct}}</p>
    <p v-if="correct === false">Incorrect username or password</p>
    <form>
      <label for="email">Email</label>
      <input type="text" id="email" name="email" v-model="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="password">
      <button type="submit" @click="login">Login</button>
    </form>
  </div>
</template>

<script>
import {apiService} from "@/services/APIService";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      correct: true
    }
  },
  methods: {
    login() {
      event.preventDefault()
      apiService.login(this.email, this.password).then(response => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('refresh', response.data.refresh_token)
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
        if (error.response.data.error === "email or password is incorrect") {
          this.correct = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>