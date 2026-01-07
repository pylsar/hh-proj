<script setup lang="ts">
    import {ref, computed} from 'vue'

    const skillName = ref<string>('')
    const skillSection = ref<string>('')
    const skillDescription = ref<string>('')
    const skillPrioritys = ref<string>('')
    const loading = ref<boolean>(false)


    const addNewSkill = () => {
        console.log('addNewSkill')
    }

    const disabledSaveButton = computed<boolean>(() => {
        return !(skillName.value && skillSection.value && skillDescription.value && skillPrioritys.value)
    })

</script>

<template>
    <div class="skills__wrap">
        <app-card>
            <template #title>Новое упражнение</template>
            <template #content>
                <app-inputtext placeholder="название" v-model="skillName" />

                <app-inputtext placeholder="раздел" v-model="skillSection" />

                <app-inputtext placeholder="описание" v-model="skillDescription" />

                <app-inputtext placeholder="приоритет" v-model="skillPrioritys" />

                <app-button @click="addNewSkill" label="Создать" :disabled="disabledSaveButton" :loading="loading"></app-button>
            </template>
        </app-card>

    </div>
</template>
