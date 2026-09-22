<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">{{ t('error.title') }}</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/info"
        :label="t('error.home')"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'src/i18n/index.js'

const { t } = useI18n()
</script>
