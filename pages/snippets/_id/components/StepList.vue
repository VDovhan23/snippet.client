<template>
  <ul>
    <li v-for="(step, index) in steps"
        class="mb-1"
        :key="index">
      <nuxt-link :to="{
        query: {
         step : step.uuid
        }
      }"
      :class="{'font-bold' : step.uuid === currentStep.uuid}">
        {{index + 1}}. {{step.title || 'Untitled step'}}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
    export default {
      name: "StepList",
      props: {
        steps: {
          required: true,
          type: Array
        },
        currentStep:{
          type: Object
        }
      },
    }
</script>

<style scoped>

</style>

