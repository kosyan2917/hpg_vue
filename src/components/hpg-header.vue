<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">HPG</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02"
              aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="/">Поле</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Инвентарь</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Текущая цель</a>
          </li>
        </ul>
        <ul v-if="user==='guest'" class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/login" class="nav-link">Вход</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/register" class="nav-link">Регистрация</RouterLink>
          </li>
        </ul>
        <ul v-else class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/me" class="nav-link">{{ user }}</RouterLink>
          </li>
          <li>
            <a class="nav-link" @click="logout" href="/">Выход</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "hpg-header",
  props: ['user', 'role'],
  mounted() {
    console.log(this.user)
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
nav {
  height: 50px;
}
</style>