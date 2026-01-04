<script setup lang="ts">
  import {computed, ref} from 'vue'

  const isLogin = ref<boolean>(true)
  const email = ref<string>('')
  const password = ref<string>('')
  const isLoading = ref<boolean>(false)

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
    return isLogin.value ? 'Создать' : 'Войти'
  })

  const submitForm = (): void => {
    console.log('submit')
  }

</script>

<template>
  <div class="auth_wrap">
    <div>
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
