import {createRouter, createWebHistory} from "vue-router";
import TaskForm from "../components/TaskForm.vue";
import MainAppPage from "../views/MainAppPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/', component: MainAppPage
    },
    {
      path: '/create', component: TaskForm
    }
  ]
})

export default router