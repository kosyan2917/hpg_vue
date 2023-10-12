<template>
  <template v-if="correct">
    <h1> {{username}}</h1>
    <div>
      <img :src="avatar_path+avatar" alt="avatar" >
      <input type="file" accept="image/*" id="file-input"  @change="newAvatar($event)">
      <button @click="changeAvatar">Change</button>

    </div>
    <div class="inline">
      <h2>Color</h2>
      <input type="color" v-model="color">
      <button @click="changeColor">Change</button>
    </div>
    <h2>Items</h2>
    <div v-for="item in items" :key="item.id">
      <h3>{{item.name}}</h3>
      <img :src="item.image" alt="item">
    </div>
    <h2>Effects</h2>
    <div v-for="effect in effects" :key="effect.id">
      <h3>{{effect.name}}</h3>
      <img :src="effect.image" alt="effect">
    </div>
  </template>
  <template v-else>
    <h1>Возникла ошибка, хз че тебе делать, напиши мне в лс что ли</h1>
  </template>
</template>

<script>
import {apiService} from "@/services/APIService";

export default {
  name: "MeVue",
  data() {
    return {
      avatar_path: "http://localhost:8080",
      username: "",
      avatar: null,
      color: "",
      items: [],
      effects: [],
      correct : true,
      image: null
    }
  },
  mounted() {
    apiService.getMe().then(response => {
      this.username = response.data.username;
      this.avatar = response.data.avatar;
      this.color = response.data.color;
      this.items = response.data.items;
      this.effects = response.data.effects;
    }).catch(error => {
      console.log(error.response)
      if (error.response.data.error === "No Authorization Header Provided") {
        this.$router.push('/login')
      } else {
        this.correct = false
      }
    })
  },
  methods: {
    changeColor() {
      let color = new FormData()
      color.append('color', this.color)
      apiService.changeColor(color).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error.response)
      })
    },
    newAvatar(e) {
      this.image = e.target.files[0]
      console.log(this.image)
    },
    changeAvatar() {
      if (this.image === null) {
        alert("Choose image")
        return
      }
      let image = new FormData()
      image.append('file', this.image)
      image.append('name', this.image.name)
      apiService.changeAvatar(image).then(response => {
        console.log(response)
        if (response.status === 200) {
          this.avatar = response.data.avatar
          window.location.reload()
        }
      }).catch(error => {
        console.log(error.response)
      })
    }
  }
}
</script>

<style scoped>
  .inline * {
    padding-right: 10px;
    display: inline-block;
  }
</style>