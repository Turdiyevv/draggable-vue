<template>
  <q-page>
    <div class="container_task_page">
      <div v-for="(x, index) in status" :key="index" class="task_container">
        <div class="task_label">{{x.text}}</div>
        <draggable
          :list="getStatus(x.id)"
          :key=index
          :clone="cloneTask"
          :move="checkMove"
          :group="{ name: 'tasks', pull: true, put: true }"
        >
          <template #item="{ element }">
            <div class="task_item">
              <div>{{element.text}}</div>
              <div>{{element.status}}</div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import draggable from 'vuedraggable'
import { ref } from 'vue'

const status = ref([
  {id: 0, text: "Registered"},
  {id: 1, text: "In process"},
  {id: 2, text: "Completed"},
  {id: 3, text: "Testing"},
  {id: 5, text: "Verified"},
])
function cloneTask(original) {
  return { ...original };
}

function checkMove(evt) {
  const draggedElement = evt.draggedContext.element;
  const newStatus = parseInt(evt.to.parentElement.querySelector('.task_label').getAttribute('data-status-id'));
  draggedElement.status = newStatus;
  return true;
}
function getStatus(id) {
  return tasks.value.filter(x => x.status === id);
}
const tasks = ref([
  {id: 1, userId: 1, status: 5, text: "Task 1"},
  {id: 2, userId: 2, status: 0, text: "Task 2"},
  {id: 3, userId: 2, status: 5, text: "Task 3"},
  {id: 4, userId: 1, status: 0, text: "Task 4"},
  {id: 5, userId: 2, status: 0, text: "Task 5"},
  {id: 6, userId: 2, status: 5, text: "Task 6"},
  {id: 7, userId: 1, status: 0, text: "Task 7"},
  {id: 8, userId: 2, status: 0, text: "Task 8"},
  {id: 9, userId: 1, status: 0, text: "Task 9"},
  {id: 10, userId: 2, status: 5, text: "Task 11"},
  {id: 11, userId: 1, status: 0, text: "Task 12"},
  {id: 12, userId: 1, status: 5, text: "Task 13"},
  {id: 13, userId: 2, status: 0, text: "Task 14"},
  {id: 14, userId: 2, status: 5, text: "Task 15"},
  {id: 15, userId: 1, status: 0, text: "Task 16"},
  {id: 16, userId: 2, status: 0, text: "Task 17"},
  {id: 17, userId: 2, status: 1, text: "Task 18"},
  {id: 18, userId: 1, status: 5, text: "Task 19"},
  {id: 19, userId: 2, status: 1, text: "Task 20"},
  {id: 110, userId: 2, status: 5, text: "Task 21"},
  {id: 111, userId: 2, status: 1, text: "Task 22"},
  {id: 112, userId: 1, status: 1, text: "Task 23"},
  {id: 113, userId: 1, status: 5, text: "Task 24"},
  {id: 114, userId: 2, status: 1, text: "Task 25"},
  {id: 115, userId: 2, status: 1, text: "Task 26"},
  {id: 116, userId: 1, status: 5, text: "Task 27"},
  {id: 117, userId: 2, status: 5, text: "Task 28"},
  {id: 118, userId: 2, status: 5, text: "Task 29"},
  {id: 119, userId: 1, status: 2, text: "Task 30"},
  {id: 120, userId: 1, status: 5, text: "Task 31"},
  {id: 131, userId: 1, status: 2, text: "Task 32"},
  {id: 132, userId: 2, status: 2, text: "Task 33"},
  {id: 133, userId: 1, status: 2, text: "Task 34"},
  {id: 134, userId: 1, status: 5, text: "Task 35"},
  {id: 135, userId: 2, status: 2, text: "Task 36"},
  {id: 136, userId: 2, status: 2, text: "Task 37"},
  {id: 137, userId: 1, status: 5, text: "Task 38"},
  {id: 138, userId: 2, status: 2, text: "Task 39"},
  {id: 139, userId: 1, status: 5, text: "Task 40"},
  {id: 140, userId: 1, status: 5, text: "Task 41"},
  {id: 141, userId: 2, status: 3, text: "Task 42"},
  {id: 142, userId: 1, status: 3, text: "Task 50"},
  {id: 142, userId: 2, status: 5, text: "Task 51"},
  {id: 142, userId: 1, status: 3, text: "Task 52"},
  {id: 142, userId: 2, status: 3, text: "Task 53"},
  {id: 142, userId: 2, status: 5, text: "Task 54"},
  {id: 142, userId: 1, status: 3, text: "Task 55"},
  {id: 142, userId: 2, status: 3, text: "Task 56"},
  {id: 142, userId: 2, status: 5, text: "Task 57"},
])
</script>
