import Radio from '../UI/Radio/Radio.vue'
import { ref, watch } from 'vue';

export default{
  name: 'SelectItem',
  components: {
    Radio
  },
  setup (props, { emit }) {
    const item = ref('');
    const opponentItem = ref('');
    const isSelectedItem = ref(false);
    const items = [
      {
        el: 'cross',
        oppEl: 'zero',
        title: 'Крестик'
      },
      {
        el: 'zero',
        oppEl: 'cross',
        title: 'Нолик'
      }
    ];
    const newVal = ref({})

    watch(newVal, (val) => {
      emit('onChoice', val)
    })      

    const setPlayerItem = (el, oppEl) => {
      item.value = el;
      opponentItem.value = oppEl
      isSelectedItem.value = true

      newVal.value = {
        playerEl: el,
        opponentEl: oppEl,
        isSelectedItem: true
      }
    }

    return {
      item,
      items,
      opponentItem,
      isSelectedItem,
      setPlayerItem
    }
  }  
}