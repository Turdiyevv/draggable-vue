<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useUserStore } from '../../../../stores/user.js'

const userStore = useUserStore()
const dialog = ref(false)
const props = defineProps({
  isOpenModal: Boolean,
  statusId: Number,
  element: Object,
})
const emit = defineEmits(['closeDialog', 'upsertTask'])
function closeDialog() {
  emit('closeDialog', dialog.value)
}

const status = ref([
  {id: 0, text: "Registered"},
  {id: 1, text: "In process"},
  {id: 2, text: "Completed"},
  {id: 3, text: "Testing"},
  {id: 5, text: "Verified"},
])
function getStatus(id) {
  const typeItem = status.value.find((item) => item.id === id)
  if (typeItem) {
    return typeItem.text
  }
}

const Task = ref({
  id: null,
  userId: null,
  name: '',
  description: '',
  status: null,
  type: null,
  deadLine: '',
})
const type = ref([
  { id: 0, text: 'High' },
  { id: 1, text: 'Normal' },
  { id: 2, text: 'Low' },
])
function getType(id) {
  const typeItem = type.value.find((item) => item.id === id)
  if (typeItem) {
    return typeItem.text
  }
}
function selectTask(id) {
  Task.value.type = id
}
async function upsertTask() {
  emit('upsertTask', Task.value)
  closeDialog()
}
const userId = computed(() => userStore.user.userId);
const statusId = computed(() => props.statusId ?? props.element.status);
watch(
  () => props.isOpenModal,
  (val) => {
    dialog.value = val
  },
)
watch(
  () => props.element,
  (val) => {
    if (val) {
      Task.value.id = val.id || null
      Task.value.userId = val.userId || null
      Task.value.name = val.text || ''
      Task.value.description = val.desc || ''
      Task.value.status = val.status || null
      Task.value.type = val.taskType || null
      Task.value.deadLine = val.deadLine || ''
    } else {
      Task.value = {
        id: null,
        userId: null,
        name: '',
        description: '',
        status: null,
        type: null,
        deadLine: '',
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <q-dialog persistent v-model="dialog">
    <q-card>
      <q-card-actions class="flex justify-between q-px-md">
        <div class="text-h6">{{ props.element ? 'Edit' : 'Create' }} № {{ Task?.id }}</div>
        <q-icon @click="closeDialog" color="red" class="cursor-pointer" name="close" size="sm" />
      </q-card-actions>
      <q-card-section>
        <div>
          <span style="text-decoration: underline">User {{ userId }}</span>
          <q-chip outline color="teal" size="sm">{{ getStatus(statusId)}}</q-chip>
        </div>
        <q-input class="q-my-sm bg-white" label="Text" outlined v-model="Task.name" dense="dense" />
        <q-input class="q-my-sm bg-white" label="Description" outlined v-model="Task.description" dense="dense" />
        <div class="flex justify-between">
          <q-btn color="grey" unelevated :label="[0, 1, 2].includes(Task.type) ? getType(Task.type) : 'Select type'">
            <q-menu auto-close transition-show="scale" transition-hide="scale">
              <q-list style="width: 100px">
                <q-item @click="selectTask(x.id)" v-for="x in type" :key="x.id" clickable>
                  <q-item-section>{{ x.text }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn @click="upsertTask" color="green" unelevated label="Save"></q-btn>
        </div>
        <div class="flex justify-end q-mt-sm"></div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
