<script setup>
  import InputText from 'primevue/inputtext'
  import RadioButton from 'primevue/radiobutton'
  import Dropdown from 'primevue/dropdown'
  import Card from 'primevue/card'
  import FormHorizontal from '@/templates/create-form-block/form-horizontal'
  import { computed } from 'vue'
  import { useField } from 'vee-validate'

  const HTTP_PORT_LIST_OPTIONS = [
    { label: '80 (Default)', value: '80' },
    { label: '8008', value: '8008' },
    { label: '8080', value: '8080' }
  ]
  const HTTPS_PORT_LIST_OPTIONS = [
    { label: '443 (Default)', value: '443' },
    { label: '8443', value: '8443' },
    { label: '9440', value: '9440' },
    { label: '9441', value: '9441' },
    { label: '9442', value: '9442' },
    { label: '9443', value: '9443' }
  ]
  const TLS_VERSIONS_OPTIONS = [
    { label: 'None', value: '' },
    { label: 'TLS 1.0', value: 'tls_1_0' },
    { label: 'TLS 1.1', value: 'tls_1_1' },
    { label: 'TLS 1.2', value: 'tls_1_2' },
    { label: 'TLS 1.3', value: 'tls_1_3' }
  ]
  const SUPPORTED_LIST_OPTIONS = [
    { label: 'All', value: 'all' },
    { label: 'TLSv1.2_2018', value: '2018' },
    { label: 'TLSv1.2_2019', value: '2019' },
    { label: 'TLSv1.2_2021', value: '2021' },
    { label: 'TLSv1.3_2022', value: '2022' }
  ]
  const ORIGIN_TYPE_LIST_OPTIONS = [{ label: 'Single Origin', value: 'single_origin' }]

  const { value: deliveryProtocol } = useField('deliveryProtocol')
  const { value: httpPort } = useField('httpPort')
  const { value: httpsPort } = useField('httpsPort')
  const { value: minimumTlsVersion } = useField('minimumTlsVersion')
  const { value: supportedVersion } = useField('supportedVersion')
  const { value: originType } = useField('originType')
  const { value: cdnCacheSettings } = useField('cdnCacheSettings')
  const { value: browserCacheSettings } = useField('browserCacheSettings')
  const { value: originProtocolPolicy } = useField('originProtocolPolicy')

  const { value: name, errorMessage: nameError } = useField('name')
  const { value: address, errorMessage: addressError } = useField('address')
  const { value: hostHeader, errorMessage: hostHeaderError } = useField('hostHeader')
  const { value: browserCacheSettingsMaximumTtl } = useField('browserCacheSettingsMaximumTtl')
  const { value: cdnCacheSettingsMaximumTtl } = useField('cdnCacheSettingsMaximumTtl')

  const isHttpProtocol = computed(() => deliveryProtocol.value === 'http')
  const isCacheTypeHonor = computed(() => browserCacheSettings.value === 'honor')
</script>

<template>
  <FormHorizontal title="General">
    <template #inputs>
      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <label
          for="name"
          class="text-color text-base font-medium"
          >Edge Application Name *</label
        >
        <InputText
          v-model="name"
          type="text"
          :class="{ 'p-invalid': nameError }"
        />
        <small
          v-if="nameError"
          class="p-error text-xs font-normal leading-tight"
          >{{ nameError }}</small
        >
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal title="Main Settings">
    <template #inputs>
      <div class="flex flex-col gap-2">
        <label class="text-color text-base font-medium">Delivery Protocol</label>
        <div class="flex flex-col gap-3">
          <Card
            :pt="{
              body: { class: 'p-4' },
              title: { class: 'flex justify-between  text-base m-0 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">HTTP</span>
              <RadioButton
                v-model="deliveryProtocol"
                inputId="http"
                name="http"
                value="http"
              />
            </template>
          </Card>

          <Card
            :pt="{
              body: { class: 'p-4' },
              title: { class: 'flex justify-between  text-base m-0 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">HTTP & HTTPS</span>
              <RadioButton
                v-model="deliveryProtocol"
                inputId="https"
                name="https"
                value="http,https"
              />
            </template>
          </Card>
        </div>
      </div>

      <div class="flex flex-col w-full sm:max-w-xs gap-2">
        <label
          for="port-http"
          class="text-color text-base font-medium"
          >Port HTTP</label
        >
        <Dropdown
          :options="HTTP_PORT_LIST_OPTIONS"
          v-model="httpPort"
          optionLabel="label"
          placeholder="Select a port HTTP"
        />
      </div>

      <div class="flex flex-col w-full sm:max-w-xs gap-2">
        <label
          for="port-https"
          class="text-color text-base font-medium"
          >Port HTTPS</label
        >
        <Dropdown
          :options="HTTPS_PORT_LIST_OPTIONS"
          v-model="httpsPort"
          optionLabel="label"
          placeholder="Select a port HTTPS"
          :disabled="isHttpProtocol"
        />
      </div>

      <div class="flex flex-col w-full sm:max-w-xs gap-2">
        <label
          for="tls-version"
          class="text-color text-base font-medium"
          >Minimum TLS version</label
        >
        <Dropdown
          :options="TLS_VERSIONS_OPTIONS"
          v-model="minimumTlsVersion"
          optionLabel="label"
          placeholder="Select a minimum TLS Version"
          :disabled="isHttpProtocol"
        />
      </div>

      <div class="flex flex-col w-full sm:max-w-xs gap-2">
        <label
          for="ciphers-list"
          class="text-color text-base font-medium"
          >Supported Ciphers list</label
        >
        <Dropdown
          :options="SUPPORTED_LIST_OPTIONS"
          v-model="supportedVersion"
          optionLabel="label"
          placeholder="Select a Supported Ciphers list"
          :disabled="isHttpProtocol"
        />
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal title="Origins">
    <template #inputs>
      <div class="flex flex-col w-full sm:max-w-xs gap-2">
        <label
          for="origin-type"
          class="text-color text-base font-medium"
          >Origin Type</label
        >
        <Dropdown
          :options="ORIGIN_TYPE_LIST_OPTIONS"
          v-model="originType"
          optionLabel="label"
          placeholder="Select a Origin Type"
        />
      </div>

      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <label
          for="address"
          class="text-color text-base font-medium"
          >Address *</label
        >
        <InputText
          id="address"
          v-model="address"
          :class="{ 'p-invalid': addressError }"
          aria-describedby="address-help"
        />
        <small
          v-if="addressError"
          class="p-error text-xs font-normal leading-tight"
          >{{ addressError }}</small
        >
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-color text-base font-medium">Origin Protocol Policy</label>
        <div class="flex flex-col gap-3">
          <Card
            :pt="{
              body: { class: 'p-4' },
              title: { class: 'flex justify-between  text-base m-0 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Preserve HTTP/HTTPS protocol</span>
              <RadioButton
                v-model="originProtocolPolicy"
                inputId="preserve"
                name="preserve"
                value="preserve"
              />
            </template>
          </Card>

          <Card
            :pt="{
              body: { class: 'p-4' },
              title: { class: 'flex justify-between  text-base m-0 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Enforce HTTP</span>
              <RadioButton
                v-model="originProtocolPolicy"
                inputId="http"
                name="http"
                value="http"
              />
            </template>
          </Card>

          <Card
            :pt="{
              body: { class: 'p-4' },
              title: { class: 'flex justify-between  text-base m-0 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Enforce HTTPS</span>
              <RadioButton
                v-model="originProtocolPolicy"
                inputId="https"
                name="https"
                value="https"
              />
            </template>
          </Card>
        </div>
      </div>

      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <label
          for="host-header"
          class="text-color text-base font-medium"
          >Host Header *</label
        >
        <InputText
          id="hostHeader"
          v-model="hostHeader"
          :class="{ 'p-invalid': hostHeaderError }"
          aria-describedby="hostHeader-help"
        />
        <small
          v-if="hostHeaderError"
          class="p-error text-xs font-normal leading-tight"
          >{{ hostHeaderError }}</small
        >
      </div>
    </template>
  </FormHorizontal>

  <FormHorizontal title="Cache Settings">
    <template #inputs>
      <div class="flex flex-col gap-2">
        <label class="text-color text-base font-medium">Browser Cache Settings</label>
        <div class="flex flex-col gap-3">
          <Card
            :pt="{
              body: { class: 'p-4' },
              title: { class: 'flex justify-between  text-base m-0 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Honor Origin Cache Headers</span>
              <RadioButton
                v-model="browserCacheSettings"
                inputId="honor"
                name="honor"
                value="honor"
              />
            </template>
          </Card>

          <Card
            :pt="{
              body: { class: 'p-4' },
              title: { class: 'flex justify-between  text-base m-0 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Override Cache Settings</span>
              <RadioButton
                v-model="browserCacheSettings"
                inputId="override"
                name="override"
                value="override"
              />
            </template>
          </Card>
        </div>
      </div>

      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <label
          for="maximun-ttl-seconds"
          class="text-color text-base font-medium"
          >Maximum TTL (seconds)</label
        >
        <InputText
          id="browserCacheSettingsMaximumTtl"
          v-model="browserCacheSettingsMaximumTtl"
          aria-describedby="browserCacheSettingsMaximumTtl-help"
          :disabled="isCacheTypeHonor"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-color text-base font-medium">CDN Cache Settings</label>
        <div class="flex flex-col gap-3">
          <Card
            :pt="{
              body: { class: 'p-4' },
              title: { class: 'flex justify-between  text-base m-0 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Honor Origin Cache Settings</span>
              <RadioButton
                v-model="cdnCacheSettings"
                inputId="honor"
                name="honor"
                value="honor"
              />
            </template>
          </Card>

          <Card
            :pt="{
              body: { class: 'p-4' },
              title: { class: 'flex justify-between  text-base m-0 font-medium' },
              subtitle: {
                class: 'text-sm font-normal text-color-secondary m-0 pr-0 md:pr-[2.5rem]'
              }
            }"
          >
            <template #title>
              <span class="text-base">Override Cache Settings</span>
              <RadioButton
                v-model="cdnCacheSettings"
                inputId="override"
                name="override"
                value="override"
              />
            </template>
          </Card>
        </div>
      </div>

      <div class="flex flex-col sm:max-w-lg w-full gap-2">
        <label
          for="default-ttl-seconds"
          class="text-color text-base font-medium"
          >Default TTL (seconds)</label
        >
        <InputText
          id="cdnCacheSettingsMaximumTtl"
          v-model="cdnCacheSettingsMaximumTtl"
          aria-describedby="cdnCacheSettingsMaximumTtl-help"
        />
      </div>
    </template>
  </FormHorizontal>
</template>