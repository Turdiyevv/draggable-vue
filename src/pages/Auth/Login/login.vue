<template>
<div class="login_form">
  <q-card class="">
    <q-form @submit="handleLogin">
      <q-input clearable
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        standout="bg-white" v-model="username" label="username"/>
      <q-input clearable
        :rules="[ val => val && val.length > 0 || 'Please type something']"
        standout="bg-white" v-model="password" label="password"/>
      <div class="btn_p">
        <q-btn :loading="loadingBtn" type="submit" color="primary" label="Submit" unelevated/>
      </div>
    </q-form>
  </q-card>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {useUserStore} from 'stores/user.js'
import { useQuasar } from 'quasar'

const $q = useQuasar();
const userStore = useUserStore();
const router = useRouter();
const loadingBtn = ref(false);
const username = ref('');
const password = ref('123456');
async function handleLogin() {
  loadingBtn.value = true;
  const userId = username.value === 'test' ? 2 : 1;
  userStore.setUser({
    userId,
    username: username.value,
    age: 25,
    region: 'Tashkent',
    profession: 'Programmer',
  })
  loadingBtn.value = false;
  router.push('/info');
  await showNotify();
}
const showNotify = () => {
  $q.notify({
    type: 'positive',
    textColor: 'white',
    message: 'Login success !',
    position: 'top',
  })
}
</script>

<style scoped>

</style>
