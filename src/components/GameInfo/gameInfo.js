import { toRefs } from 'vue';
import { useStore } from 'vuex'

export default {
  name: 'GameInfo',
  props: {
    title: String,
    isShow: Boolean
  },
  setup (props) {
    const store = useStore();
    const { title, isShow } = toRefs(props);

    const changeGameStatus = () => {
      store.dispatch('CREATE_SQUARES')
      store.commit('SET_IS_PLAY', false)
    }

    return {
      title,
      isShow,
      changeGameStatus
    }
  } 
}