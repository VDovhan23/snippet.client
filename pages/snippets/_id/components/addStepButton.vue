<template>
  <a
    href="#"
    @click.prevent="addStep"
    class="block mb-2 p-3 bg-blue-500 rounded-lg  lg:order-last order-first mr-2 lg:mr-0"
    :title="'Add Step ' + position"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
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
      },
      position: {
        type: String,
        required: true
      },
    },
    methods: {
      async addStep() {
        await this.$axios.post(`snippets/${this.snippet.uuid}/steps`, { [this.position] : this.currentStep.uuid})

          .then((res) => {
            this.$emit('added', res.data.data);

          })
          .catch((error) => {
            console.log('error', error);
          })


      }
    },

  }
</script>

<style scoped>

</style>
