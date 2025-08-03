<script setup>
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from 'stores/user.js'
import { useQuasar } from 'quasar'

const $q = useQuasar();
const userStore = useUserStore()
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
    message: 'Changed info !',
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
  <div class="q-pa-sm flex flex-wrap">
    <div class="pic_c">
        <img style="height: auto; width: auto; max-height: 100%; max-width: 100%"
          v-if="user?.userId === 1" src="https://cdn.quasar.dev/img/boy-avatar.png" alt="">
        <img style="height: auto; width: auto; max-height: 100%; max-width: 100%"
          v-else src="https://cdn.quasar.dev/img/avatar4.jpg" alt="">
    </div>
    <div class="q-pa-sm" style="min-width: 300px">
      <q-input clearable :readonly="edit" class="q-my-sm bg-white" outlined v-model="user.username" dense="dense" />
      <q-input clearable type="number" :readonly="edit" class="q-my-sm bg-white" outlined v-model="user.age" dense="dense" />
      <q-input clearable :readonly="edit" class="q-my-sm bg-white" outlined v-model="user.region" dense="dense" />
      <q-input clearable :readonly="edit" class="q-my-sm bg-white" outlined v-model="user.profession" dense="dense" />
      <div class="flex justify-between">
        <q-btn @click="edit=!edit" style="width: 48%" unelevated color="orange">edit</q-btn>
        <q-btn @click="saveInfo" :disable="edit" style="width: 48%" unelevated color="positive">save</q-btn>
      </div>
    </div>
  </div>
</q-item>
</template>

<style scoped>

</style>
