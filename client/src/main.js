import { createApp } from 'vue'
import './style.css'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
