<template>
  <div class="task_item" :style="getBorder">
    <div class="task-header">
      <div class="avatar_task">
        <img class="img_style" v-if="element?.userId === 1" src="https://cdn.quasar.dev/img/boy-avatar.png" alt="">
        <img class="img_style" v-else src="https://cdn.quasar.dev/img/avatar4.jpg" alt="">
      </div>
      <div class="task-title text-bold">{{ element.text?.slice(0, 5) }}</div>
      <q-select class="q_select task-status-select"
        popup-content-class="task-select-menu"
        :options="status"
        option-value="id"
        option-label="text"
        v-model="selectedOption"
        @update:model-value="(val) => emitChange(val.id)"
        outlined dense
      />
      <q-select
        class="q_select task-type-select"
        popup-content-class="task-select-menu"
        :style="{ '--type-color': typeColor }"
        :options="type"
        option-value="id"
        option-label="text"
          emit-value
          map-options
          v-model="selectedTypeId"
        outlined dense
      />
    </div>
    <div class="task_text">
      <div>{{element.desc}}</div>
      <div class="bottom_panel">
        <div class="action_panel">
          <q-icon @click="editOpen" class="edit_c cursor-pointer" color="orange" name="description"></q-icon>
          <q-icon @click="deleteFunction" class="edit_c cursor-pointer" color="red" name="delete"></q-icon>
        </div>
        <div>{{element.deadLine}}</div>
      </div>
    </div>

    <ad-dialog
      :isOpenModal="isOpenModal"
      :element="element"
      @closeDialog="editOpen"
      @upsertTask="upsertTask"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import AdDialog from 'pages/Cabinet/tasks/components/adDialog.vue'
const props = defineProps({
  element: Object,
  status: Array,
  type: Array
});
const emit = defineEmits(['changeStatus', 'updateTask', 'deleteTask']);

const isOpenModal = ref(false);
const element = computed(() => {return props.element});

function editOpen() {
  isOpenModal.value = !isOpenModal.value;
}
function deleteFunction() {
  emit('deleteTask', element.value)
}
function upsertTask(data) {
  emit('updateTask', data);
}

const selectedOption = ref(null);
const selectedTypeId = ref(null);
const selectedTypeOption = computed(() => props.type.find(item => item.id === selectedTypeId.value));
const typeColor = computed(() => {
  switch (selectedTypeOption.value?.id) {
    case 0:
      return 'red'
    case 1:
      return 'green'
    default:
      return 'grey'
  }
})

function emitChange(id) {
  emit('changeStatus', { statusId: id, element: props.element });
}
const getBorder = computed(() => {
  if (!selectedTypeOption.value) return 'box-shadow: 0px 0px 2px 0.1px grey'
  switch (selectedTypeOption.value.id) {
    case 0:
      return 'box-shadow: 0px 0px 2px 0.1px red'
    case 1:
      return 'box-shadow: 0px 0px 2px 0.1px green'
    case 2:
      return 'box-shadow: 0px 0px 2px 0.1px grey'
    default:
      return 'box-shadow: 0px 0px 2px 0.1px grey'
  }
})
watch(
  [() => props.element.status, () => props.status],
  ([newVal]) => {
    selectedOption.value = props.status.find(s => s.id === newVal);
  }
);
watch(
  [() => props.element.taskType, () => props.type],
  ([newVal]) => {
    selectedTypeId.value = newVal;
  }
);
onMounted(() => {
  selectedOption.value = props.status.find(s => s.id === props.element.status);
  selectedTypeId.value = props.element.taskType;
});

</script>

<style scoped>
.task-status-select {
  margin-left: 0 !important;
}

.task-header {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.task-title {
  flex: 0 1 5ch;
  min-width: 0;
  max-width: 5ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-header .task-status-select,
.task-header .task-type-select {
  width: 86px;
  max-width: 86px;
  flex: 0 0 86px;
  min-width: 0;
}

.task-header .task-type-select {
  width: max-content;
  max-width: max-content;
  flex: 0 0 auto;
}

.avatar_task{
  border-radius: 15px;
  background-color: #1d1d1d;
  width: 25px;
  height: 25px;
  .img_style{
    border-radius: 15px;
    height: auto;
    width: auto;
    max-height: 100%;
    max-width: 100%;
  }
}
.task-status-select :deep(.q-field__control),
.task-type-select :deep(.q-field__control) {
  min-height: 30px !important;
  height: 30px !important;
  padding: 0 !important;
  display: flex;
  align-items: center;
  gap: 0;
  background: transparent !important;
  border: 0 !important;
  border-radius: 8px !important;
  box-shadow: none !important;
}

.task-status-select :deep(.q-field__control.relative-position.row.no-wrap),
.task-type-select :deep(.q-field__control.relative-position.row.no-wrap) {
  align-items: center !important;
}

.task-status-select :deep(.q-field__control::before),
.task-status-select :deep(.q-field__control::after),
.task-type-select :deep(.q-field__control::before),
.task-type-select :deep(.q-field__control::after) {
  border: 0 !important;
  box-shadow: none !important;
}

.task-status-select :deep(.q-field__native),
.task-type-select :deep(.q-field__native) {
  min-height: 0 !important;
  height: 20px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  line-height: 20px;
}

.task-type-select :deep(.q-field__native),
.task-type-select :deep(.q-placeholder) {
  color: var(--type-color) !important;
}

.task-type-select :deep(.q-field__native) {
  width: auto;
  min-width: 0;
  flex: 0 1 auto;
}

.task-status-select :deep(.q-field__append),
.task-status-select :deep(.q-field__marginal),
.task-status-select :deep(.q-anchor--skip),
.task-type-select :deep(.q-field__append),
.task-type-select :deep(.q-field__marginal),
.task-type-select :deep(.q-anchor--skip) {
  height: 20px !important;
  min-height: 20px !important;
  max-height: 20px !important;
  background: inherit !important;
  color: inherit !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0 !important;
  margin: 0 !important;
}

.task-status-select :deep(.q-field__append .q-icon),
.task-type-select :deep(.q-field__append .q-icon) {
  color: inherit !important;
  opacity: 0.8;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 18px;
  height: 18px;
  margin: 0;
  line-height: 18px;
}

.task-type-select :deep(.q-field__append .q-icon) {
  color: var(--type-color) !important;
}
</style>
