import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      squares: [],
      winners: [
        [0, 1, 2], 
        [0, 4, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [2, 4, 6], 
        [3, 4, 5], 
        [6, 7, 8]
      ],
      results: {
        playerWins: 0,
        opponentWins: 0,
        lastWinner: 'Отсутствует'
      },
      isPlay: false,
      winner: 0,
    }
  },
  mutations: {
    SET_SQUARES_STATE (state, payload) {
      state.squares = payload
    },
    SET_PLAYER_TURN (state, payload) {
      state.squares.forEach((item) => {
        if (item.id === payload.id) {
          item.player = payload.player
          item.isClicked = true
          item.elem = payload.elem
          item.isActive = payload.isActive
        }
      })
    },
    SET_RESULTS (state, payload) {
      state.results = payload
    },
    SET_IS_PLAY (state, payload) {
      
      state.isPlay = payload
    },
    SET_IS_WINNER (state, payload) {
      state.winner = payload
    }
  },
  actions: {
    CREATE_SQUARES (context) {
      let newState = []
      for (let i = 0; i <= 8; i++) {            
        newState.push({
            player: 0,
            id: i,
            isActive: true,
            isClicked: false,
            elem: 'null'
        })
      }
      context.commit('SET_SQUARES_STATE', newState)
    }
  },
  getters: {
    GET_SQUARES (state) {
      return state.squares
    },
    GET_WINNERS (state) {
      return state.winners
    },
    GET_IS_PLAY (state) {
      return state.isPlay
    }, 
    GET_IS_WINNER (state) {
      return state.winner
    }    
  }
})

export default store;