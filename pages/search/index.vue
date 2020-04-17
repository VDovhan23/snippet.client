<template>
  <AisInstantSearchSsr>
    <div>
      <div class="bg-white mb-16">
        <div class="container py-10 pb-16">
          <div class="flex justify-between text-gray-600 mb-6 items-center">

            <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">
              Search
            </h1>

            <client-only>
              <AisPoweredBy/>
            </client-only>

          </div>
          <ais-search-box
            placeholder="Search snippets"
            :class-names="{
              'ais-SearchBox': 'w-full',
              'ais-SearchBox-input': 'w-full border-2 border-gray-200 rounded-lg block p-4 text-lg',
              'ais-SearchBox-submit': 'hidden',
              'ais-SearchBox-submitIcon': 'hidden',
              'ais-SearchBox-reset': 'hidden'
            }"
          />
        </div>
      </div>


      <div class="container">
        <AisStateResults>
          <div slot-scope="{query}">
            <template v-if="query.length">
              <AisStats>
                <h1
                  slot-scope="{nbHits}"
                  class="text-gray-600 text-xl font-medium mb-6">
                  Snippets ({{nbHits}})
                </h1>
              </AisStats>

              <ais-hits>
                <div slot="item" slot-scope="{item}">
                  <SearchSnippetCard :snippet="item.data"/>
                </div>
              </ais-hits>
            </template>
          </div>
        </AisStateResults>
      </div>
    </div>
  </AisInstantSearchSsr>
</template>

<script>
  import {
    AisHits,
    AisInstantSearchSsr,
    AisSearchBox,
    AisPoweredBy,
    AisStats,
    AisStateResults
  } from 'vue-instantsearch'

  import SearchSnippetCard from './components/SearchSnippetCard.vue'

  export default {
    name: "index",
    components: {
      SearchSnippetCard,
      AisHits,
      AisInstantSearchSsr,
      AisSearchBox,
      AisPoweredBy,
      AisStats,
      AisStateResults
    },
    head() {
      return {
        title: 'Search',
        instantSearchState: null
      }
    },

    provide() {
      return {
        $_ais: this.$instantsearch
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
