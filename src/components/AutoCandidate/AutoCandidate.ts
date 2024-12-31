import { ref } from 'vue'

export default {
  setup() {
    const checked = ref(false)

    return {
      checked,
    }
  },
}
