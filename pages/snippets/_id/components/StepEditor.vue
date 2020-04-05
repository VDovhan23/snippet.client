<template>
  <div>
    <textarea class="w-full"
              ref="textarea"
    ></textarea>
    <div class="bg-white p-8 rounded-lg text-gray-600 ">
      <StepMarkdown
        :value="step.body"
      />
    </div>
  </div>
</template>

<script>
  import StepMarkdown from "../../../../components/Snippets/StepMarkdown";

  export default {
    props: {
      step: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        codemirror: null
      }
    },
    name: "StepEditor",
    components: {StepMarkdown},
    computed: {
      document() {
        return this.codemirror.getDoc()
      }
    },
    mounted() {
      let CodeMirror = require('codemirror')

      this.codemirror = CodeMirror.fromTextArea(this.$refs.textarea, {});

      this.document.setValue(this.step.body)

      this.document.on('change', (document) => {

        this.$emit('input', document.getValue())
      })
    },
    watch: {
      'step.uuid'(newValue, oldValue) {
        this.document.setValue(this.step.body)
      }
    },
  }
</script>

<style lang="scss">

  .CodeMirror {
    @apply text-base w-full max-w-full border-dashed border-2 border-gray-400 mb-6 px-8 overflow-hidden;
  }

</style>
