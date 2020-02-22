<template>
  <div class="flex items-center bg-white py-8 lg:py-0">
    <div class="container flex items-center flex-wrap lg:flex-no-wrap">
      <nuxt-link class="mr-10 flex-shrink-0"
                 :to="{name: 'index'}"
      >
        <img src="../assets/img/logo.png" alt="logo" class="h-12">
      </nuxt-link>

      <a href="#" @click="mobileOpen = !mobileOpen" class="lg:hidden ml-auto justify-center flex flex-col relative w-8 h-8">
        <span class="bg-blue-700 h-1 w-8 rounded mb-1" :class="{'transform absolute right-0 rotate-45': mobileOpen}"></span>
        <span class="bg-blue-700 h-1 w-8 rounded mb-1" :class="{'transform  -rotate-45 absolute right-0': mobileOpen}"></span>
        <span class="bg-blue-700 h-1 w-8 rounded mb-1" :class="{'hidden': mobileOpen}"></span>
      </a>

      <div class="w-full flex "
           :class="{'hidden lg:flex': !mobileOpen, 'mt-8': mobileOpen}">
        <ul class="lg:h-24 lg:flex items-center w-full lg:w-auto">

          <li>
            <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                       :to="{name: 'index'}"
            >
              Browse
            </nuxt-link>
          </li>
          <li>
            <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                       :to="{name: 'index'}"
            >Search
            </nuxt-link>
          </li>

        </ul>
        <ul class="lg:h-24 lg:flex items-center w-full lg:w-auto ml-auto text-right">

          <template v-if="$auth.loggedIn">
            <li>
              <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                         :to="{name: 'index'}"
              >Dashboard
              </nuxt-link>
            </li>
            <li>
              <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                         :to="{name: 'index'}"
              >{{$auth.user.name}}
              </nuxt-link>
            </li>
            <li>
              <a class="text-lg text-gray-700 lg:py-8 lg:px-4"
                 @click.prevent="logout()"
              >
                Logout
              </a>
            </li>
          </template>
          <template v-else>
            <li>
              <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                         :to="{name: 'auth-login'}"
              >Log in
              </nuxt-link>
            </li>
            <li>
              <nuxt-link class="text-lg text-gray-700 lg:py-8 lg:px-4"
                         :to="{name: 'index'}"
              >Register
              </nuxt-link>
            </li>
          </template>
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
    methods: {
     async logout() {
        await this.$auth.logout()
      }
    },
  }
</script>
<style>

</style>

