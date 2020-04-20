<template>
  <div class="flex flex-wrap lg:flex-no-wrap justify-between items-center bg-white p-8 rounded-lg mb-2"
  >
    <div class="mr-8 mb-2 lg:mb-0">
      <h1 class="leading-snug  text-xl">

        <nuxt-link
          :to="'/snippets/'+snippet.uuid"
          class="text-gray-600"
        >
          {{snippet.title || "Untitled"}}
        </nuxt-link>
      </h1>

      <div class="text-gray-500 mr-6 font-medium">
        {{snippet.steps_count}} steps
      </div>
    </div>


    <div>
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SnippetCard",
    props: {
      snippet: {
        required: true,
        type: Object
      },
    },
  }
</script>

<style scoped>

</style>
