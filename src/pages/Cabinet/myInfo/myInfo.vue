<script setup>
import { onMounted, ref } from 'vue'

const user = ref({
  username: '',
  age: '',
  region: '',
  profession: '',
});
const edit = ref(true);
const loadingBtn = ref(true);

async function saveInfo(){
  if (user.value.username) {
    loadingBtn.value = true;
    localStorage.setItem('user', JSON.stringify({
      username: user.value.username,
      age: user.value.age,
      region: user.value.region,
      profession: user.value.profession,
    }));
    loadingBtn.value = false;
    edit.value = true;
  }
}

onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})
</script>

<template>
<q-item class="info_page">
  <div class="q-pa-sm flex flex-wrap">
    <div class="pic_c">photo</div>
    <div class="q-pa-sm" style="min-width: 300px">
      <q-input :readonly="edit" class="q-my-sm bg-white" outlined v-model="user.username" dense="dense" />
      <q-input type="number" :readonly="edit" class="q-my-sm bg-white" outlined v-model="user.age" dense="dense" />
      <q-input :readonly="edit" class="q-my-sm bg-white" outlined v-model="user.region" dense="dense" />
      <q-input :readonly="edit" class="q-my-sm bg-white" outlined v-model="user.profession" dense="dense" />
      <div class="flex justify-between">
        <q-btn @click="edit=false" style="width: 48%" unelevated color="orange">edit</q-btn>
        <q-btn @click="saveInfo" :disable="edit" style="width: 48%" unelevated color="positive">save</q-btn>
      </div>
    </div>
  </div>
</q-item>
</template>

<style scoped>

</style>
