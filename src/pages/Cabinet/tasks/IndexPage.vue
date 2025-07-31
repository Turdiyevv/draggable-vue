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
            <task-item :element="element" :status="status" @changeStatus="changeStatus" />
          </template>
        </draggable>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import draggable from 'vuedraggable'
import { computed, ref } from 'vue'
import TaskItem from 'pages/Cabinet/tasks/components/taskItem.vue'

const status = ref([
  {id: 0, text: "Registered"},
  {id: 1, text: "In process"},
  {id: 2, text: "Completed"},
  {id: 3, text: "Testing"},
  {id: 5, text: "Verified"},
])

const cloneTask = (original) => ({ ...original });

const groupedTasks = computed(() => {
  const result = {};
  status.value.forEach((s) => (result[s.id] = []));
  tasks.value.forEach((task) => {
    if (result[task.status]) {
      result[task.status].push(task);
    }
  });
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
  {id: 1, userId: 1, status: 5, desc: 'Description text test', text: "Task 1"},
  {id: 2, userId: 2, status: 0, desc: 'Description text test', text: "Task 2"},
  {id: 3, userId: 2, status: 5, desc: 'Description text test', text: "Task 3"},
  {id: 4, userId: 1, status: 0, desc: 'Description text test', text: "Task 4"},
  {id: 5, userId: 2, status: 0, desc: 'Description text test', text: "Task 5"},
  {id: 6, userId: 2, status: 3, desc: 'Description text test', text: "Task 6"},
  {id: 7, userId: 1, status: 0, desc: 'Description text test', text: "Task 7"},
  {id: 8, userId: 2, status: 3, desc: 'Description text test', text: "Task 8"},
  {id: 9, userId: 1, status: 0, desc: 'Description text test', text: "Task 9"},
  {id: 10, userId: 2, status: 3, desc: 'Description text test', text: "Task 11"},
  {id: 11, userId: 1, status: 3, desc: 'Description text test', text: "Task 12"},
  {id: 12, userId: 1, status: 5, desc: 'Description text test', text: "Task 13"},
  {id: 13, userId: 2, status: 0, desc: 'Description text test', text: "Task 14"},
  {id: 14, userId: 2, status: 3, desc: 'Description text test', text: "Task 15"},
  {id: 15, userId: 1, status: 3, desc: 'Description text test', text: "Task 16"},
  {id: 16, userId: 2, status: 0, desc: 'Description text test', text: "Task 17"},
  {id: 17, userId: 2, status: 1, desc: 'Description text test', text: "Task 18"},
  {id: 18, userId: 1, status: 5, desc: 'Description text test', text: "Task 19"},
  {id: 19, userId: 2, status: 1, desc: 'Description text test', text: "Task 20"},
  {id: 20, userId: 2, status: 3, desc: 'Description text test', text: "Task 21"},
  {id: 21, userId: 2, status: 1, desc: 'Description text test', text: "Task 22"},
  {id: 22, userId: 1, status: 1, desc: 'Description text test', text: "Task 23"},
  {id: 23, userId: 1, status: 5, desc: 'Description text test', text: "Task 24"},
  {id: 24, userId: 2, status: 1, desc: 'Description text test', text: "Task 25"},
  {id: 25, userId: 2, status: 3, desc: 'Description text test', text: "Task 26"},
  {id: 26, userId: 1, status: 3, desc: 'Description text test', text: "Task 27"},
  {id: 27, userId: 2, status: 1, desc: 'Description text test', text: "Task 28"},
  {id: 28, userId: 2, status: 5, desc: 'Description text test', text: "Task 29"},
  {id: 29, userId: 1, status: 2, desc: 'Description text test', text: "Task 30"},
  {id: 30, userId: 1, status: 1, desc: 'Description text test', text: "Task 31"},
  {id: 31, userId: 1, status: 2, desc: 'Description text test', text: "Task 32"},
  {id: 32, userId: 2, status: 2, desc: 'Description text test', text: "Task 33"},
  {id: 33, userId: 1, status: 2, desc: 'Description text test', text: "Task 34"},
  {id: 34, userId: 1, status: 1, desc: 'Description text test', text: "Task 35"},
  {id: 35, userId: 2, status: 2, desc: 'Description text test', text: "Task 36"},
  {id: 36, userId: 2, status: 2, desc: 'Description text test', text: "Task 37"},
  {id: 37, userId: 1, status: 5, desc: 'Description text test',text : "Task 38"}
])
</script>
