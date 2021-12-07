export default {
  name: 'Radio',
  data: () => {
    return {
      isChecked: false
    }
  },
  props: {
    elem: String,
    title: String,
    onChange: Function,
    onInput: Function
  }
}