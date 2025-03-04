import {createRouter, createWebHistory} from "vue-router";
import TaskForm from "../components/TaskForm.vue";
import MainAppPage from "../views/MainAppPage.vue";
import TaskView from "@/components/TaskView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/:pathMatch(.*)*', redirect: '/vue-todo-list/'
    },
    {
      path: '/vue-todo-list/', component: MainAppPage
    },
    {
      path: '/vue-todo-list/create', component: TaskForm
    },{
      path: '/vue-todo-list/:id', component: TaskView, props: true
    },
  ]
})

export default router