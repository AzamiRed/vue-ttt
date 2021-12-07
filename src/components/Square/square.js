import { ref, computed, watch, toRefs } from 'vue';
import { useStore } from 'vuex'

export default {
  name: 'Square',
  props: {
    elem: String,
    oppElem: String,
    id: Number,
    player: Number,
    isActive: Boolean,
    isClicked: Boolean
  },
  setup (props, { emit }) {
    const store = useStore();
    const { elem, oppElem, id, player, isActive, isClicked } = toRefs(props);

    const data = computed(() => store.getters.GET_SQUARES);
    const isOppMove = ref(false);

    watch(isOppMove, (val) => {
      emit('onActive', val)
    })

    const randomTurn = (object) => {
      var keys = Object.keys(object);
      return object[keys[Math.floor(keys.length * Math.random())]];
    }

    const setMove = (player, id, elem, isActive) => {
      store.commit('SET_PLAYER_TURN', {
        player: player,
        id: id,
        elem: elem,
        isActive: isActive
      });
    }

    const changeSquare = () => {
      setMove(1, id.value, elem.value, false)
      const el = data.value.filter((item) => !item.isClicked && item.isActive)
      const randomItem = randomTurn(el)

      isOppMove.value = true

      setTimeout(() => {
        if (el) {
          setMove(2, randomItem.id, oppElem.value, false); 
          isOppMove.value = false 
        } 
      }, 500)   
    }

    return {
      elem, 
      oppElem, 
      id, 
      player, 
      isActive, 
      isClicked,
      data,
      isOppMove,
      changeSquare
    }
  }
}