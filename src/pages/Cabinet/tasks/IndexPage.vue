<template>
  <q-page>
    <div class="container_task_page">
      <div v-for="x in status" :key="x.id" class="task_container">
        <div class="task_label">{{ x.text }}</div>
        <draggable
          class="draggable"
          :list="groupedTasks[x.id]"
          itemKey="id"
          :clone="cloneTask"
          @change="(evt) => onDragChange(evt, x.id)"
          :group="{ name: 'tasks', pull: true, put: true }"
        >
          <template #item="{ element }">
            <task-item :element="element" :type="type" :status="status" @changeStatus="changeStatus" />
          </template>
        </draggable>
            <div class="add_task flex align-center cursor-pointer" @click="addOpen(x.id)">
              <q-icon name="add" color="red" size="sm"/>
              <div class="flex justify-center q-mx-auto">add task</div>
            </div>
      </div>
    </div>

      <div class="pagination">
        <q-pagination v-model="page" :max="totalPages" direction-links/>
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
import { computed, ref } from 'vue'
import TaskItem from 'pages/Cabinet/tasks/components/taskItem.vue'
import AdDialog from 'pages/Cabinet/tasks/components/adDialog.vue'

const isOpenModal = ref(false);
const statusId = ref(null);
function addOpen(id) {
  if (typeof id === 'number') {
    statusId.value = id;
  }
  isOpenModal.value = !isOpenModal.value;
}

function upsertTask(data) {
  console.log(data);
}


const status = ref([
  {id: 0, text: "Registered"},
  {id: 1, text: "In process"},
  {id: 2, text: "Completed"},
  {id: 3, text: "Testing"},
  {id: 5, text: "Verified"},
])
const cloneTask = (original) => ({ ...original });
const page = ref(1);
const perPage = ref(10);
const totalPages = computed(() =>
  Math.ceil(tasks.value.length / perPage.value)
)
const groupedTasks = computed(() => {
  const result = {};
  status.value.forEach((s) => (result[s.id] = []));

  const start = (page.value - 1) * perPage.value;
  const end = start + perPage.value;
  const paginatedTasks = tasks.value.slice(start, end);

  for (const task of paginatedTasks) {
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
  {id: 1, userId: 1, status: 5, desc: 'Description text test', text: "Task 1", taskType: 2, deadLine: '01-01-2026'},
  {id: 2, userId: 2, status: 0, desc: 'Description text test', text: "Task 2", taskType: 2, deadLine: '01-01-2026'},
  {id: 3, userId: 2, status: 5, desc: 'Description text test', text: "Task 3", taskType: 0, deadLine: '01-01-2026'},
  {id: 4, userId: 1, status: 2, desc: 'Description text test', text: "Task 4", taskType: 1, deadLine: '01-01-2026'},
  {id: 5, userId: 2, status: 0, desc: 'Description text test', text: "Task 5", taskType: 2, deadLine: '01-01-2026'},
  {id: 6, userId: 2, status: 3, desc: 'Description text test', text: "Task 6", taskType: 0, deadLine: '01-01-2026'},
  {id: 7, userId: 1, status: 2, desc: 'Description text test', text: "Task 7", taskType: 1, deadLine: '01-01-2026'},
  {id: 8, userId: 2, status: 3, desc: 'Description text test', text: "Task 8", taskType: 2, deadLine: '01-01-2026'},
  {id: 9, userId: 1, status: 0, desc: 'Description text test', text: "Task 9", taskType: 0, deadLine: '01-01-2026'},
  {id: 10, userId: 2, status: 1, desc: 'Description text test', text: "Task 11", taskType: 2, deadLine: '01-01-2026'},
  {id: 11, userId: 1, status: 3, desc: 'Description text test', text: "Task 12", taskType: 0, deadLine: '01-01-2026'},
  {id: 12, userId: 1, status: 5, desc: 'Description text test', text: "Task 13", taskType: 2, deadLine: '01-01-2026'},
  {id: 13, userId: 2, status: 0, desc: 'Description text test', text: "Task 14", taskType: 1, deadLine: '01-01-2026'},
  {id: 14, userId: 2, status: 2, desc: 'Description text test', text: "Task 15", taskType: 0, deadLine: '01-01-2026'},
  {id: 15, userId: 1, status: 3, desc: 'Description text test', text: "Task 16", taskType: 1, deadLine: '01-01-2026'},
  {id: 16, userId: 2, status: 0, desc: 'Description text test', text: "Task 17", taskType: 0, deadLine: '01-01-2026'},
  {id: 17, userId: 2, status: 1, desc: 'Description text test', text: "Task 18", taskType: 1, deadLine: '01-01-2026'},
  {id: 18, userId: 1, status: 5, desc: 'Description text test', text: "Task 19", taskType: 1, deadLine: '01-01-2026'},
  {id: 19, userId: 2, status: 1, desc: 'Description text test', text: "Task 20", taskType: 0, deadLine: '01-01-2026'},
  {id: 20, userId: 2, status: 3, desc: 'Description text test', text: "Task 21", taskType: 2, deadLine: '01-01-2026'},
  {id: 21, userId: 2, status: 1, desc: 'Description text test', text: "Task 22", taskType: 1, deadLine: '01-01-2026'},
  {id: 22, userId: 1, status: 1, desc: 'Description text test', text: "Task 23", taskType: 0, deadLine: '01-01-2026'},
  {id: 23, userId: 1, status: 5, desc: 'Description text test', text: "Task 24", taskType: 1, deadLine: '01-01-2026'},
  {id: 24, userId: 2, status: 0, desc: 'Description text test', text: "Task 25", taskType: 2, deadLine: '01-01-2026'},
  {id: 25, userId: 2, status: 3, desc: 'Description text test', text: "Task 26", taskType: 0, deadLine: '01-01-2026'},
  {id: 26, userId: 1, status: 3, desc: 'Description text test', text: "Task 27", taskType: 2, deadLine: '01-01-2026'},
  {id: 27, userId: 2, status: 1, desc: 'Description text test', text: "Task 28", taskType: 1, deadLine: '01-01-2026'},
  {id: 28, userId: 2, status: 5, desc: 'Description text test', text: "Task 29", taskType: 1, deadLine: '01-01-2026'},
  {id: 29, userId: 1, status: 2, desc: 'Description text test', text: "Task 30", taskType: 2, deadLine: '01-01-2026'},
  {id: 30, userId: 1, status: 0, desc: 'Description text test', text: "Task 31", taskType: 0, deadLine: '01-01-2026'},
  {id: 31, userId: 1, status: 2, desc: 'Description text test', text: "Task 32", taskType: 1, deadLine: '01-01-2026'},
  {id: 32, userId: 2, status: 2, desc: 'Description text test', text: "Task 33", taskType: 2, deadLine: '01-01-2026'},
  {id: 33, userId: 1, status: 2, desc: 'Description text test', text: "Task 34", taskType: 0, deadLine: '01-01-2026'},
  {id: 34, userId: 1, status: 1, desc: 'Description text test', text: "Task 35", taskType: 2, deadLine: '01-01-2026'},
  {id: 35, userId: 2, status: 0, desc: 'Description text test', text: "Task 36", taskType: 1, deadLine: '01-01-2026'},
  {id: 36, userId: 2, status: 3, desc: 'Description text test', text: "Task 37", taskType: 0, deadLine: '01-01-2026'},
  {id: 37, userId: 1, status: 5, desc: 'Description text test',text : "Task 38", taskType: 2, deadLine: '01-01-2026'}
])
const type = ref([
  {id: 0, text: "High"},
  {id: 1, text: "Normal"},
  {id: 2, text: "Low"}
])
</script>
