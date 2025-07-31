<template>
  <div class="task_item">
    <q-select class=""
      :options="status"
      option-value="id"
      option-label="text"
      v-model="selectedOption"
      @update:model-value="(val) => emitChange(val.id)"
      filled
      dense
    />
    <div class="task_text">{{ element }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  element: Object,
  status: Array,
});
const emit = defineEmits(['changeStatus']);

const selectedOption = ref(null);


watch(
  () => props.element.status,
  (newVal) => {
    selectedOption.value = props.status.find(s => s.id === newVal);
  }
);
onMounted(() => {
  selectedOption.value = props.status.find(s => s.id === props.element.status);
});

function emitChange(id) {
  emit('changeStatus', { statusId: id, element: props.element });
}
</script>

<style scoped>
.color-c{
  border: 1px solid red !important;
}
</style>
