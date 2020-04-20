<template>
  <div class="container mt-24 mb-12">
    <div class="container flex justify-between flex-wrap lg:flex-no-wrap">
      <ul class="flex items-center mb-6 lg:mb-0">
        <li class="mr-16">
          <nuxt-link
            class="text-gray-500 text-sm mb-2 inline-block"
            :to="{
            name: 'index'
          }">
            Home
          </nuxt-link>
          <div class="text-gray-500 text-sm">
            &copy; Vasyl Dovhan
          </div>
        </li>
      </ul>
      <ul class="flex items-end">
        <li class="mr-8 w-full lg:w-auto">
          <a href="https://www.facebook.com/vasyl.dovhan.1"
             class="text-gray-500 text-sm"
             target="_blank"
             rel="noopener"
          >Facebook to connect</a>
        </li>
        <li class="mr-8 w-full lg:w-auto">
          <a href="#"
             class="text-gray-500 text-sm"
             target="_blank"
             rel="noopener"
          >Terms</a>
        </li>
        <li class="mr-8 w-full lg:w-auto">
          <a href="#"
             class="text-gray-500 text-sm"
             target="_blank"
             rel="noopener"
          >Policy</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>

</style>
