<script setup>
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from 'stores/user.js'
import { useQuasar } from 'quasar'
import { useI18n } from 'src/i18n/index.js'

const $q = useQuasar();
const userStore = useUserStore()
const { t } = useI18n()
const user = ref({
  username: '',
  age: '',
  userId:'',
  region: '',
  profession: '',
});
const edit = ref(true);
const loadingBtn = ref(true);

async function saveInfo(){
  if (user.value.username) {
    loadingBtn.value = true;
    try {
      userStore.setUser({
        username: user.value.username,
        age: user.value.age,
        userId: user.value.userId,
        region: user.value.region,
        profession: user.value.profession,
      });
      successNotify();
      loadingBtn.value = false;
      edit.value = true;
    }catch (error){
      errorNotify(error)
    }
  }
}

const userInfo = computed(() => {return userStore.user});
user.value = userInfo.value;


const successNotify = () => {
  $q.notify({
    type: 'positive',
    textColor: 'white',
    message: t('profile.changed'),
    position: 'top',
  })
}
const errorNotify = (val) => {
  $q.notify({
    type: 'negative',
    textColor: 'white',
    message: val,
    position: 'top',
  })
}
</script>

<template>
<q-item class="info_page">
  <div class="info-content">
    <div class="pic_c">
        <img style="height: auto; width: auto; max-height: 100%; max-width: 100%"
          v-if="user?.userId === 1" src="https://cdn.quasar.dev/img/boy-avatar.png" alt="">
        <img style="height: auto; width: auto; max-height: 100%; max-width: 100%"
          v-else src="https://cdn.quasar.dev/img/avatar4.jpg" alt="">
    </div>
    <div class="info-form">
      <q-input clearable :readonly="edit" class="q-my-sm form-field" filled stack-label v-model="user.username" :label="t('profile.username')">
        <template v-slot:prepend>
          <q-icon name="person" color="primary" />
        </template>
      </q-input>
      <q-input clearable type="number" :readonly="edit" class="q-my-sm form-field" filled stack-label v-model="user.age" :label="t('profile.age')">
        <template v-slot:prepend>
          <q-icon name="numbers" color="primary" />
        </template>
      </q-input>
      <q-input clearable :readonly="edit" class="q-my-sm form-field" filled stack-label v-model="user.region" :label="t('profile.region')">
        <template v-slot:prepend>
          <q-icon name="place" color="primary" />
        </template>
      </q-input>
      <q-input clearable :readonly="edit" class="q-my-sm form-field" filled stack-label v-model="user.profession" :label="t('profile.profession')">
        <template v-slot:prepend>
          <q-icon name="work" color="primary" />
        </template>
      </q-input>
      <div class="flex justify-between">
        <q-btn @click="edit=!edit" style="width: 48%" unelevated color="orange">{{ t('profile.edit') }}</q-btn>
        <q-btn @click="saveInfo" :disable="edit" style="width: 48%" unelevated color="positive">{{ t('profile.save') }}</q-btn>
      </div>
    </div>
  </div>
</q-item>
</template>

<style scoped>
.info-content {
  display: grid;
  grid-template-columns: minmax(220px, 300px) minmax(0, 420px);
  align-items: start;
  gap: 20px;
  width: 100%;
  padding: 8px;
}

.info-content .pic_c {
  width: 100%;
  max-width: 300px;
  height: auto;
  aspect-ratio: 3 / 4;
  min-height: 240px;
}

.info-form {
  width: 100%;
  min-width: 0;
}

.form-field :deep(.q-field__control) {
  min-height: 48px;
  border-radius: 12px !important;
  background: rgba(255,255,255,0.9);
}

body.body--dark .form-field :deep(.q-field__control) {
  background: rgba(17,28,45,0.86);
}

@media (max-width: 700px) {
  .info-content {
    grid-template-columns: minmax(0, 1fr);
    justify-items: center;
  }

  .info-content .pic_c,
  .info-form {
    width: 100%;
    max-width: 420px;
  }
}
</style>
