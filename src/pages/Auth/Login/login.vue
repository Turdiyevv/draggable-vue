<template>
<div class="login_form">
  <q-card class="">
    <q-form @submit="handleLogin">
      <q-input
        clearable
        outlined
        stack-label
        class="login-field"
        :rules="[ val => !!val || 'Please type something']"
        v-model="username"
        label="Username"
      >
        <template v-slot:prepend>
          <q-icon name="person" color="primary" />
        </template>
      </q-input>
      <q-input
        clearable
        outlined
        stack-label
        type="password"
        class="login-field"
        :rules="[ val => !!val || 'Please type something']"
        v-model="password"
        label="Password"
      >
        <template v-slot:prepend>
          <q-icon name="lock" color="primary" />
        </template>
      </q-input>
      <div class="btn_p">
        <q-btn class="login-submit" :loading="loadingBtn" type="submit" color="primary" text-color="white" label="Submit" unelevated/>
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
.login-field {
  margin-bottom: 18px;
}

.login-field :deep(.q-field__control) {
  min-height: 48px;
  border-radius: 12px !important;
  background: rgba(255,255,255,0.9);
}

body.body--dark .login-field :deep(.q-field__control) {
  background: rgba(17,28,45,0.86);
}

.login-field :deep(.q-field__bottom) {
  min-height: 18px !important;
  padding: 2px 8px 0 !important;
  color: var(--text-soft) !important;
}

.login-field :deep(.q-field__messages) {
  color: #ef4444 !important;
  opacity: 1 !important;
  line-height: 16px;
}

.login-submit,
.login-submit :deep(.q-btn__content) {
  color: #ffffff !important;
}
</style>
