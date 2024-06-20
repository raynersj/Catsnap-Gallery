import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import '../src/css/global-styles.css'; // Import global styles

createApp(App)
    .use(router)
    .mount('#app');
