<template>
  <div class="container">
    <h1>Мой Список Дел</h1>
    <div class="input-group">
      <button
          @click="router.push('/vue-todo-list/create')"
          class="button add-btn"
      >
        Добавить
      </button>

    </div>
    <chips
        @select-chip="updateSelectedChips"
    />
    <ul class="todo-list">
      <task-item
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          @remove="handleRemove(item.id)"
          @toggle-complete="toggleComplete"
      />
    </ul>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {toggleCompleteTask, removeTask, loadTasks} from "@/api/tasks.js";
import {mapTasksResponse} from "@/api/mappers/tasks.js";

import Chips from "@/components/chips.vue";
import TaskItem from "@/components/TaskItem.vue";

const router = useRouter();

const tasksList = ref([]);
const selectedChips = ref([]);

const updateSelectedChips = (newSelectedChips) => {
  selectedChips.value = newSelectedChips;
};

const filteredItems = computed(() => {
  if (selectedChips.value.length === 0) {
    return tasksList.value;
  }

  const selectedChipsSet = new Set(selectedChips.value);

  return tasksList.value.filter((task) => {
    return selectedChipsSet.has(task.priority) || selectedChipsSet.has(task.category);
  });
});

const fetchAllTasks = () => {
  console.log('Загрузка задач');

  loadTasks().then((res) => {
    tasksList.value = mapTasksResponse(res.data);
    console.log('Задачи загружены');
  })
};

const handleRemove = async (id) => {
  const passwordAlert = prompt();

  if (passwordAlert === '2003') {
    removeTask(id).then(() => {
      fetchAllTasks();
    })

    return;
  }
  console.log('Неверный пароль')
}

const toggleComplete = (id, status) => {
  toggleCompleteTask(id, status).then(() => {
    fetchAllTasks();
  })
};

onMounted(() => {
  fetchAllTasks();
})
</script>

<style lang="css" scoped>

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.add-btn {
  width: 80%;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.5em;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}


/* Анимации */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOut {
  to {
    opacity: 0;
    transform: translateY(20px);
    max-height: 0;
    margin-bottom: 0;
    padding: 0 15px;
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 10px;
  }

  .add-btn {
    width: 100%;
    padding: 12px;
  }

  .input-group {
    flex-direction: column;
    gap: 5px;
  }

  .todo-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 15px;
    border-radius: 10px;
  }

  h1 {
    font-size: 1.8em;
  }

  .input-group {
    flex-direction: column;
    gap: 8px;
  }

  .add-btn {
    width: 100%;
    padding: 15px;
  }

  .todo-item {
    font-size: 14px;
    padding: 10px;
  }
}

</style>
