<template>
  <div class="container">
    <h1>Мой Список Дел</h1>
    <div class="input-group">
      <button
          class="button add-btn"
          @click="router.push('/create')"
      >Добавить
      </button>
    </div>
    <ul class="todo-list">
      <task-item
          v-for="item in tasksList"
          :key="item.id"
          :item="item"
          @remove="remove(item.id)"
          @toggle-complete="toggleComplete"
      />
    </ul>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {toggleCompleteTask, loadTask, removeTask, tasks} from "../api/http.js";
import TaskItem from "../components/TaskItem.vue";

const router = useRouter()

const tasksList = ref(tasks)

const remove = async (id)=>{
    tasksList.value = tasksList.value.filter(item => item.id === id)
    await removeTask(id)
    await loadTask()
}

const toggleComplete = async (id, status)=>{
  // tasksList.value.complete[id] = !status
  status = !status
  await toggleCompleteTask(id, status)
  await loadTask()
}


onMounted(() => {
  loadTask()
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

@media (max-width: 480px) {
  .container {
    padding: 20px;
    border-radius: 10px;
  }

  h1 {
    font-size: 1.8em;
  }

  .input-group {
    flex-direction: column;
  }

  .add-btn {
    padding: 15px;
    width: 100%;
  }

  .todo-item {
    padding: 12px;
  }
}
</style>
