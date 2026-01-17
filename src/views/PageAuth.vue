
<template>
  <div class="auth__wrap">
    <div>
      <app-toast />
        <h1>Добро пожаловать</h1>
        <div class="subtitle">
          <span >{{ subtitleText }}</span> <span @click="toggleAuth" class="text-blue">{{ linkAccountText }}</span>
        </div>
        <form @submit.prevent="submitForm">
          <div class="auth__form-item">
            <label for="email-field">Email</label>
            <app-inputtext v-model="email" id="email-field" type="email"/>
          </div>
          <div class="auth__form-item">
            <label for="password-field">Password</label>
            <app-inputtext v-model="password" id="password-field" type="password"/>
          </div>
          <div v-if="isLogin">
            <div class="auth__form-item">
                <app-button :label="submitButtonText" type="submit" icon="pi pi-user" :loading="isLoading"></app-button>
            </div>
            </div>
        </form>
    </div>
  </div>
</template>



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
    return isLogin.value ? 'Войти' : 'Регистрация'
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
      signUp()
    }else{
      signIn()
    }
  }

</script>

<style scoped>
  .auth__wrap{
    width: 600px;
    margin: 0 auto;
  }

  .auth__wrap h1{
    text-align: center;
  }

  .auth__form-item{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .auth__form-item input{
    width: 100%;
  }
</style>
