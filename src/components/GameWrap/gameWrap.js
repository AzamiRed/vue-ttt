import SelectItem from '../SelectItem/SelectItem.vue'
import PlayingField from '../PlayingField/PlayingField.vue'
import GameInfo from '../GameInfo/GameInfo.vue'
import { ref, computed } from 'vue';
import { useStore } from 'vuex'

export default {
  name: 'GameWrap',
  components: {
    SelectItem,
    PlayingField,
    GameInfo
  },
  setup () {
    const store = useStore();
    const playerItem = ref('');
    const opponentItem = ref('');
    const isSelectedItem = ref(false);
    const isPlay = computed(() => store.getters.GET_IS_PLAY);
    const winner = computed(() => store.getters.GET_IS_WINNER);

    const saveItems = (val) => {
      playerItem.value = val.playerEl
      opponentItem.value = val.opponentEl
      isSelectedItem.value = val.isSelectedItem
      
      store.commit('SET_IS_PLAY', false)
    }

    return {
      playerItem,
      opponentItem,
      isSelectedItem,
      isPlay,
      winner,
      saveItems
    }
  }
}