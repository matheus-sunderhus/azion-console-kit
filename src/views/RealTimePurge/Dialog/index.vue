<script setup>
  import { ref, watch } from 'vue'
  import PrimeDialog from 'primevue/dialog'
  import PrimeButton from 'primevue/button'
  import Message from 'primevue/message'
  import Avatar from 'primevue/avatar'

  defineOptions({ name: 'dialog-real-time-purge' })

  const emit = defineEmits(['update:visible', 'closeDialog', 'repurge'])

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  })

  const showDialog = ref(false)
  const loading = ref(false)

  const closeDialog = () => {
    emit('closeDialog')
  }

  const handleRealTimePurge = () => {
    emit('repurge')
    loading.value = true
  }

  watch(
    () => props.visible,
    (value) => {
      showDialog.value = value
    }
  )

  watch(
    () => props.isLoading,
    (value) => {
      loading.value = value
    }
  )
</script>

<template>
  <div>
    <PrimeDialog
      :blockScroll="true"
      v-model:visible="showDialog"
      modal
      @hide="closeDialog"
      :pt="{
        root: { class: 'p-0 w-[37.5rem]' },
        header: { class: 'flex py-5 px-8 items-center self-stretch border-b border-solid' },
        content: { class: 'p-0 h-full' },
        footer: {
          class: 'flex py-5 px-8 justify-end items-end border-t border-solid'
        }
      }"
    >
      <template #header>
        <h5 class="text-lg not-italic font-bold leading-5">Confirme Purge</h5>
      </template>
      <div class="flex justify-center flex-col gap-4">
        <Message
          severity="warn"
          :closable="false"
          :pt="{
            root: { class: 'mx-3 mt-4 md:mx-8' },
            wrapper: { class: 'py-3 px-3 items-start sm:items-center' }
          }"
        >
          <template #messageicon>
            <Avatar
              icon="pi pi-exclamation-triangle"
              class="bg-yellow-600 bg-opacity-20 text-yellow-600 mr-2 min-w-[2rem]"
            />
          </template>
          <p class="text-color-secondary">
            This action may temporarily impact some URLs, causing a minor disruption.
          </p>
        </Message>
        <div class="text-color font-semibold text-sm mb-2 px-8">
          This happens because the purge is queued for execution, and the results may take some time
          to propagate to all edge nodes.
        </div>
      </div>
      <template #footer>
        <PrimeButton
          severity="primary"
          label="Cancel"
          outlined
          @click="closeDialog"
        />
        <PrimeButton
          severity="secondary"
          label="Confirm"
          :loading="loading"
          @click="handleRealTimePurge"
          iconPos="right"
        />
      </template>
    </PrimeDialog>
  </div>
</template>