<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container py-10 pb-16">
        <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4"> {{user.name}}</h1>

        <div class="text-gray-600"> Member since {{joined}}</div>
      </div>
    </div>


    <div class="container mt-16">

      <h1 class="text-gray-600 text-xl font-medium mb-6">Public snippets ({{snippets.length}})</h1>


      <snippet-card
        v-for="snippet in snippets"
        :snippet="snippet"
        :key="snippet.uuid"
      />

    </div>


  </div>
</template>

<script>
  import moment from 'moment'
  import SnippetCard from "../../components/Snippets/SnippetCard";
  export default {
    components: {SnippetCard},
    data() {
      return {
        user: null,
        snippets: []
      }
    },
  computed:{
      joined(){
        return moment(this.user.joined).format('Do MMMM YYYY')
      }
  },
    head(){
      return {
        title : `Snippets by - ${this.user.name}`
      }
    },
    async asyncData({app, params}) {
      let user = await app.$axios.$get(`users/${params.id}`);
      let snippets = await app.$axios.$get(`users/${params.id}/snippets`);

      return  {
        user: user.data,
        snippets: snippets.data
      }
    }
  }
</script>

<style scoped>

</style>

