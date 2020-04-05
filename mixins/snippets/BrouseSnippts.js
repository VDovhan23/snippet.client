import {orderBy as _orderBy} from 'lodash'

import hotkeys from 'hotkeys-js';

export default {
  computed: {
    nextStep(){
      return this.orderedStepsAsc.find(
        (s) => s.order > this.currentStep.order
      ) || null
    },
    prevStep(){
      return this.orderedStepsDesc.find(
        (s) => s.order < this.currentStep.order
      ) || null
    },

    orderedStepsAsc() {
      return _orderBy( this.steps, 'order', 'asc');
    },
    orderedStepsDesc() {
      return _orderBy( this.steps, 'order', 'desc');
    },

    currentStepIndex(){
      return this.orderedStepsAsc.map(
        (s)=>s.uuid
      ).indexOf(this.currentStep.uuid)
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
  methods: {
    registerKeybordPress() {
      hotkeys('ctrl+shift+left, ctrl+shift+right', (event, handler) =>{
        switch (handler.key) {
          case 'ctrl+shift+left':
            if (this.prevStep) {
              this.goToStep(this.prevStep)
            }

            break;
          case 'ctrl+shift+right':
            if (this.nextStep) {
              this.goToStep(this.nextStep)
            }
            break;
        }
      });
    },
    goToStep(step) {
      this.$router.push({
        query: {step: step.uuid}
      })
    }
  },


  mounted(){
    this.registerKeybordPress()
  }
}
