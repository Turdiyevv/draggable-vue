<script setup>
import { ref } from 'vue'

const text = ref('test')
</script>

<template>
<div class="login_form">
  <q-card class="">
    <q-input standout="bg-white" v-model="text" label="Standout"/>
    <q-input standout="bg-white" v-model="text" label="Standout"/>
    <div class="btn_p">
      <q-btn to="/" color="primary" label="Submit" unelevated/>
    </div>
  </q-card>
</div>
</template>

<style scoped>

</style>
