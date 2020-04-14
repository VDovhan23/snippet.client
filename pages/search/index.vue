<template>
  <AisInstantSearchSsr>
    <div>
      <div class="bg-white mb-16">
        <div class="container py-10 pb-16">
          <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4"> Search</h1>
        </div>
      </div>


      <div class="container mt-16">

        <h1 class="text-gray-600 text-xl font-medium mb-6">Snippets </h1>


      </div>


    </div>
  </AisInstantSearchSsr>
</template>

<script>
  import {
    AisInstantSearchSsr
  } from 'vue-instantsearch'

  export default {
    name: "index",
    components: {AisInstantSearchSsr},
    head() {
      return {
        title: 'Search',
        instantSearchState: null
      }
    },

    provide(){
      return {
        $_ais : this.$instantsearch
      }
    },

    beforeMount() {
      this.$instantsearch.hydrate(this.instantSearchState)
    },

    async asyncData({app}) {
      const instantsearch = app.$instantsearch;

      return instantsearch
        .findResultsState({
          hitsPerPage: 20
        })
        .then(() => {
          return {
            instantSearchState: instantsearch.getState()
          }
        })
        .catch((error) => {
          console.log('error', error);
        })
    }

  }
</script>

<style scoped>

</style>
