<script setup>
  import FieldSwitchBlock from '@/templates/form-fields-inputs/fieldSwitchBlock'
  import { useField } from 'vee-validate'
  import { computed, toRefs } from 'vue'
  import PrimeDivider from 'primevue/divider'

  defineOptions({ name: 'FieldGroupSwitch' })

  const props = defineProps({
    hideSelector: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    },
    isCard: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ''
    },
    helpText: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    divider: {
      type: Boolean,
      default: false
    },
    nameField: {
      type: String,
      required: true
    }
  })

  const { nameField } = toRefs(props)
  const { value: inputValue, errorMessage } = useField(nameField)

  const classStateRoot = computed(() => ({
    'p-disabled': props.disabled
  }))

  const classListSelector = computed(() => ({
    'flex-wrap': props.auto,
    'flex-col': !props.auto,
    'gap-3': !props.divider
  }))
</script>

<template>
  <div :class="['flex flex-col gap-2', classStateRoot]">
    <label class="text-color text-sm font-medium leading-5">
      {{ props.label }}
    </label>
    <div
      class="flex"
      :class="classListSelector"
    >
      <template
        v-for="(item, index) in inputValue"
        :key="index"
      >
        <FieldSwitchBlock
          :nameField="`${props.nameField}[${index}].value`"
          :name="`${props.nameField}-switch-${index}`"
          :auto="props.auto"
          :hideSelector="props.hideSelector"
          :isCard="props.isCard"
          v-bind="item"
        >
          <template #footer>
            <slot :item="item" />
          </template>
        </FieldSwitchBlock>
        <PrimeDivider v-if="props.divider" />
      </template>
    </div>
    <small
      class="text-xs text-color-secondary font-normal leading-5"
      v-if="props.helpText"
    >
      {{ props.helpText }}
    </small>
    <small
      v-if="errorMessage"
      class="p-error text-xs font-normal leading-tight"
      >{{ errorMessage }}</small
    >
  </div>
</template>