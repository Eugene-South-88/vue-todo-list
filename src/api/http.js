import axios from 'axios';
import {ref} from "vue";

export const tasks = ref()


export const createTask = async (task) => {
  try {
    console.log('Задача создаётся')
    task.complete = false
    const response = await axios.post('https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks.json', task);
    console.log('Задача создана')
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    throw error;
  }
}

export const loadTask = async (t) => {
  try {
    console.log('Загрузка задач')
    const {data} = await axios.get(
      'https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks.json'
    )

    if (data) {
      tasks.value = Object.keys(data).map(key => {
        return {
          id: key,
          ...data[key]
        }
      })
      console.log('Задачи загрузились')
      return tasks.value
    } else {
      tasks.value = null
      console.log('Задач нет')
    }

  } catch (e) {
    console.log('Ошибка в загрузке задач:  ' + e.message)
  }
}

export const removeTask = async (id) => {
  try {
    console.log('Удаление задачи')
    await axios.delete(`https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks/${id}.json`)
    console.log(`Задача ${id} удалена`);
  } catch (e) {
    console.log('Ошибка в удалении: ' + e.message)
  }
}

export const toggleCompleteTask = async (id, status) => {
  await axios.patch(`https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks/${id}.json`,{
    complete: status
  })
  console.log('Статус проставлен:' + status)
}

export const updateTask = async(id, task)=>{
  await axios.patch(`https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks/${id}.json`,{
    task
  })
  console.log('Задача изменена: ' + task)
}