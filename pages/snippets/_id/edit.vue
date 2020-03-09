<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container py-10 pb-16">
        <div class="snippet-title w-10/12">
          <input type="text"
                 class="text-4xl font-header text-gray-700 border-gray-400 font-medium leading-tight mb-8 w-full block p-2 border-2 rounded border-dashed"
                 value=""
                 placeholder="Add title"
                 v-model="snippet.title"
          >

          <div class="text-gray-600"> Created by
            <nuxt-link
              :to="{}"
            >
              Someone
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">

      <div class="flex items-center mb-6 ">
        <div class="text-xl text-gray-600 font-medium mr-3">
          1/1.
        </div>

        <input type="text"
               name=""
               class="w-full text-xl py-1 bg-transparent text-gray-600 border-gray-400 font-medium
               p-2 border-2 rounded border-dashed"
               value="Step Title"
               placeholder="Add step title"
               v-model="currentStep.title"

        >
      </div>


    </div>
    <div class="flex flex-wrap lg:flex-no-wrap container">
      <div
        class="w-full lg:8/12 lg:mr-16 flex flex-wrap lg:flex-no-wrap justify-between items-start mb-8">

        <div class="flex flex-row lg:flex-col mr-4 order-first">
          <nuxt-link
            :to="{}"
            class="block mb-2 p-3 bg-blue-500 rounded-lg "
            title="Prev Step">
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </nuxt-link>


          <nuxt-link :to="{}"
                     class="block mb-2 p-3 bg-blue-500 rounded-lg  lg:order-last order-first mr-2 lg:mr-0"
                     title="Add Step Before"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </nuxt-link>
        </div>

        <div class="w-full lg:mx-2">
          <textarea class="w-full mb-6 border-dashed border-2 border-gray-400"  v-model="currentStep.body"></textarea>
          <div class="bg-white p-8 rounded-lg text-gray-600 ">
            Markdown content
          </div>
        </div>

        <div class="order-first lg:flex-col lg:order-last flex flex-row">
          <nuxt-link
            :to="{}"
            class="block mb-2 p-3 bg-blue-500 rounded-lg mr-2 lg:mr-0"
            title="Next Step"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </nuxt-link>

          <nuxt-link
            :to="{}"
            class="block mb-2 p-3 bg-blue-500 rounded-lg  lg:order-last order-first mr-2 lg:mr-0"
            title="Add Step After"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </nuxt-link>

          <nuxt-link
            :to="{}"
            class="block mb-2 p-3 bg-blue-500 rounded-lg  lg:order-last order-first mr-2 lg:mr-0"
            title="Delete Step"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </nuxt-link>
        </div>
      </div>
      <div class="w-full lg:4/12">
        <div class="mb-8">
          <h1 class="text-xl text-gray-600 mb-6 font-medium">
            Steps
          </h1>
          <StepList :steps="orderedStepsAsc" :currentStep="currentStep" />
        </div>

        <div class="text-gray-500 text-sm">
          Use
          <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400 text-sm"> Ctrl</div>
          +
          <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400 text-sm">Shift</div>
          +
          <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400 text-sm">Left or Right</div>
          to navigate between steps
        </div>

        {{currentStep}}
      </div>
    </div>

  </div>
</template>

<script>
  import {orderBy as _orderBy} from 'lodash'
  import {debounce as _debounce} from 'lodash'
  import StepList from "./components/StepList";

  export default {
    components: {StepList},
    comments: {StepList},
    head(){
      return {
        title: `Edit ${this.snippet.title || 'Untitled snippet'}`
      }
    },

    data() {
      return {
        snippet: null,
        steps: []
      }
    },
    computed: {
      orderedStepsAsc() {
        return _orderBy( this.steps, 'order', 'asc');
      },

      firstStep(){
        return this.orderedStepsAsc[0]
      },
      currentStep(){
        return  this.orderedStepsAsc.find(
          (s)=> s.uuid === this.$route.query.step
        ) || this.firstStep
      }
    },

    watch: {
      'snippet.title':{
        handler: _debounce(async function (title) {
          await this.$axios.$patch(`snippets/${this.snippet.uuid}`, {
            title
          })
        }, 500)
      },

      currentStep:{
        deep: true,
        handler: _debounce(async function (step) {
          await this.$axios.$patch(`snippets/${this.snippet.uuid}/steps/${step.uuid}`, {
            title: step.title,
            body: step.body
          })
        }, 500)

      }
    },



    async asyncData({app, params}) {
      let snippet = await app.$axios.$get(`snippets/${params.id}`);

      return {
        snippet : snippet.data,
        steps : snippet.data.steps.data
      }
    }
  }
</script>

<style scoped>

</style>
