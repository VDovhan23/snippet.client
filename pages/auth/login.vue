<template>
  <div  class="container mt-16">
    <a href="" @click.prevent="submit()">Login</a>
  </div>
</template>

<script>
  export default {
    name: "login",
    methods: {
     async submit() {
        await this.$auth.loginWith('local', {
          data:{
            'email' : 'waselews1@gmail.com',
            'password' : '11223344',
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>
