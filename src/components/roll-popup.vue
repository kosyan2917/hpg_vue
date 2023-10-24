<template>
  <div class="bg" @click="stopOutside">
    <div v-if="isOpen" class="popup" @click="stopOutside">
      <div class="popup-inner" >
        <div v-if="!error">
          <h1> Выпало: </h1>
          <img :src="image_base_url + dice1" style="width: 100px; height: 100px; object-fit: cover">
          <img :src="image_base_url + dice2" style="width: 100px; height: 100px; object-fit: cover">
          <h2> Вы попали на клетку: "{{name}}"</h2>
          <div v-if="params.type==='common'">
            <p > Перейдите на этот <a href="https://gamegauntlets.com/" target="_blank" rel="noopener noreferrer">сайт</a>,
              сделайте ролл по следующим  правилам и введите название игры в поле:</p>
            <ul>
              <li v-if="params.high"> Время прохождения от {{params.low}} до {{params.high}} часов</li>
              <li v-if="params.tags"> Тэги для игры: {{params.tags}}</li>
              <li v-if="params.games"> Ролл из следующего списка игр: {{params.games}}</li>
              <li v-if="params.rating"> Рейтинг игры {{params.rating}}</li>
              <li v-if="params.condition"> Ролл по следующим условиям: {{params.condition}}</li>
            </ul>
            <input v-model="newGame" :class="input_style" type="text" placeholder="Введите название игры" name="game">
          </div>
          <div v-if="params.type === 'program'">
            <p>{{msg}}</p>
            <p > Перейдите на этот <a href="https://gamegauntlets.com/" target="_blank" rel="noopener noreferrer">сайт</a>,
              сделайте ролл по следующим  правилам и введите название игры в поле:</p>
            <ul>
              <li v-if="params.high"> Время прохождения от {{params.low}} до {{params.high}} часов</li>
              <li v-if="params.tags"> Тэги для игры: {{params.tags}}</li>
              <li v-if="params.games"> Ролл из следующего списка игр: {{params.games}}</li>
              <li v-if="params.rating"> Рейтинг игры {{params.rating}}</li>
              <li v-if="params.condition"> Ролл по следующим условиям: {{params.condition}}</li>
            </ul>

          </div>

        <button @click="closePopup"> Ок </button>
        </div>
        <div v-if="error">
          <template v-if="currentGame === ''">
            <h1> У вас после прошлого броска не установлена игра</h1>
            <div v-if="params.type==='common'">
              <p> {{msg}} </p>
              <p > Перейдите на этот <a href="https://gamegauntlets.com/" target="_blank" rel="noopener noreferrer">сайт</a>,
                сделайте ролл по следующим правилам и введите название игры в поле:</p>
              <ul>
                <li v-if="params.high"> Время прохождения от {{params.low}} до {{params.high}} часов</li>
                <li v-if="params.tags"> Тэги для игры: {{params.tags}}</li>
                <li v-if="params.games"> Ролл из следующего списка игр: {{params.games}}</li>
                <li v-if="params.rating"> Рейтинг игры {{params.rating}}</li>
                <li v-if="params.condition"> Ролл по следующим условиям: {{params.condition}}</li>
              </ul>
              <input v-model="newGame" :class="input_style" type="text" placeholder="Введите название игры" name="game">
            </div>
            <button @click="closePopup"> Ок </button>
          </template>
          <template v-else>
            <h1> У вас уже есть активная игра {{currentGame}}. </h1>
            <p> Пройдите ее, прежде чем снова бросать кубик.
              Чтобы отметить игру как пройденную, нажмите кнопку "пройдено" у себя в профиле </p>
            <button @click="closePopupWithoutGame"> Ок </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {apiService} from "@/services/APIService";

export default {
  name: "roll-popup",
  props: {
    image_base_url: String,
    dice1: String,
    dice2: String,
    isOpen: Boolean,
    pos: Number,
    error: Boolean,
    currentGame: String,
    msg: String
  },
  emits: {
    closePopup: null
  },
  data() {
    return {
      newGame: "",
      name: "",
      params: {},
      pseudo_style: {},
      input_style : {}
    }
  },
  methods: {
    stopOutside(event) {
      console.log("stopOutside")
      event.stopPropagation()
    },
    closePopup() {
      // console.log("closePopup", this.newGame)
      if (this.newGame !== "") {
        this.$emit('closePopup', this.newGame)
      } else {
        this.input_style = "input_field"
        this.pseudo_style = "pseudo"
      }
      if (this.params.type === "program") {
        this.$emit('closePopup', this.newGame)
      }
    },
    closePopupWithoutGame() {
      this.$emit('closePopup', this.currentGame)
    }
  },
  mounted() {
    apiService.getField(this.pos).then(response => {
      console.log(response.data)
      this.name = response.data.name
      this.params = response.data
      console.log("Тип:", this.params.type)
      if (this.params.type === "program") {
        console.log("Я залез, тут пусто")
        if (this.name === "Тюрьма") {
          apiService.getField(this.pos-1).then(response => {
            this.params = response.data
          })
        } else if (this.name === "Подлянка/Кайфарик") {
          'Добавим попозже'
        } else {
          apiService.getField(this.pos+1).then(response => {
            this.params = response.data
          })
        }
      }
      console.log("После ифов парамсы", this.params)
    })
  }

}
</script>

<style scoped>
  .input_field {
    border: 1px solid red;
  }

  .bg {
    width: 100%;
    height: 150%;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .popup {
    position: absolute;
    top: 10%;
    left:20%;
    width: 50%;

  }
  .popup-inner {
    display: block;
    background-color: aliceblue;
    height: 40%;
    padding-top: 10%;
    padding-bottom: 10%;
  }
  .popup-inner img {
    padding-right: 10px;
  }

</style>