<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container py-10 pb-16">
        <div class="snippet-title w-10/12">
          <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-8">
            {{snippet.title || 'Untitled'}}
          </h1>
          <div class="text-gray-600"> Created by
            <nuxt-link
              :to="{}"
            >
              {{snippet.author.data.name}}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h1 class="text-xl text-gray-600 mb-6 font-medium">
        {{currentStepIndex + 1}}/{{steps.length}}. {{currentStep.title}}
      </h1>
    </div>
    <div class="flex flex-wrap lg:flex-no-wrap container">
      <div
        class="w-full lg:8/12 lg:mr-16 flex flex-wrap lg:flex-no-wrap justify-between items-start mb-8">

        <div class="order-first">
          <StepNavButton
            :step="prevStep"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </StepNavButton>

        </div>

        <div class="bg-white p-8 rounded-lg text-gray-600 w-full lg:mx-2">
          <StepMarkdown :value="currentStep.body"> </StepMarkdown>
        </div>

        <div class="order-first lg:flex-col lg:order-last flex flex-row">
          <StepNavButton
            :step="nextStep"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </StepNavButton>

          <nuxt-link
            v-if="snippet.user.data.owner"
            :to="{
            name: 'snippets-id-edit',
            params: {id: snippet.uuid},
            query: {step: currentStep.uuid}
          }"
                     class="block mb-2 p-3 bg-blue-500 rounded-lg  lg:order-last order-first mr-2 lg:mr-0"
                     title="Edit Step"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
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
          <StepList :steps="steps" :current-step="currentStep"> </StepList>
        </div>

        <div class="text-gray-500 text-sm">
          Use <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400 text-sm"> Ctrl </div> + <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400 text-sm">Shift </div> + <div class="inline-block px-2 leading-relaxed text-gray-600 rounded bg-gray-400 text-sm">Left  or Right </div> to navigate between steps
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import StepList from "./components/StepList";
  import StepNavButton from "./components/StepNavButton";
  import StepMarkdown from "../../../components/Snippets/StepMarkdown";

  import BrouseSnippts from '@/mixins/snippets/BrouseSnippts'


  export default {
    mixins:[
      BrouseSnippts
    ],
    name: "index",
    components: {StepList, StepNavButton, StepMarkdown},
    data() {
      return {
        snippet: null,
        steps: []
      }
    },


    head(){
      return {
        title: `${this.snippet.title || 'Untitled snippet'}`
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
