<script setup lang="ts">
    import {ref, computed} from 'vue'
    import type { ISkills } from '@/interfaces'

    const skillName = ref<string>('')
    const skillSection = ref<string>('')
    const skillDescription = ref<string>('')
    const skillPrioritys = ref<string>('')
    const loading = ref<boolean>(false)


    const addNewSkill = () => {
        const newObj: ISkills ={
            id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            skillName: skillName.value,
            skillSection: skillSection.value,
            skillDescription: skillDescription.value,
            skillPrioritys: skillPrioritys.value,
            createdAt: new Date()
        }

        console.log('newObj', newObj)


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

                <app-inputtext placeholder="раздел" v-model="skillSection" class="skills__input"/>

                <app-inputtext placeholder="описание" v-model="skillDescription" class="skills__input"/>

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