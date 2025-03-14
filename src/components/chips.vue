<template>
  <div class="chip-container">
    <div
        v-for="(priority, index) in priorities"
        :key="index"
        :class="['chip', {'active': activeChip.includes(priority.value)}]"
        tabindex="0"
        @click="selectChip(priority.value)"
    >
      <Icon class="icon" :icon="filterIconPriorities(priority.value)" width="20" :ssr="true"/>
      <span>
        {{ priority.label }}
      </span>
    </div>
  </div>

  <div class="chip-container">
    <div
        v-for="(category, index) in categories"
        :key="index"
        :class="['chip', {'active': activeChip.includes(category.value)}]"
        tabindex="0"
        @click="selectChip(category.value)"
    >
      <Icon class="icon" :icon="filterIconCategories(category.value)" width="20" :ssr="true"/>
      <span>
        {{ category.label }}
      </span>
    </div>
  </div>
</template>

<script setup>
import {Icon} from "@iconify/vue";
import {priorities} from "@/const/prioritites.js";
import {categories} from "@/const/categories.js";
import {computed, onMounted, ref} from "vue";

const emit = defineEmits(['selectChip'])

const filterIconPriorities = (value) => {
  if (value === 'veryHigh') {
    return 'mdi:chevron-double-up'
  }
  if (value === 'high') {
    return 'mdi:chevron-up'
  }
  if (value === 'medium') {
    return 'ic:round-minus'
  }
  if (value === 'low') {
    return 'mdi:chevron-down'
  }
}

const filterIconCategories = () => {
  return 'ic:baseline-question-mark'
}

const activeChip = ref([])


const selectChip = (chip) => {
  if (activeChip.value.includes(chip)) {
    activeChip.value = activeChip.value.filter(e => e !== chip)
    emit('selectChip', activeChip.value)
    return false
  } else {
    activeChip.value.push(chip)
    emit('selectChip', activeChip.value)
    return true
  }
}



onMounted(() => {
  filterIconPriorities()
})
</script>

<style lang="css" scoped>
.active{
  color: green;
}

.icon {
  color: red;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
}

.chip-container {
  display: flex;
  flex-wrap: wrap; /* Позволяет переносить чипсы на новую строку */
  gap: 8px;
  justify-content: center; /* Центрируем элементы */
}

.chip-container:nth-of-type(1) {
  color: red;
  margin-bottom: 10px;
}

.chip {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border: solid 2px #3498db;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  margin: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  white-space: nowrap; /* Предотвращает перенос текста внутри чипса */
}

.chip:hover {
  background-color: #e0e0e0;
  transform: scale(1.05);
}

.chip.selected {
  background-color: #3498db;
  color: white;
}

.chip.selected:hover {
  border: solid 1px green;
}

.chip:focus {
  outline: none;
}

.chip .icon {
  margin-right: 5px;
}

.chip.disabled {
  background-color: #d3d3d3;
  color: #9e9e9e;
  cursor: not-allowed;
}

/* Адаптивность */
@media (max-width: 768px) {
  .chip {
    font-size: 0.9rem;
    padding: 0;
    margin: 0;
  }
}

@media (max-width: 480px) {
  .chip-container {
    justify-content: flex-start; /* Прижимаем элементы влево на маленьких экранах */
  }

  .chip {
    margin: 0 auto;
    text-align: center;
    align-items: center;
    font-size: 0.8rem;
    padding: 4px 12px;
    border-radius: 20px;
  }

  .chip span {
    display: none;
  }

  .chip .icon {
    margin-right: 0;
  }
}


</style>