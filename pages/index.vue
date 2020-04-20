<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container flex py-16 lg:py-32">
        <div class="w-full lg:w-6/12">
          <h1 class="text-5xl font-medium text-gray-700 leading-tight mb-6">
            Browse and create mini step-by-step tutorials.
          </h1>

          <p class="text-xl text-gray-600 mb-12">
            Snippets are small collection of steps for you
          </p>

          <nuxt-link
            :to="{
              name: 'snippets-id',
              params:{id: 'babeeac3-0f95-4bc2-8e86-7198bde4cfa1'}
            }"
            class="inline-block text-lg py-3 px-5 bg-blue-500 text-white rounded-lg"
          >Example snippet &rarr;
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="container">
      <h1 class="text-gray-600 text-xl font-medium mb-6">Latest snippets</h1>


      <LatestSnippetCard
        v-for="snippet in snippets"
        :key="snippet.uuid"
        :snippet="snippet"
      />
    </div>

  </div>
</template>

<script>

  import LatestSnippetCard from "./home/components/LatestSnippetCard";

  export default {
    components: {
      LatestSnippetCard
    },

    async asyncData({app}) {
      let snippets = await app.$axios.$get('snippets?limit=10');

      return {
        snippets: snippets.data
      }
    },

    data() {
      return {
        snippets: []
      }
    },

    head() {
      return {
        title: 'Snippets tutorial',
        titleTemplate: null
      }
    }
  }
</script>
