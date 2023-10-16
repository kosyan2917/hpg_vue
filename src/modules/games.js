export default {
    state: {
        currentGame: "",
    },
    getters : {
      getCurrentGame(state) {
          return state.currentGame
      }
    },
    mutations: {
        setCurrentGame(state, game) {
            state.currentGame = game
        }
    },
    actions : {
        async setGame() {

        }

    }
}