<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="app-header q-ma-sm q-badge--rounded">
      <q-toolbar>
        <q-btn color="primary" flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-btn-toggle
          class="language-switch"
          v-model="locale"
          :options="localeOptions"
          @update:model-value="setLocale"
          dense
          unelevated
          toggle-color="primary"
        />
        <q-toggle
          class="q-ml-auto"
          v-model="isDark"
          checked-icon="dark_mode"
          unchecked-icon="light_mode"
          @update:model-value="toggleDark"
        />
        <q-btn @click="logOut" size="sm" outline unelevated color="negative" icon="logout"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer class="app-drawer" v-model="leftDrawerOpen" show-if-above>
      <q-list class="main-nav-list q-px-sm q-py-md">
        <q-toolbar-title class="user-header q-mx-sm q-py-sm">
          <q-avatar class="q-mr-md">
            <img v-if="user?.userId === 1" src="https://cdn.quasar.dev/img/boy-avatar.png" alt="">
            <img v-else src="https://cdn.quasar.dev/img/avatar4.jpg" alt="">
          </q-avatar>
          <span>{{ user?.username }}</span>
        </q-toolbar-title>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-ma-sm q-mt-lg">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { Dark } from 'quasar'
import { useI18n } from 'src/i18n/index.js'

const userStore = useUserStore()
const router = useRouter();
const isDark = ref(Dark.isActive)
const { locale, localeOptions, t, setLocale } = useI18n()
const linksList = computed(() => [
  {
    title: t('nav.info'),
    caption: t('nav.infoCaption'),
    icon: 'code',
    link: '/info',
  },
  {
    title: t('nav.tasks'),
    caption: t('nav.tasksCaption'),
    icon: 'school',
    link: '/tasks',
  },
  {
    title: t('nav.discord'),
    caption: t('nav.discordCaption'),
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  }
])
const toggleDark = (val) => {
  Dark.set(val)
  localStorage.setItem('theme', val ? 'dark' : 'light')
}
const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
async function logOut() {
  await userStore.clearUser();
  router.push('/auth');
}
const user = computed(() => {return userStore.user});
</script>

<style scoped>
.app-header {
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  box-shadow: var(--shadow) !important;
}

.user-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border);
  color: var(--text);
}

.language-switch {
  margin-left: 8px;
  border-radius: 7px !important;
  overflow: hidden;
}

.language-switch :deep(.q-btn) {
  min-height: 26px;
  min-width: 32px;
  padding: 3px 6px;
  border-radius: 5px !important;
  font-size: 11px;
}
</style>
