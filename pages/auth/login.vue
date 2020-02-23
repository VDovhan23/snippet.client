<template>
  <div class="container mt-16">
    <!--    <a href="" @click.prevent="submit()">Login</a>-->
    <div class="flex flex-col items-center">

      <h1 class="text-3xl text-gray-700 font-medium mb-10">Hello</h1>


      <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation"> {{validation}}</div>
      <form action="#" @submit.prevent="submit()"
            class="bg-white p-8 rounded w-full md:w-6/12 lg:w-6/12 mb-6 ">
        <div class="mb-6">
          <label for="email" class="block text-gray-600 font-medium mb-2">Email: </label>

          <input type="text" name="email" id="email"
                 class="border-2 border-gray-400 block w-full p-3"
                 v-model="form.email"
          >


        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-600 font-medium mb-2">Password: </label>

          <input type="password" name="email" id="password"
                 class="border-2 border-gray-400 block w-full p-3"
                 v-model="form.password"
          >

        </div>

        <div class="mb-6">
          <button type="submit"
                  class="bg-blue-500 text-white p-4 rounded text-center font-medium block w-full"
          >Login
          </button>
        </div>
      </form>
      <div class="text-center text-gray-600">
        No account?
        <nuxt-link :to="{name: 'index'}"> Register</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        validation: null
      }
    },
    head() {
      return {
        title: 'Login'
      }
    },
    methods: {
      async submit() {
        try {
          await this.$auth.loginWith('local', {
            data: this.form
          })
        } catch (e) {
          this.validation = e.response.data.message;
        }
      }
    },
  }
</script>

<style scoped>

</style>
