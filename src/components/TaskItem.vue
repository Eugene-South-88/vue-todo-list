<template>
  <div class="task-item" @click="router.push(`/vue-todo-list/${item.id}`)">
    <div
        :class="['task-checkbox', {completed: item.complete}]"
        @click="toggleComplete(item.id, item.complete, $event)"
    >

      <Icon icon="mdi:check" width="14px"
      />

    </div>

    <span :class="['task-title', {completed: item.complete}]">{{ item.title }}</span>
    <span>
      <Icon class="icon" :icon="filterIcon" width="20" :ssr="true"/>
    </span>
    <span class="task-date">{{ item.deadline }}</span>

    <div class="task-actions">
      <button @click="remove(item.id, $event)">
        <Icon icon="mdi:trash-can-outline" width="18px"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import {Icon} from "@iconify/vue";
import {useRouter} from "vue-router";
import {computed, onMounted} from "vue";

const emit = defineEmits(['remove', 'toggleComplete'])

const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator(value) {
      // Проверка структуры объекта
      return (
          typeof value.id === 'string' &&
          typeof value.title === 'string' &&
          typeof value.complete === 'boolean' &&
          typeof value.deadline === 'string'
      );
    }
  }
})

const remove = (id, event) => {
  event.stopPropagation()
  emit('remove', id)
}

const router = useRouter()

const toggleComplete = (id, status, event) => {
  event.stopPropagation()
  emit('toggleComplete', id, status)
}


const filterIcon = computed(()=>{
  if (props.item.priority === 'veryHigh'){return 'mdi:chevron-double-up'}
  if (props.item.priority === 'high'){return 'line-md:chevron-small-up'}
  if (props.item.priority === 'medium'){return 'ic:round-minus'}
  if (props.item.priority === 'low'){return 'mdi:chevron-down'}
})

onMounted(()=>{
})
</script>

<style lang="css" scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.2s ease-in-out;
  cursor: pointer;
}

.task-item:hover {
  background: #f5f5f5;
}

.task-checkbox {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #888;
  transition: border-color 0.3s ease-in-out;
  position: relative;
}

.task-checkbox:hover {
  border-color: red;
  color: red;
}

.task-checkbox::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: transparent;
  transition: background 0.2s;
}

.completed {
  text-decoration: line-through;
  color: green;
  border-color: green;
}

.task-checkbox.completed::before {
  background: transparent;
}

.task-checkbox svg {
  display: none;
  width: 14px;
  height: 14px;
}

.task-checkbox:hover svg,
.task-checkbox.completed svg {
  display: block;
}

.task-title {
  flex-grow: 1;
  font-size: 16px;
  color: #333;
}

.task-date {
  font-size: 14px;
  color: #888;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.task-actions button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: background 0.2s ease-in-out;
}

.task-actions button:hover {
  background: rgba(0, 0, 0, 0.1);
}

</style>