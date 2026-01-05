<script setup lang="ts">
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
  import {computed, ref} from 'vue'
  import { useRouter } from 'vue-router'
  import {useToast} from 'primevue/usetoast'

  const toast = useToast()

  const isLogin = ref<boolean>(true)
  const email = ref<string>('')
  const password = ref<string>('')
  const isLoading = ref<boolean>(false)
  const router = useRouter()

  const toggleAuth = () => {
    isLogin.value = !isLogin.value;
  }  

  const subtitleText = computed<string>(() =>{
    return isLogin.value ? 'Аккаунта еще нет' : 'Уже есть аккаунт?'
  })

  const linkAccountText = computed<string>(() => {
    return isLogin.value ? 'Создайте сейчас' : 'Войдите в аккаунт'
  })

  const submitButtonText = computed<string>(() => {
    return isLogin.value ? 'регистрация' : 'Войти'
  })

  const signUp = async (): Promise<void> => {
    isLoading.value = true;

    try{
      await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      router.push('/')
    }catch(error: unknown){
      if(error instanceof Error){
        console.log(error.message)
        toast.add({severity: 'error', summary: 'Error', detail: error.message, life: 3000})
      }
    }finally{
      isLoading.value = false
    }
  }

  const signIn = async (): Promise<void> => {
    isLoading.value = true;

    try{
      await signInWithEmailAndPassword(getAuth(), email.value, password.value)
      router.push('/')
    }catch(error: unknown){
      if(error instanceof Error){
        console.log(error.message)
        toast.add({severity: 'error', summary: 'Error', detail: error.message, life: 3000})
      }
    }finally{
      isLoading.value = false
    }
  }

  const submitForm = (): void => {
    if(!isLogin.value){
      signIn()
    }else{
      signUp()
    }
  }

</script>

<template>
  <div class="auth_wrap">
    <div>
      <app-toast />
        <h1>Добро пожаловать</h1>
        <span>{{ subtitleText }}</span> <span @click="toggleAuth">{{ linkAccountText }}</span>
        <form @submit.prevent="submitForm">
          <div>
            <label for="email-field">Email</label>
            <app-inputtext v-model="email" id="email-field" type="email"/>
          </div>
          <div>
            <label for="password-field">Password</label>
            <app-inputtext v-model="password" id="password-field" type="password"/>
          </div>
          <div>
            <app-button :label="submitButtonText" type="submit" icon="pi pi-user" :loading="isLoading"></app-button>
          </div>
        </form>
    </div>
  </div>
</template>
