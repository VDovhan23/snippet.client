<template>
  <a
    href="#"
    @click.prevent="deleteStep()"
    class="block mb-2 p-3 bg-blue-500 rounded-lg  lg:order-last order-first mr-2 lg:mr-0"
    title="Delete Step"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
  </a>

</template>

<script>
  export default {
    name: "addStepButton",
    props: {
      snippet: {
        type: Object,
        required: true
      },
      currentStep: {
        type: Object,
        required: true
      }
    },
    methods: {
      async deleteStep() {
        await this.$axios.$delete(`snippets/${this.snippet.uuid}/steps/${this.currentStep.uuid}`);

        this.$emit('deleted', this.currentStep)
      },
    }

  }
</script>

<style scoped>

</style>
