<template>
  <div class="container mt-16">
    <div class="flex justify-between">

      <h1 class="text-gray-600 text-xl font-medium mb-6">Your snippets (1)</h1>

      <a href="" @click.prevent="createSnippet()">+ Create Snippet</a>
    </div>
  </div>
</template>

<script>
  export default {
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
      }
    },
  }
</script>

<style scoped>

</style>
