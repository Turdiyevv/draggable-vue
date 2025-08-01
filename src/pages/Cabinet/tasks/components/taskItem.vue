<template>
  <div class="task_item" :style="getBorder">
    <div class="element_page">
      <div style="display: flex;">
        <q-select class="q_select" color="gray"
          :options="status"
          option-value="id"
          option-label="text"
          v-model="selectedOption"
          @update:model-value="(val) => emitChange(val.id)"
          filled dense
        />
      </div>
      <div class="action_panel">
        <q-icon @click="editOpen" class="edit_c cursor-pointer" color="orange" name="edit"></q-icon>
        <q-icon @click="deleteFunction" class="edit_c cursor-pointer" color="red" name="delete"></q-icon>
      </div>
    </div>
    <div class="task_text">
      <div class="text-bold">{{element.text}}</div>
      <div>{{element.desc}}</div>
      <div>{{element.userId}}</div>
      <div class="bottom_panel">
        <div class="type_class">
          <q-select
            class="q_select"
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

    <ad-dialog :isOpenModal="isOpenModal" :element="element" @closeDialog="editOpen"/>

  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import AdDialog from 'pages/Cabinet/tasks/components/adDialog.vue'
import { useUserStore } from '../../../../stores/user.js'

const userStore = useUserStore()
const props = defineProps({
  element: Object,
  status: Array,
  type: Array
});
const emit = defineEmits(['changeStatus']);

const isOpenModal = ref(false);
const element = computed(() => {return props.element});
function editOpen() {
  isOpenModal.value = !isOpenModal.value;
}
function deleteFunction() {
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
  if (!selectedTypeOption.value) return 'border: 1px solid grey'
  switch (selectedTypeOption.value.id) {
    case 0:
      return 'border: 1px solid red; box-shadow: 0 0 5px 1px red'
    case 1:
      return 'border: 1px solid green; box-shadow: 0 0 5px 1px green'
    case 2:
      return 'border: 1px solid grey; box-shadow: 0 0 5px 1px grey'
    default:
      return 'border: 1px solid grey; box-shadow: 0 0 5px 1px grey'
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
.color-c{
  border: 1px solid red !important;
}
.q_bg_select0{
  .q-field__control{
    background-color: red !important;
    color: white !important;
  }
}
.q_type_select{
  >>>.q-field__native,
      >>>.q-placeholder,
      >>>.q-field__label{
    color: white !important;
  }
}
</style>
