<template>
  <div @click="clickOutsidePopup">
    <div class="wrapper">
      <board-field v-for="field in fields" :key="field.id" :id="field.id" :imageUrl="image_base_url + field.imageUrl" :chip="chipDic[field.id]"></board-field>
      <wall-text v-for="i in 3" :key="i" :id="i"></wall-text>
    </div>
    <button @click="roll" > Кинуть кубики </button>
    <roll-popup v-if="isRollPopup"
                :isOpen="isRollPopup"
                :dice1="dice1"
                :dice2="dice2"
                :image_base_url="static_url"
                :pos="pos"
                @closePopup="closeRollPopup"
                :error="error"
                :currentGame="currentGame"
                :msg="msg"
    />

  </div>
</template>

<script>
import boardField from "@/components/board-field";
import wallText from "@/components/wall-text";
import rollPopup from "@/components/roll-popup";
import {apiService} from "@/services/APIService";

export default {
  name: "game-board",
  props: ['fields', 'chips'],
  emits: {
    roll: null
  },
  data() {
    return {
      static_url: "http://localhost:8080/",
      image_base_url: "http://localhost:8080/static/field/",
      isRollPopup: false,
      dice1: "",
      dice2: "",
      currentGame: "",
      pos: null,
      error: false,
      msg: ""
    }
  },
  components: {
    boardField,
    wallText,
    rollPopup
  },
  computed: {
    chipDic() {
      let dic = {}

      for (let chip of this.chips) {
        dic[chip.pos] = []
      }
      for (let chip of this.chips) {
        dic[chip.pos].push(chip)
      }

      return dic
    },
  },
  methods: {
    roll() {
      apiService.getCurrentGame().then(response => {
        console.log(response)
        this.currentGame = response.data.current_game
      }).catch(error => {
        console.log(error)
      })
      apiService.roll().then(response => {
        this.dice1 = response.data.dice1
        this.dice2 = response.data.dice2
        this.pos = response.data.newPos
        this.$emit('roll')
        this.isRollPopup = true
        this.error = false
        this.msg = response.data.msg
        console.log("Запрос на ролл", response.data)
      }).catch(error => {
        console.log(error)
        if (error.response.status === 500 && error.response.data.error === "No Authorization Header Provided") {
          this.$router.push('/login')
        } else if (error.response.status === 500 && error.response.data.error === "You can't roll") {
          this.error = true
          this.isRollPopup = true
          this.pos = error.response.data.pos
        }
      })
    },
    closeRollPopup(game) {
      let payload = new FormData()
      payload.append('game', game)
      console.log(game)
      apiService.setCurrentGame(payload).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
      this.isRollPopup = false
    },
    clickOutsidePopup(event) {
      if (this.isRollPopup) {
        event.stopPropagation()
      }
    }
  }
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