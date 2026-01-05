import './assets/main.css'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'

import { initializeApp } from "firebase/app";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'


import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import Inputtext from 'primevue/inputtext'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'


import App from './App.vue'
import router from './router'



const firebaseConfig = {
  apiKey: "AIzaSyAjtMjtWb6URw7aFqDrbY5XeNVK0U2LpaM",
  authDomain: "hh-proj-ba0a8.firebaseapp.com",
  projectId: "hh-proj-ba0a8",
  storageBucket: "hh-proj-ba0a8.firebasestorage.app",
  messagingSenderId: "352657830052",
  appId: "1:352657830052:web:302dab2618eb1b0a433631"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(ToastService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.component('app-menubar', Menubar)
app.component('app-button', Button)
app.component('app-inputtext', Inputtext)
app.component('app-toast', Toast)

app.mount('#app')
