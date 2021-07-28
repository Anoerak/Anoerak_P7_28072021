import { createApp } from 'vue'
import { useVuelidate } from '@vuelidate/core'

import App from './App.vue'
import router from './router'
import store from './store'
import lsWatcher from 'vue-storage-watcher'

import 'bulma/css/bulma.css';


createApp(App).use(store).use(router).use(useVuelidate).use(lsWatcher, { prefix : 'groupomania_'}).mount('#app')

