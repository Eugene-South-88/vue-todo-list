<template>
  <div class="container">
    <button
        class="button min"
        @click="router.push('/')"
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
            :disabled="isDisable"
            aria-label="Создать задачу"
        >
          Создать задачу
        </button>

        <button
            type="reset"
            class="task-form__btn task-form__btn--reset"
            @click="resetForm"
            aria-label="Очистить форму"
        >
          Очистить
        </button>
      </div>
    </Form>
  </div>
</template>



<script setup>
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

import {Form, Field, configure, defineRule, ErrorMessage, useForm} from "vee-validate";
import {required} from "@vee-validate/rules";
import {localize} from "@vee-validate/i18n";

import {categories} from "../const/categories.js";
import {priorities} from "../const/prioritites.js";

import {createTask} from "../api/http.js";

const router = useRouter()

const categoriesList = categories
const prioritiesList = priorities

const {resetForm} = useForm()

const defaultTask = Object.freeze({
  title: '',
  description: '',
  deadline: '',
  category: '',
  priority: '',
  complete: 1
})

const newTask = ref({...defaultTask})

const handleSubmit = async ()=>{
  try{

    await createTask(newTask.value)

    Object.assign(newTask.value, defaultTask)

    router.push('/')

  }catch(e){ console.log(e.message)}
}

const isDisable = computed(() => {
  return Object.values(newTask.value).some(value => !value)
      ||newTask.value.title.length <3
      || newTask.value.description.length <10
})

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
.min{
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

</style>