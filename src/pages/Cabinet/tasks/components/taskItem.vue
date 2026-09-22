<template>
  <div class="task_item" :style="getBorder">
    <div class="flex flex-wrap items-center">
      <div class="avatar_task">
        <img class="img_style" v-if="element?.userId === 1" src="https://cdn.quasar.dev/img/boy-avatar.png" alt="">
        <img class="img_style" v-else src="https://cdn.quasar.dev/img/avatar4.jpg" alt="">
      </div>
      <div class="text-bold">{{element.text}}</div>
    </div>
    <div class="element_page">
      <div style="display: flex;">
        <q-select class="q_select task-status-select"
          popup-content-class="task-select-menu"
          :options="status"
          option-value="id"
          option-label="text"
          v-model="selectedOption"
          @update:model-value="(val) => emitChange(val.id)"
          outlined dense
        />
      </div>
      <div class="action_panel">
        <q-icon @click="editOpen" class="edit_c cursor-pointer" color="orange" name="edit"></q-icon>
        <q-icon @click="deleteFunction" class="edit_c cursor-pointer" color="red" name="delete"></q-icon>
      </div>
    </div>
    <div class="task_text">
      <div>{{element.desc}}</div>
      <div class="bottom_panel">
        <div class="type_class">
          <q-select
            class="q_select task-type-select"
            popup-content-class="task-select-menu"
            :bg-color="bgColor"
            :options="type"
            option-value="id"
            option-label="text"
            v-model="selectedTypeOption"
            filled dense
          />
        </div>
<!--            @update:model-value="(val) => emitChange(val.id)"-->
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
const selectedTypeOption = ref(null);

function emitChange(id) {
  emit('changeStatus', { statusId: id, element: props.element });
}
const bgColor = computed(() => {
  if (!selectedTypeOption.value) return 'grey'
  switch (selectedTypeOption.value.id) {
    case 0:
      return 'red'
    case 1:
      return 'green'
    case 2:
      return 'grey'
    default:
      return 'grey'
  }
})
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
  () => props.element.status,
  (newVal) => {
    selectedOption.value = props.status.find(s => s.id === newVal);
  }
);
onMounted(() => {
  selectedOption.value = props.status.find(s => s.id === props.element.status);
  selectedTypeOption.value = props.type.find(s => s.id === props.element.taskType);
});

</script>

<style scoped>
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
.task-status-select :deep(.q-field__control) {
  min-height: 30px !important;
  height: 30px !important;
  padding: 0 8px 0 10px !important;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-soft) !important;
  border: 1px solid var(--border) !important;
  border-radius: 8px !important;
  box-shadow: none !important;
}

.task-status-select :deep(.q-field__native) {
  min-height: 0 !important;
  height: 20px !important;
  padding: 0 !important;
  line-height: 20px;
  align-items: center;
}

.task-status-select :deep(.q-field__append),
.task-status-select :deep(.q-field__marginal),
.task-status-select :deep(.q-anchor--skip) {
  height: 20px !important;
  min-height: 20px !important;
  max-height: 20px !important;
  background: inherit !important;
  color: inherit !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  align-items: center;
  display: flex;
  padding: 0 !important;
  margin: 0 !important;
}

.task-status-select :deep(.q-field__append .q-icon) {
  color: inherit !important;
  opacity: 0.8;
  font-size: 14px;
}

.task-type-select :deep(.q-field__control) {
  min-height: 30px !important;
  height: 30px !important;
  padding: 0 8px 0 10px !important;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px !important;
  box-shadow: none !important;
}

.task-type-select :deep(.q-field__native) {
  min-height: 0 !important;
  height: 20px !important;
  padding: 0 !important;
  line-height: 20px;
  align-items: center;
}

.task-type-select :deep(.q-field__append),
.task-type-select :deep(.q-field__marginal),
.task-type-select :deep(.q-anchor--skip) {
  height: 20px !important;
  min-height: 20px !important;
  max-height: 20px !important;
  background: transparent !important;
  color: inherit !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  align-items: center;
  display: flex;
  padding: 0 !important;
  margin: 0 !important;
}

.task-type-select :deep(.q-field__append .q-icon) {
  color: inherit !important;
  opacity: 0.8;
  font-size: 14px;
}
</style>
