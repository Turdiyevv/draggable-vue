<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #f5f5f5" class="q-ma-sm q-badge--rounded">
      <q-toolbar>
        <q-btn color="black" flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title style="color: #1d1d1d">{{user.username}}</q-toolbar-title>
        <q-btn @click="logOut" size="sm" outline unelevated color="red" icon="logout"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list class="q-py-xl q-px-sm">
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container class="">
      <div class="q-ma-sm q-mt-lg">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const linksList = [
  {
    title: 'My info',
    caption: 'Information',
    icon: 'code',
    link: '/info',
  },
  {
    title: 'My task',
    caption: 'quasar.dev',
    icon: 'school',
    link: '/tasks',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  }
]
const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
async function logOut() {
  localStorage.clear();
  router.push('/auth');
}
const user = ref({});
onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})
</script>
<style scoped>
</style>
