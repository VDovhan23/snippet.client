<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container py-10 pb-16">
        <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4"> Browse</h1>
      </div>
    </div>


    <div class="container mt-16">

      <h1 class="text-gray-600 text-xl font-medium mb-6">All snippets ({{snippets.length}})</h1>

      <a href="" @click.prevent="createSnippet()">+ Create Snippet</a>

    <div v-if="snippets.length === 0" class="text-gray-500 font-medium">
      There are no snippets. You know what to do.
    </div>

      <DashboardSnippetCard
        v-for="(snippet, index) in snippets"
        :key="index"
        :snippet="snippet"
        @deleted="removeSnippet"
      />
    </div>


  </div>
</template>

<script>
  import DashboardSnippetCard from "./components/DashboardSnippetCard";
  export default {
    components: {DashboardSnippetCard},
    methods: {
      async createSnippet() {
        await this.$axios.post('snippets')
          .then((res) => {
            this.$router.push({
              name: 'snippets-id-edit',
              params: {
                id: res.data.data.uuid
              }
            })
          })
          .catch((error) => {
            console.log('error', error);
          });
      },
      removeSnippet(snippet){
        this.snippets =  this.snippets.filter((s)=>s.uuid !== snippet.uuid  )
      }
    },
    data() {
      return {
        snippets: []
      }
    },

    async asyncData({app}) {
      let snippets = await app.$axios.$get('snippets/me');

      return {
        snippets: snippets.data
      }
    }
  }
</script>

<style scoped>

</style>
