<template>
  <snippet-card

    :snippet="snippet"
  >
    <nuxt-link
      :to="{
         name: 'author-id', params:{id: snippet.author.data.username}
      }"
    >
      {{snippet.author.data.name}}
    </nuxt-link>

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
    name: "LatestSnippetCard"
  }
</script>

<style scoped>

</style>

