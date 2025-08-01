<template>
<div class="login_form">
  <q-card class="">
    <q-input standout="bg-white" v-model="username" label="username"/>
    <q-input standout="bg-white" v-model="password" label="password"/>
    <div class="btn_p">
      <q-btn :loading="loadingBtn" @click="handleLogin" color="primary" label="Submit" unelevated/>
    </div>
  </q-card>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const loadingBtn = ref(false);
const username = ref('');
const password = ref('123456');
async function handleLogin() {
  if (username.value !== '' && password.value !== '') {
    loadingBtn.value = true;
    localStorage.setItem('user', JSON.stringify({
      username: username.value,
      age: 25,
      region: 'Tashkent',
      profession: 'Programmer',
    }));
    loadingBtn.value = false;
    router.push('/info');
  }
}
</script>

<style scoped>

</style>
