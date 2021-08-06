import { createApp } from 'vue';
import { useVuelidate } from '@vuelidate/core';

import App from './App.vue';
import { useRoute } from 'vue-router';
import router from './router';
import store from './store';
import StoragePlugin from 'vue-web-storage'
import 'bulma/css/bulma.css';

window.$ = window.jQuery = require('jquery');

const groupo = createApp(App)

groupo.use(router)
groupo.use(useRoute)
groupo.use(store)
groupo.use(StoragePlugin, {prefix: 'groupomania_'})
groupo.use(useVuelidate)
groupo.mount('#app')
