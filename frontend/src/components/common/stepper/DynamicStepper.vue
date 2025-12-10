<template>
  <div>
    <v-stepper
      style="
        box-shadow: none !important;
        background-color: transparent !important;
      "
      alt-labels
      v-model="currentStep"
      :mobile="$isMobile()"
    >
      <v-stepper-header class="d-flex justify-center">
        <template v-for="(step, index) in steps" :key="index">
          <v-stepper-item
            :class="steps.length > 1 ? '' : 'd-flex justify-center'"
            :value="index + 1"
            :title="step.title"
            :color="currentStep > index + 1 ? 'green' : 'primary'"
            :complete="currentStep > index + 1"
          />
          <v-divider v-if="index !== steps.length - 1" />
        </template>
      </v-stepper-header>

      <v-stepper-window
        v-model="currentStep"
        class="border rounded-lg pa-6 py-6 bg-white"
      >
        <template v-for="(step, index) in steps" :key="index">
          <v-stepper-window-item :value="index + 1">
            <component :is="step.component" v-bind="step.props" />
          </v-stepper-window-item>
        </template>
      </v-stepper-window>
    </v-stepper>
    <div class="d-flex justify-space-between pa-3 px-0">
      <div>
        <v-btn
          v-if="currentStep === 1 && !steps[currentStep - 1].hidePrevButton"
          @click="redirect"
          variant="text"
          color="danger"
          style="text-transform: initial"
          >Cancelar</v-btn
        >
        <v-btn
          v-else-if="!steps[currentStep - 1].hidePrevButton"
          @click="prevStep"
          variant="outlined"
          class="border rounded-lg"
          prepend-icon="mdi-arrow-left"
          style="text-transform: initial"
          >Anterior</v-btn
        >
      </div>

      <div class="d-flex ga-4">
        <v-btn
          v-if="
            currentStep < steps.length && !steps[currentStep - 1].hideNextButton
          "
          :loading="steps[currentStep - 1].isLoading || false"
          @click="nextStep"
          variant="flat"
          class="rounded-lg"
          color="primary"
          append-icon="mdi-arrow-right"
          style="text-transform: initial"
          >Próximo</v-btn
        >

        <v-btn
          v-if="
            currentStep === steps.length &&
            !steps[currentStep - 1].hideNextButton
          "
          :loading="steps[currentStep - 1].isLoading || false"
          @click="nextStep"
          class="rounded-lg"
          color="primary"
          flat
          prepend-icon="mdi-check"
          style="text-transform: initial"
          >Finalizar</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { IStepperProps } from '@/types';

export default defineComponent({
  name: 'dynamic-stepper',
  props: {
    steps: {
      type: Array<IStepperProps>,
      required: true,
    },
  },
  setup(props) {
    const currentStep = ref(1);
    const router = useRouter();

    const nextStep = async () => {
      let goNext = true;
      if (props.steps[currentStep.value - 1].nextFunction) {
        goNext = await props.steps[currentStep.value - 1].nextFunction!();
      }

      if (currentStep.value < props.steps.length && goNext) {
        currentStep.value++;
      }
    };

    const prevStep = async () => {
      let goPrev = true;
      if (props.steps[currentStep.value - 1].prevFunction) {
        goPrev = await props.steps[currentStep.value - 1].prevFunction!();
      }

      if (currentStep.value > 1 && goPrev) {
        currentStep.value--;
      }
    };

    const redirect = () => {
      if (props.steps[currentStep.value - 1].redirect !== undefined) {
        props.steps[currentStep.value - 1].redirect!();
      } else {
        router.back();
      }
    };

    return {
      nextStep,
      prevStep,
      redirect,
      currentStep,
    };
  },
});
</script>
<style scoped>
:deep(.v-stepper-header) {
  background-color: transparent !important;
  box-shadow: none !important;
}

:deep(.v-stepper-item--selected) {
  color: #2a63e5;
  font-weight: 500;
}

:deep(.v-stepper-item--complete) {
  color: #2a63e5;
  opacity: 1;
  font-weight: 500;
}

:deep(.v-stepper-window) {
  margin: 0px !important;
}

:deep(.v-divider) {
  border-width: 1px;
}
</style>
