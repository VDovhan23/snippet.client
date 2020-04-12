<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container py-10 pb-16">
        <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4"> Browse</h1>
      </div>
    </div>


    <div class="container mt-16">

      <h1 class="text-gray-600 text-xl font-medium mb-6">All snippets ({{snippets.length}})</h1>


      <BrowseSnippetCard
           v-for="(snippet, index) in snippets"
           :key="index"
           :snippet="snippet"
      />
    </div>


  </div>
</template>

<script>
  import BrowseSnippetCard from "./components/BrowseSnippetCard";


  export default {
    name: "index",
    components: {BrowseSnippetCard},
    data() {
      return {
        snippets: []
      }
    },

    head(){
      return {
        title: 'Browse',
      }
    },
    async asyncData({app}) {
      let snippets = await app.$axios.$get('snippets');

      return {
        snippets: snippets.data
      }
    }
  }
</script>

<style scoped>

</style>
