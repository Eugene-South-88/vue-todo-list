<template>
  <div class="container">
    <button
        class="button min"
        @click="router.push('/vue-todo-list/')"
    >Назад</button>
    <h2 class="task-form__title">Создать задачу</h2>
    <Form class="task-form__form" @submit="handleSubmit" role="form" aria-labelledby="task-form-title">
      <div class="task-form__input-group">
        <label for="task-title" class="task-form__label" id="task-form-title">Заголовок</label>
        <Field
            name="title"
            type="text"
            class="task-form__input"
            placeholder="Введите заголовок задачи"
            v-model="newTask.title"
            :rules="'required||min3'"
            aria-describedby="title-error"
        />
        <ErrorMessage id="title-error" class="error-msg" as="small" name="title" aria-live="assertive"/>
      </div>

      <div class="task-form__input-group">
        <label for="task-description" class="task-form__label">Описание</label>
        <Field
            name="description"
            :rules="'required||min10'"
            as="textarea"
            class="task-form__textarea"
            placeholder="Введите описание задачи"
            v-model="newTask.description"
            aria-describedby="description-error"
        />
        <ErrorMessage id="description-error" class="error-msg" as="small" name="description" aria-live="assertive"/>
      </div>

      <div class="task-form__input-group">
        <label for="task-due-date" class="task-form__label">Дата выполнения</label>
        <Field
            name="date"
            type="date"
            class="task-form__input"
            v-model="newTask.deadline"
            :rules="'required'"
            aria-describedby="date-error"
        />
        <ErrorMessage id="date-error" class="error-msg" as="small" name="date" aria-live="assertive"/>
      </div>

      <!-- Категория -->
      <fieldset class="task-form__input-group">
        <legend>Категория</legend>
        <Field
            name="category"
            :rules="'required'"
            as="select"
            v-model="newTask.category"
            id="task-category"
            class="task-form__select"
            aria-describedby="category-error"
        >
          <option value="">Выберите категорию</option>
          <option
              :value="item.value"
              v-for="(item, index) in categoriesList"
              :key="index"
          >
            {{ item.label }}
          </option>
        </Field>
        <ErrorMessage id="category-error" class="error-msg" as="small" name="category" aria-live="assertive"/>
      </fieldset>

      <!-- Приоритет -->
      <fieldset class="task-form__input-group">
        <legend>Приоритет</legend>
        <Field
            as="select"
            name="priority"
            :rules="'required'"
            v-model="newTask.priority"
            class="task-form__select"
            aria-describedby="priority-error"
        >
          <option value="">Выберите приоритет</option>
          <option
              :value="item.value"
              v-for="item in prioritiesList"
              :key="item.value"
          >
            {{ item.label }}
          </option>
        </Field>
        <ErrorMessage id="priority-error" class="error-msg" as="small" name="priority" aria-live="assertive"/>
      </fieldset>

      <div class="task-form__buttons">
        <button
            type="submit"
            class="task-form__btn task-form__btn--submit"
            aria-label="Создать задачу"
        >
          Сохранить
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";

import {Form, Field, configure, defineRule, ErrorMessage} from "vee-validate";
import {required} from "@vee-validate/rules";
import {localize} from "@vee-validate/i18n";

import {categories} from "../const/categories.js";
import {priorities} from "../const/prioritites.js";
import {onMounted, reactive, ref} from "vue";
import {updateTask} from "@/api/http.js";
import axios from "axios";

const router = useRouter()
const route = useRoute()

const categoriesList = categories
const prioritiesList = priorities

const defaultTask = Object.freeze({
  title: '',
  description: '',
  deadline: '',
  category: '',
  priority: '',
})

const taskId = route.params.id
const newTask = reactive({...defaultTask})

const getTask = async ()=>{
  const {data} = await axios.get(`https://vue-todo-list-120e6-default-rtdb.firebaseio.com/tasks/${taskId}.json`)
  console.log(data)
  Object.assign(newTask, data)
}


const handleSubmit = async ()=>{
  try{
    console.log(taskId)
    await updateTask(taskId, newTask)

    Object.assign(newTask, defaultTask)

    await router.push('/vue-todo-list/')

  }catch(e){ console.log(e.message)}
}

defineRule('required', required);

defineRule('min3', value => !value || value.length >= 3 );

defineRule('min10', value => !value || value.length >= 10);

configure({
  validateOnInput: true,
  generateMessage: localize('ru', {
    messages: {
      required: 'Поле обязательно заполнить',
      min3: 'Минимум 3 символа',
      min10: 'Минимум 10 символов'
    }
  })
})

onMounted(()=>{
  getTask()
})
</script>

<style lang="css" scoped>
.task-form__title {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.task-form__form {
  display: flex;
  flex-direction: column;
}

.task-form__input-group {
  margin-bottom: 15px;
  padding: 10px;

}

.task-form__label {
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
}

.task-form__input,
.task-form__textarea,
.task-form__select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.task-form__input:focus,
.task-form__textarea:focus,
.task-form__select:focus {
  border-color: #4caf50;
  outline: none;
}

.task-form__textarea {
  resize: vertical;
  min-height: 100px;
}

.task-form__buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.task-form__btn {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.task-form__btn--submit {
  background-color: #4caf50;
  color: white;
}

.task-form__btn--reset {
  background-color: #f44336;
  color: white;
}

.task-form__btn:hover {
  opacity: 0.9;
}

.task-form__select {
  background-color: white;
}
.min {
  padding: 10px 20px;
  border-radius: 4px;
}

.error-msg {
  color: red;
}

.task-form__btn:disabled {
  background-color: #ccc; /* Цвет фона для неактивной кнопки */
  color: #888; /* Цвет текста для неактивной кнопки */
  border: 1px solid #ddd; /* Цвет границы для неактивной кнопки */
  cursor: not-allowed; /* Курсор "недоступен" */
  opacity: 0.6; /* Полупрозрачность для неактивной кнопки */
}

.task-form__btn:disabled:hover {
  background-color: #ccc; /* Оставляем тот же фон при наведении */
  cursor: not-allowed; /* Не меняем курсор при наведении */
}

/* Медиазапросы для мобильных устройств */
@media (max-width: 768px) {
  .task-form__title {
    width: 320px;
    font-size: 20px;
  }

  .task-form__input,
  .task-form__textarea,
  .task-form__select {
    font-size: 14px;
    padding: 8px;
  }

  .task-form__btn {
    font-size: 14px;
    padding: 8px 12px;
  }

  .task-form__buttons {
    flex-direction: column;
    align-items: center;
  }

  .task-form__btn--submit,
  .task-form__btn--reset {
    width: 100%;
    margin-bottom: 10px;
  }

  .task-form__input-group {
    padding: 8px;
  }

  .min {
    font-size: 14px;
    padding: 8px 15px;
  }
}

/* Медиазапрос для маленьких экранов */
@media (max-width: 480px) {
  .container {
    width: 100%;
    padding: 20px;
  }

  .task-form__title {
    font-size: 18px;
  }

  .task-form__input,
  .task-form__textarea,
  .task-form__select {
    font-size: 13px;
    padding: 7px;
  }

  .task-form__btn {
    font-size: 13px;
    padding: 7px 10px;
  }

  .task-form__input-group {
    padding: 6px;
  }

  .task-form__btn--submit,
  .task-form__btn--reset {
    width: 100%;
  }

  .min {
    font-size: 13px;
    width: 100%;
    padding: 10px;
  }
}
</style>