import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/base.css'
import { loadGameData } from './services/json.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

loadGameData()
