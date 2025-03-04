import { createApp } from 'vue'

import App from './App.vue'

import router from "./router/index.js";
import cors from 'cors'

import './style.css'

createApp(App)
  .use(cors)
  .use(router)
  .mount('#app')

