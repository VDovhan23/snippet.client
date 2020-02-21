<template>
  <div class="flex items-center bg-white py-8 lg:py-0">
    <div class="container flex items-center flex-wrap lg:flex-no-wrap">
      <nuxt-link class="mr-10 flex-shrink-0"
                 :to="{name: 'home'}"
      >
        <img src="../assets/img/logo.png" alt="logo" class="h-12">
      </nuxt-link>

      <a href="#"@click="mobileOpen = !mobileOpen" class="lg:hidden ml-auto">
        open
      </a>

      <div class="w-full flex "
      :class="{'hidden lg:flex': !mobileOpen, 'mt-8': mobileOpen}">
        <ul class="lg:h-24 lg:flex items-center w-full lg:w-auto">
          <li >
            <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                       :to="{name: 'home'}"
            >
              Browse
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                       :to="{name: 'home'}"
            >Search
            </nuxt-link>
          </li>

        </ul>
        <ul class="lg:h-24 lg:flex items-center w-full lg:w-auto ml-auto text-right">
          <li>
            <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                       :to="{name: 'home'}"
            >Dashboard
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                       :to="{name: 'home'}"
            >User
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                       :to="{name: 'home'}"
            >Log in
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                       :to="{name: 'home'}"
            >Register
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                       :to="{name: 'home'}"
            >Logout
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mobileOpen: false
      }
    },
  }
</script>
<style>

</style>

