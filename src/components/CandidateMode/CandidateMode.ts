import { defineComponent, type SetupContext } from 'vue'

interface CandidateModeProps {
  candidateMode: boolean
}

export default defineComponent({
  emits: ['mode-changed'],
  props: {
    candidateMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setActiveMode(candidateMode: boolean) {
      const toggleActive: string =
        candidateMode === true ? 'candidate-candidate-mode' : 'normal-candidate-mode'
      const toggleInActive: string =
        candidateMode === true ? 'normal-candidate-mode' : 'candidate-candidate-mode'

      document.getElementById(toggleActive)?.classList.add('active')
      document.getElementById(toggleInActive)?.classList.remove('active')
    },
  },
  setup(props: CandidateModeProps, ctx: SetupContext) {
    function handleClick(candidateMode: boolean) {
      ctx.emit('mode-changed', candidateMode)
    }

    return {
      handleClick,
    }
  },
  watch: {
    candidateMode: {
      handler: function (newValue: boolean) {
        this.setActiveMode(newValue)
      },
      deep: true,
    },
  },
  mounted() {
    this.setActiveMode(this.$props.candidateMode)
  },
})
