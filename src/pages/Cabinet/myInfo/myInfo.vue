<script setup>
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '../../../stores/user.js'

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
    userStore.setUser({
      username: user.value.username,
      age: user.value.age,
      userId: user.value.userId,
      region: user.value.region,
      profession: user.value.profession,
    });
    loadingBtn.value = false;
    edit.value = true;
  }
}

const userInfo = computed(() => {return userStore.user});
user.value = userInfo.value;
</script>

<template>
<q-item class="info_page">
  <div class="q-pa-sm flex flex-wrap">
    <div class="pic_c">photo</div>
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
