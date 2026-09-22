<template>
  <q-page class="task-page">
      <div class="task-toolbar q-px-md">
        <q-btn class="filter-btn" outline unelevated
               :label="[0, 1, 2].includes(typeFilter) ? getType(typeFilter) : t('tasks.selectType')">
          <q-menu auto-close transition-show="scale" transition-hide="scale">
            <q-list style="width: 100px">
              <q-item @click="selectTask(x.id)" v-for="x in type" :key="x.id" clickable>
                <q-item-section>{{ x.text }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-input readonly :label="deadLineFilter ? '' : t('tasks.dateFilter')" class="date-filter" outlined dense v-model="deadLineFilter" mask="date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="deadLineFilter">
                  <div class="row items-center justify-end">
                    <q-btn @click="getFilterDate" v-close-popup :label="t('tasks.ok')" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-checkbox v-model="allTasks" @update:model-value="changeAll" :label="t('tasks.all')" class="all-tasks-check"/>
        <q-btn class="clear-filter-btn" flat @click="clearFilter">{{ t('tasks.clear') }}</q-btn>
      </div>
    <div class="container_task_page">


      <div v-for="x in status" :key="x.id" class="task_container">
        <div class="task_label">
          <span>{{ x.text }}</span>
          <div v-if="x.id === 0" class="add_task" @click="addOpen(x.id)">
            <q-icon name="add" size="16px" />
            <span>{{ t('tasks.add') }}</span>
          </div>
        </div>
        <draggable
          class="draggable"
          :list="groupedTasks[x.id]"
          itemKey="id"
          :clone="cloneTask"
          @change="(evt) => onDragChange(evt, x.id)"
          :group="{ name: 'tasks', pull: true, put: true }"
        >
          <template #item="{ element }">
            <task-item
              :element="element"
              :type="type"
              :status="status"
              @changeStatus="changeStatus"
              @updateTask="upsertTask"
              @deleteTask="deleteTask"
            />
          </template>
        </draggable>
      </div>
    </div>

    <ad-dialog
      :isOpenModal="isOpenModal"
      @closeDialog="addOpen"
      :statusId="statusId"
      @upsertTask="upsertTask"
    />
  </q-page>
</template>

<script setup>
import draggable from 'vuedraggable'
import { computed, onMounted, ref } from 'vue'
import TaskItem from 'pages/Cabinet/tasks/components/taskItem.vue'
import AdDialog from 'pages/Cabinet/tasks/components/adDialog.vue'
import { useUserStore } from 'stores/user.js'
import { useQuasar } from 'quasar'
import { useI18n } from 'src/i18n/index.js'

const $q = useQuasar();
const userStore = useUserStore()
const { t } = useI18n()
const isOpenModal = ref(false);
const statusId = ref(null);
const typeFilter = ref(null);
const deadLineFilter = ref('');
function addOpen(id) {
  if (typeof id === 'number') {
    statusId.value = id;
  }
  isOpenModal.value = !isOpenModal.value;
}
function generateUniqueId() {
  return Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`);
}
function upsertTask(data) {
  if (!data) return;
  if (data.id){
    try {
      const index = tasks.value.findIndex((x) => x.id === data.id);
      if (index > -1) {
        tasks.value[index] = {...tasks.value[index], ...data};
      }
      successNotify(t('tasks.updated'), 'positive')
    }catch (e) {
      errorNotify(t('tasks.updateError'))
    }
  } else {
    try {
      const newTask = {
        ...data,
        id: generateUniqueId()
      };
      tasks.value.unshift(newTask);

      successNotify(t('tasks.added'), 'positive');
    }catch (e) {
      errorNotify(t('tasks.addError'))
    }
  }
}
function deleteTask(data){
  try {
    const index = tasks.value.findIndex((x) => x.id === data.id);
    if (index > -1){
      tasks.value.splice(index, 1);
    }
    successNotify(t('tasks.deleted'), 'warning')
  }catch (e) {
    errorNotify(t('tasks.deleteError'))
  }
}

const status = computed(() => [
  {id: 0, text: t('status.registered')},
  {id: 1, text: t('status.process')},
  {id: 2, text: t('status.completed')},
  {id: 3, text: t('status.testing')},
  {id: 5, text: t('status.verified')},
])
const cloneTask = (original) => ({ ...original });
const groupedTasks = computed(() => {
  const result = {};
  status.value.forEach((s) => (result[s.id] = []));

  for (const task of tasks.value) {
    if (result[task.status]) {
      result[task.status].push(task);
    }
  }
  return result;
});

function onDragChange(evt, newStatusId) {
  const movedTask = evt.added?.element;
  if (movedTask) {
    movedTask.status = newStatusId;
    const index = tasks.value.findIndex((t) => t.id === movedTask.id);
    if (index !== -1) {
      tasks.value[index].status = newStatusId;
    }
  }
}
function changeStatus({ statusId, element }) {
  const index = tasks.value.findIndex((t) => t.id === element.id);
  if (index !== -1) {
    tasks.value[index].status = statusId;
  }
}

const tasks = ref([
  {id: 1, userId: 1, status: 5, desc: 'Description text test', text: "Task 1", taskType: 2, deadLine: '2025/05/02'},
  {id: 2, userId: 2, status: 0, desc: 'Description text test', text: "Task 2", taskType: 2, deadLine: '2025/05/02'},
  {id: 3, userId: 2, status: 5, desc: 'Description text test', text: "Task 3", taskType: 0, deadLine: '2025/06/01'},
  {id: 4, userId: 1, status: 2, desc: 'Description text test', text: "Task 4", taskType: 1, deadLine: '2025/05/02'},
  {id: 5, userId: 2, status: 0, desc: 'Description text test', text: "Task 5", taskType: 2, deadLine: '2025/06/01'},
  {id: 6, userId: 2, status: 3, desc: 'Description text test', text: "Task 6", taskType: 0, deadLine: '2025/05/02'},
  {id: 7, userId: 1, status: 2, desc: 'Description text test', text: "Task 7", taskType: 1, deadLine: '2025/06/01'},
  {id: 8, userId: 2, status: 3, desc: 'Description text test', text: "Task 8", taskType: 2, deadLine: '2025/07/10'},
  {id: 9, userId: 1, status: 0, desc: 'Description text test', text: "Task 9", taskType: 0, deadLine: '2025/05/02'},
  {id: 10, userId: 2, status: 1, desc: 'Description text test', text: "Task 11", taskType: 2, deadLine: '2025/07/10'},
  {id: 11, userId: 1, status: 3, desc: 'Description text test', text: "Task 12", taskType: 0, deadLine: '2025/05/02'},
  {id: 12, userId: 1, status: 5, desc: 'Description text test', text: "Task 13", taskType: 2, deadLine: '2025/07/10'},
  {id: 13, userId: 2, status: 0, desc: 'Description text test', text: "Task 14", taskType: 1, deadLine: '2025/05/02'},
  // {id: 14, userId: 2, status: 2, desc: 'Description text test', text: "Task 15", taskType: 0, deadLine: '2025/05/02'},
  // {id: 15, userId: 1, status: 3, desc: 'Description text test', text: "Task 16", taskType: 1, deadLine: '2025/05/02'},
  // {id: 16, userId: 2, status: 0, desc: 'Description text test', text: "Task 17", taskType: 0, deadLine: '2025/06/01'},
  // {id: 17, userId: 2, status: 1, desc: 'Description text test', text: "Task 18", taskType: 1, deadLine: '2025/06/01'},
  // {id: 18, userId: 1, status: 5, desc: 'Description text test', text: "Task 19", taskType: 1, deadLine: '2025/06/01'},
  // {id: 19, userId: 2, status: 1, desc: 'Description text test', text: "Task 20", taskType: 0, deadLine: '2025/06/01'},
  // {id: 20, userId: 2, status: 3, desc: 'Description text test', text: "Task 21", taskType: 2, deadLine: '2025/06/01'},
  // {id: 21, userId: 2, status: 1, desc: 'Description text test', text: "Task 22", taskType: 1, deadLine: '2025/06/01'},
  // {id: 22, userId: 1, status: 1, desc: 'Description text test', text: "Task 23", taskType: 0, deadLine: '2025/06/01'},
  // {id: 23, userId: 1, status: 5, desc: 'Description text test', text: "Task 24", taskType: 1, deadLine: '2025/06/01'},
  // {id: 24, userId: 2, status: 0, desc: 'Description text test', text: "Task 25", taskType: 2, deadLine: '2025/06/01'},
  // {id: 25, userId: 2, status: 3, desc: 'Description text test', text: "Task 26", taskType: 0, deadLine: '2025/06/01'},
  // {id: 26, userId: 1, status: 3, desc: 'Description text test', text: "Task 27", taskType: 2, deadLine: '2025/07/10'},
  {id: 27, userId: 2, status: 1, desc: 'Description text test', text: "Task 28", taskType: 1, deadLine: '2025/07/10'},
  {id: 28, userId: 2, status: 5, desc: 'Description text test', text: "Task 29", taskType: 1, deadLine: '2025/07/10'},
  {id: 29, userId: 1, status: 2, desc: 'Description text test', text: "Task 30", taskType: 2, deadLine: '2025/07/10'},
  {id: 30, userId: 1, status: 0, desc: 'Description text test', text: "Task 31", taskType: 0, deadLine: '2025/07/10'},
  {id: 31, userId: 1, status: 2, desc: 'Description text test', text: "Task 32", taskType: 1, deadLine: '2025/07/10'},
  {id: 32, userId: 2, status: 2, desc: 'Description text test', text: "Task 33", taskType: 2, deadLine: '2025/07/10'},
  {id: 33, userId: 1, status: 2, desc: 'Description text test', text: "Task 34", taskType: 0, deadLine: '2025/07/10'},
  {id: 34, userId: 1, status: 1, desc: 'Description text test', text: "Task 35", taskType: 2, deadLine: '2025/07/10'},
  {id: 35, userId: 2, status: 0, desc: 'Description text test', text: "Task 36", taskType: 1, deadLine: '2025/07/10'},
  {id: 36, userId: 2, status: 3, desc: 'Description text test', text: "Task 37", taskType: 0, deadLine: '2025/07/10'},
  {id: 37, userId: 1, status: 5, desc: 'Description text test',text : "Task 38", taskType: 2, deadLine: '2025/07/10'}
])
const type = computed(() => [
  {id: 0, text: t('type.high')},
  {id: 1, text: t('type.normal')},
  {id: 2, text: t('type.low')}
])
function getType(id) {
  const typeItem = type.value.find((item) => item.id === id)
  if (typeItem) {
    return typeItem.text
  }
}
const filteredTasks = ref([]);
const copyTask = ref(tasks.value);
async function selectTask(id) {
  changeAll();
  if (deadLineFilter.value){getFilterDate()}
  filteredTasks.value = tasks.value.filter(task => task.taskType === id);
  tasks.value = filteredTasks.value;
  typeFilter.value = id;
}
function getFilterDate() {
  changeAll();
  if (typeFilter.value) {selectTask(typeFilter.value)}
  filteredTasks.value = tasks.value.filter(task => task.deadLine === deadLineFilter.value);
  tasks.value = filteredTasks.value;
}
const allTasks = ref(false);
const userId = computed(() => {return userStore.user.userId});
function changeAll(){
  if (allTasks.value === false){
    tasks.value = copyTask.value;
    filteredTasks.value = tasks.value.filter(task => task.userId === userId.value);
    tasks.value = filteredTasks.value;
  }else {
    tasks.value = copyTask.value;
  }
}
function clearFilter(){
  typeFilter.value = null;
  deadLineFilter.value = '';
  tasks.value = copyTask.value;
  allTasks.value = false;
  changeAll();
}
const successNotify = (val, val1) => {
  $q.notify({
    type: val1,
    textColor: 'white',
    message: val,
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
onMounted(() => {
  changeAll();
})
</script>

<style scoped>
.task-page {
  min-height: 100%;
  padding: 8px 0 24px;
}

.task-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.filter-btn,
.clear-filter-btn {
  height: 42px;
  min-height: 42px;
  border-radius: 12px !important;
}

.filter-btn {
  width: 170px;
  min-width: 170px;
}

.date-filter {
  width: 180px;
  min-width: 180px;
  height: 42px;
  min-height: 42px;
}

.date-filter :deep(.q-field__control) {
  height: 42px !important;
  min-height: 42px !important;
  padding: 0 10px !important;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border) !important;
  border-radius: 12px !important;
  background: var(--surface-soft) !important;
  color: var(--text) !important;
  box-shadow: none !important;
}

.date-filter :deep(.q-field__inner),
.date-filter :deep(.q-field__control-container) {
  height: 100% !important;
  min-height: 0 !important;
  padding-top: 0 !important;
  display: flex;
  align-items: center;
}

.date-filter :deep(.q-field__native) {
  min-height: 0 !important;
  height: 24px !important;
  padding: 0 !important;
  align-self: center;
  color: var(--text) !important;
  font-size: 12px;
  line-height: 24px;
}

.date-filter :deep(.q-field__label) {
  color: var(--text-soft) !important;
  font-size: 11px;
  line-height: 16px;
}

.date-filter :deep(.q-field__append),
.date-filter :deep(.q-field__marginal) {
  height: 24px !important;
  min-height: 24px !important;
  align-self: center;
  display: flex;
  align-items: center;
  padding: 0 !important;
  color: var(--text-soft) !important;
}

.date-filter :deep(.q-field__append .q-icon) {
  font-size: 18px;
}

.date-filter :deep(.q-field--focused .q-field__control),
.date-filter:focus-within :deep(.q-field__control) {
  border-color: rgba(37, 99, 235, 0.65) !important;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
}

.all-tasks-check {
  margin-left: 2px;
}

.clear-filter-btn {
  margin-left: auto;
  color: var(--text-soft);
}

.add_task .q-icon {
  color: #2563eb;
}
</style>
