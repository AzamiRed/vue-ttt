import Square from '../Square/Square.vue';
import { ref, computed, watch, toRefs, onMounted } from 'vue';
import { useStore } from 'vuex'
 
export default {
  name: 'PlayingField',
  components: {
    Square
  },
  props: {
    playerEl: String,
    oppEl: String,
  },
  setup (props) {
    const store = useStore();
    const { playerEl, oppEl } = toRefs(props);
    const squares = computed(() => store.getters.GET_SQUARES);
    const winValues = computed(() => store.getters.GET_WINNERS);
    const playerSet = ref(new Set());
    const oppSet = ref(new Set());
    const playerMoves = ref([]);
    const oppMoves = ref([]);
    const playerWinLength = ref(0);
    const oppWinLength = ref(0);
    const isPlay = computed(() => store.getters.GET_IS_PLAY);
    const isOppMove = ref(false);

    onMounted(() => {
      store.dispatch('CREATE_SQUARES');
    })

    const setResult = (playerWinLength, oppWinLength, winner) => {
      store.commit('SET_RESULTS', { 
        playerWins: playerWinLength,
        opponentWins: oppWinLength,
        lastWinner: winner
      })
    }

    const changeMoves = (winArrs, playerArrs, player) => {
      winArrs.forEach((group) => {
        if (Array.isArray(playerArrs)) {
          if (group.reduce((acc, el) => acc && playerArrs.includes(el), true)) {  
            store.commit('SET_IS_PLAY', true)                     
            if (player === 1) {
              setResult(playerWinLength.value++, oppWinLength.value, 'Игрок')
              store.commit('SET_IS_WINNER', player)
            } else {
              setResult(playerWinLength.value, oppWinLength.value++, 'Бот')
              store.commit('SET_IS_WINNER', player)
            }
          }
        }
      })
    }

    const clearData = () => {
      playerSet.value.clear()
      oppSet.value.clear()
      playerMoves.value = []
      oppMoves.value = []
    }

    const changeActive = (value) => {
      isOppMove.value = value
    }

    watch(squares, (val) => {
      val.forEach(item => {  
        if (item.player === 1) {
          playerSet.value.add(item.id);
          playerMoves.value = Array.from(playerSet.value);
          changeMoves(winValues.value, playerMoves.value, item.player)
        } else if (item.player === 2) {
          oppSet.value.add(item.id);
          oppMoves.value = Array.from(oppSet.value);
          changeMoves(winValues.value, oppMoves.value, item.player)
        }
      });        
    }, { 
      deep: true
    })

    watch(isPlay, (val) => {
      if (!val) {
        clearData()
      }
    })

    return {
      playerEl, 
      oppEl,
      squares,
      winValues,
      playerSet,
      oppSet,
      playerMoves,
      oppMoves,
      playerWinLength,
      oppWinLength,
      isPlay,
      isOppMove,
      changeActive,
    }
  }
}