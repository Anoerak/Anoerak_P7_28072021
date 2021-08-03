import { createApp } from 'vue';
import { useVuelidate } from '@vuelidate/core';

import App from './App.vue';
import router from './router';
import store from './store';
// import lsWatcher from 'vue-storage-watcher';
import StoragePlugin from 'vue-web-storage'
import 'bulma/css/bulma.css';

const groupo = createApp(App)

groupo.use(store)
groupo.use(router)
groupo.use(useVuelidate)
groupo.mount('#app')
// groupo.use(lsWatcher, {prefix: 'groupomania_'})
groupo.use(StoragePlugin, {prefix: 'groupomania_'})
