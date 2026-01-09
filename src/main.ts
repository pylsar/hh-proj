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
import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
 

import App from './App.vue'
import router from './router'



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(ToastService)
app.use(ConfirmationService)
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
app.component('app-progressspiner', ProgressSpinner)
app.component('app-card', Card)
app.component('app-datatable', DataTable)
app.component('app-column', Column)
app.component('app-confirmdialog', ConfirmDialog)

app.mount('#app')
