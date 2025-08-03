<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useUserStore } from 'stores/user.js'

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
  text: '',
  desc: '',
  status: null,
  taskType: null,
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
  Task.value.taskType = id
}
const redSelect = ref(false);
async function upsertTask() {
    redSelect.value = false;
    Task.value.userId = userId.value;
    Task.value.status = statusId.value;
    emit('upsertTask', Task.value);
    closeDialog();
}
const userId = computed(() => userStore.user.userId);
const statusId = computed(() => props.statusId ?? props.element.status);
const noEdit = ref(false);
watch(
  () => props.isOpenModal,
  (val) => {
    dialog.value = val;
    if (val === true && props.element) {
      Task.value.id = props.element.id || null
      Task.value.userId = props.element.userId || null
      Task.value.text = props.element.text || ''
      Task.value.desc = props.element.desc || ''
      Task.value.status = props.element.status || null
      Task.value.taskType = props.element.taskType || null
      Task.value.deadLine = props.element.deadLine || ''
      if (props.element.userId === userId.value) {
        noEdit.value = false;
      }else {noEdit.value = true;}
    }else {
      Task.value = {
        id: null,
        userId: null,
        text: '',
        desc: '',
        status: null,
        taskType: null,
        deadLine: '',
      }
    }
  },
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
        <q-form @submit="upsertTask">
          <div>
            <span style="text-decoration: underline">User {{ userId }}</span>
            <q-chip outline color="teal" size="sm">{{ getStatus(statusId)}}</q-chip>
          </div>
          <q-input
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            :readonly="noEdit" clearable class="q-my-sm bg-white" label="Text" outlined v-model="Task.text" dense="dense" />
          <q-input
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            :readonly="noEdit" clearable class="q-my-sm bg-white" label="Description" outlined v-model="Task.desc" dense="dense" />
          <div class="flex justify-between items-start">
            <div style="max-width: 300px">
              <q-input
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                :readonly="noEdit" label="Deadline" filled v-model="Task.deadLine" mask="date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="Task.deadLine">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Ok" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <q-btn :disable="noEdit" style="width: 200px; height: 48px" unelevated
                   :label="[0, 1, 2].includes(Task.taskType) ? getType(Task.taskType) : 'Select type'"
                   :color="!redSelect ? 'grey' : 'red'"
            >
              <q-menu auto-close transition-show="scale" transition-hide="scale">
                <q-list style="width: 100px">
                  <q-item @click="selectTask(x.id)" v-for="x in type" :key="x.id" clickable>
                    <q-item-section>{{ x.text }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          <div class="flex justify-end q-mt-sm">
            <q-btn :disable="noEdit" type="submit" color="green" unelevated label="Save"></q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
>>>.q-my-sm{
  border-radius: 12px;
}
</style>
