<script setup>
import { computed, ref, watch } from 'vue'
import { useUserStore } from 'stores/user.js'
import { useI18n } from 'src/i18n/index.js'

const userStore = useUserStore()
const { t } = useI18n()
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

const status = computed(() => [
  {id: 0, text: t('status.registered')},
  {id: 1, text: t('status.process')},
  {id: 2, text: t('status.completed')},
  {id: 3, text: t('status.testing')},
  {id: 5, text: t('status.verified')},
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
const type = computed(() => [
  { id: 0, text: t('type.high') },
  { id: 1, text: t('type.normal') },
  { id: 2, text: t('type.low') },
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
        <div class="text-h6">{{ props.element ? t('dialog.edit') : t('dialog.create') }} № {{ Task?.id }}</div>
        <q-icon @click="closeDialog" color="red" class="cursor-pointer" name="close" size="sm" />
      </q-card-actions>
      <q-card-section>
        <q-form @submit="upsertTask">
          <div>
            <span style="text-decoration: underline">{{ t('dialog.user') }} {{ userId }}</span>
            <q-chip outline color="teal" size="sm">{{ getStatus(statusId)}}</q-chip>
          </div>
          <q-input
            :rules="[ val => val && val.length > 0 || t('validation.required')]"
            :readonly="noEdit"
            clearable
            outlined
            stack-label
            class="q-my-sm form-input"
            :label="t('dialog.taskTitle')"
            v-model="Task.text"
          >
            <template v-slot:prepend>
              <q-icon name="title" color="primary" />
            </template>
          </q-input>
          <q-input
            :rules="[ val => val && val.length > 0 || t('validation.required')]"
            :readonly="noEdit"
            clearable
            outlined
            stack-label
            class="q-my-sm form-input description-field"
            :label="t('dialog.description')"
            v-model="Task.desc"
            type="textarea"
            autogrow
          >
            <template v-slot:prepend>
              <q-icon name="notes" color="primary" />
            </template>
          </q-input>
          <div class="flex justify-between items-start">
            <div style="max-width: 300px">
              <q-input
                :rules="[ val => val && val.length > 0 || t('validation.required')]"
                :readonly="noEdit"
                :label="t('dialog.deadline')"
                outlined
                stack-label
                class="form-input"
                v-model="Task.deadLine"
                mask="date"
              >
                <template v-slot:prepend>
                  <q-icon name="event" color="primary" />
                </template>
                <template v-slot:append>
                  <q-icon name="calendar_today" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="Task.deadLine">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup :label="t('tasks.ok')" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <q-btn :disable="noEdit" style="width: 200px; height: 48px" unelevated
                   :label="[0, 1, 2].includes(Task.taskType) ? getType(Task.taskType) : t('tasks.selectType')"
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
            <q-btn :disable="noEdit" type="submit" color="green" unelevated :label="t('dialog.save')"></q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.form-input {
  margin: 0 0 20px !important;
  padding-bottom: 0 !important;
}

.form-input :deep(.q-field__control) {
  min-height: 52px !important;
  border-radius: 12px !important;
  background: var(--surface-soft) !important;
  box-shadow: none !important;
}

.form-input :deep(.q-field__control::before),
.form-input :deep(.q-field__control::after) {
  display: none !important;
}

.form-input :deep(.q-field__bottom) {
  position: static !important;
  display: block !important;
  min-height: 18px !important;
  margin-top: 0 !important;
  padding: 0 8px !important;
  line-height: 16px !important;
}

.form-input :deep(.q-field__messages) {
  line-height: 16px !important;
}

.description-field :deep(.q-field__control) {
  align-items: center;
}

.description-field :deep(.q-field__prepend),
.description-field :deep(.q-field__append),
.description-field :deep(.q-field__marginal) {
  align-self: center;
  height: 24px !important;
  min-height: 24px !important;
  display: flex;
  align-items: center;
}

.description-field :deep(.q-field__native) {
  line-height: 20px;
}
</style>
