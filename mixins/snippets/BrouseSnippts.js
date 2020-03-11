
import {orderBy as _orderBy} from 'lodash'

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
}
