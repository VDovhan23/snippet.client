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
          {{currentStepIndex + 1}}/{{steps.length}}.
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


          <StepNavButton
            :step="prevStep"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-current text-white h-6 w-6">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </StepNavButton>


          <add-step-button
            :snippet="snippet"
            :current-step="currentStep"
            :position="'before'"
            @added="handleStepAdded"
          />

        </div>

        <div class="w-full lg:mx-2">
          <textarea class="w-full mb-6 border-dashed border-2 border-gray-400" v-model="currentStep.body"></textarea>
          <div class="bg-white p-8 rounded-lg text-gray-600 ">
            <StepMarkdown
              :value="currentStep.body"
            />
          </div>
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

          <add-step-button
            :snippet="snippet"
            :current-step="currentStep"
            position='after'
            @added="handleStepAdded"
          />

          <delete-step-button
            v-if="steps.length > 1"
            :snippet="snippet"
            :current-step="currentStep"
            @deleted="handleStepDeleted"
          ></delete-step-button>
        </div>
      </div>
      <div class="w-full lg:4/12">
        <div class="mb-8">
          <h1 class="text-xl text-gray-600 mb-6 font-medium">
            Steps
          </h1>
          <StepList
            :steps="orderedStepsAsc"
            :currentStep="currentStep"
          />
        </div>

        <div class="border-t-2 border-gray-300 pt-6 pb-6">
          <h1 class="text-xl text-gray-600 mb-6 font-medium">
            Publishing
          </h1>
          <div class="container text-gray-500 text-sm mb-6">

            <template v-if="lastSaved">
              Last saved at {{lastSaved}}
            </template>
            <template v-else>
              No changes in this session yet
            </template>
          </div>

          <div class="flex items-baseline">
            <input
              class="mr-2"
              type="checkbox"
              name="public"
              id="public"
              v-model="snippet.is_public"
            >

            <div>
              <label for="public" class="font-medium text-gray-600">Make this snippet public</label>
            </div>

          </div>
          <div class="text-gray-500 text-sm">You can change this later</div>

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
      </div>
    </div>


  </div>
</template>

<script>
  import {debounce as _debounce} from 'lodash'
  import StepList from "./components/StepList";
  import StepNavButton from "./components/StepNavButton";

  import BrouseSnippts from '@/mixins/snippets/BrouseSnippts'
  import AddStepButton from "./components/addStepButton";
  import deleteStepButton from "./components/deleteStepButton";

  import StepMarkdown from "../../../components/Snippets/StepMarkdown";

  import moment from 'moment'

  export default {

    mixins: [
      BrouseSnippts
    ],
    components: {AddStepButton, StepList, StepNavButton, deleteStepButton, StepMarkdown},
    head() {
      return {
        title: `Edit ${this.snippet.title || 'Untitled snippet'}`
      }
    },

    data() {
      return {
        snippet: null,
        steps: [],
        lastSaved: null
      }
    },
    watch: {
      'snippet.title': {
        handler: _debounce(async function (title) {
          await this.$axios.$patch(`snippets/${this.snippet.uuid}`, {
            title
          })

          this.touchLastSave()
        }, 500)
      },
      'snippet.is_public': {
        handler: _debounce(async function (isPublic) {
          await this.$axios.$patch(`snippets/${this.snippet.uuid}`, {
            is_public: isPublic
          })

          this.touchLastSave()
        }, 500)
      },

      currentStep: {
        deep: true,
        handler: _debounce(async function (step) {
          await this.$axios.$patch(`snippets/${this.snippet.uuid}/steps/${step.uuid}`, {
            title: step.title,
            body: step.body
          })

          this.touchLastSave()
        }, 500)

      }
    },

    async asyncData({app, params}) {
      let snippet = await app.$axios.$get(`snippets/${params.id}`);

      return {
        snippet: snippet.data,
        steps: snippet.data.steps.data
      }
    },
    methods: {
      touchLastSave() {
        this.lastSaved = moment().format('h:mm:ss a');
      },
      handleStepDeleted(step) {
        let prevStep = this.prevStep;

        this.steps = this.steps.filter((s) => {
          return s.uuid !== step.uuid
        });

        this.goToStep(prevStep || this.firstStep)
      },
      handleStepAdded(step) {
        this.steps.push(step);
        this.goToStep(step)
      },

      goToStep(step) {

        console.log(step);
        this.$router.push({
          query: {step: step.uuid}
        })
      }
    },
  }
</script>

<style scoped>

</style>
