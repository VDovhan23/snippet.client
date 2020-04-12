<template>
  <snippet-card

    :snippet="snippet"
  >
   <ul class="flex items-end text-gray-600">
     <li class="mr-6">
       <nuxt-link
         :to="{name: 'snippets-id-edit', params: {id: snippet.uuid}}">Edit</nuxt-link>
     </li>
     <li>
       <a href="#" @click.prevent="deleteSnippet">Delete</a>
     </li>
   </ul>

  </snippet-card>
</template>

<script>
import SnippetCard from "../../../components/Snippets/SnippetCard";
  export default {
    props: {
      snippet: {
        required: true,
        type: Object
      },
    },
    components: {SnippetCard},
    name: "DashboardSnippetCard",
    methods: {
    async  deleteSnippet() {
       if (!window.confirm('You sure')){
         return
       }

      await this.$axios.$delete(`snippets/${this.snippet.uuid}`);

      this.$emit('deleted', this.snippet)

      }
    },
  }
</script>

<style scoped>

</style>

