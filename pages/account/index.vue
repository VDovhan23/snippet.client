<template>
  <div class="container mt-16">
    <!--    <a href="" @click.prevent="submit()">Login</a>-->
    <div class="flex flex-col items-center">

      <h1 class="text-3xl text-gray-700 font-medium mb-10">{{$auth.user.name}}</h1>


      <div class="w-full md:w-6/12 lg:w-6/12 mb-6">
        <div class="text-red-500 mb-4 text-sm mt-1" v-if="validation"> {{validation}}</div>
        <form action="#" @submit.prevent="submit()"
              class="mb-6">
          <div class="mb-6">
            <label for="email" class="block text-gray-600 font-medium mb-2">Email: </label>

            <input type="text" name="email" id="email"
                   class="border-2 border-gray-400 block w-full p-3"
                   v-model="form.email"
            >


          </div>
          <div class="mb-6">
            <label for="name" class="block text-gray-600 font-medium mb-2">name: </label>

            <input type="text" name="name" id="name"
                   class="border-2 border-gray-400 block w-full p-3"
                   v-model="form.name"
            >


          </div>
          <div class="mb-6">
            <label for="username" class="block text-gray-600 font-medium mb-2">username: </label>

            <input type="text" name="username" id="username"
                   class="border-2 border-gray-400 block w-full p-3"
                   v-model="form.username"
            >


          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-600 font-medium mb-2">Password: </label>

            <input type="password" name="email" id="password"
                   class="border-2 border-gray-400 block w-full p-3"
                   v-model="form.password"
            >
            <div class="text-sm text-gray-500">
              Optional
            </div>
          </div>


          <div class="mb-6">
            <button type="submit"
                    class="bg-blue-500 text-white p-4 rounded text-center font-medium"
            >Update
            </button>
          </div>
        </form>

        <nuxt-link :to="{name: 'author-id', params:{id: $auth.user.username}}">View your public profile</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "account",
    data() {
      return {
        form: {
          email: this.$auth.user.email,
          name: this.$auth.user.name,
          username: this.$auth.user.username,
          password: ''
        },
        validation: null
      }
    },
    head() {
      return {
        title: 'Account'
      }
    },
    methods: {
      async submit() {
        try {
          await this.$axios.patch(`users/${this.$auth.user.username}`, this.form)
          await this.$auth.fetchUser()
        } catch (e) {
          this.validation = e.response.data.message;
        }
      }
    },
  }
</script>

<style scoped>

</style>
