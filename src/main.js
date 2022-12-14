import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './CommonAsset/css/default.css'
createApp(App).use(store).use(router).mount('#app')
