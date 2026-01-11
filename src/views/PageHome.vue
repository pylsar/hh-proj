<script setup lang="ts">
    import {ref, computed} from 'vue'
    import {getAuth} from 'firebase/auth'
    import { useRouter } from 'vue-router'
    import { getFirestore, setDoc, doc } from 'firebase/firestore'
    import type { ISkills } from '@/interfaces'


    const db = getFirestore()
    const router = useRouter()

    const skillName = ref<string>('')
    const skillSection = ref<{ name: string; code: string } | null>(null)
    const skillDescription = ref<string>('')
    const skillPrioritys = ref<string>('')
    const loading = ref<boolean>(false)

    const sections = ref([
        { name: 'Фильмы', code: 'movies' },
        { name: 'Сериалы', code: 'smovies' },
        { name: 'Книги', code: 'books' },
        { name: 'Игры', code: 'games' },
        { name: 'Спорт', code: 'sports' },
        { name: 'Разное', code: 'dif' }
    ]);


    const addNewSkill = async (): Promise<void> => {
        loading.value = true

         if (!skillSection.value) {
            loading.value = false
            return
        } 
        
        const newObj: ISkills ={
            id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            skillName: skillName.value,
            skillSection: skillSection.value,
            skillDescription: skillDescription.value,
            skillPrioritys: skillPrioritys.value,
            createdAt: new Date()
        }

        console.log('newObj', newObj)

        const userId = getAuth().currentUser?.uid

        if(userId){
            await setDoc(doc(db, `users/${userId}/skills`, newObj.id), newObj).then( ()=> {
                router.push('/list')
                loading.value = false

            })
        }


    }

    const disabledSaveButton = computed<boolean>(() => {
        return !(skillName.value && skillSection.value && skillDescription.value)
    })

</script>

<template>
    <div class="skills__wrap">
        <app-card>
            <template #title>Новое упражнение</template>
            <template #content>
                <app-inputtext placeholder="название" v-model="skillName" class="skills__input"/>
                <app-select placeholder="раздел" v-model="skillSection" :options="sections" optionLabel="name" class="skills__input"/>
                <app-textarea placeholder="описание" v-model="skillDescription" rows="5" cols="30" class="skills__input"/>
                <app-inputtext placeholder="приоритет" v-model="skillPrioritys" class="skills__input"/>
                <app-button @click="addNewSkill" label="Создать" :disabled="disabledSaveButton" :loading="loading"></app-button>
            </template>
        </app-card>

    </div>
</template>


<style scoped>
    .skills__wrap{
        width: 600px;
        margin: 0 auto;  
    }

    .skills__input{
        width: 100%;
    }

</style>