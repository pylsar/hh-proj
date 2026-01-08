<script setup lang="ts">
    import {ref, onMounted} from 'vue'
    import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, docs } from 'firebase/firestore';
    import { useUserStore } from '@/stores/user';
    import type { ISkills } from '@/interfaces';

    const userStore = useUserStore();
    const db = getFirestore();

    const skills = ref<ISkills[]>([])
    const isLoading = ref<boolean>(true)

    const getAllSkills = async <T extends ISkills>(): Promise<T[]> =>{
        const getData = query(collection(db, `users/${userStore.userId}/skills`), orderBy('createdAt', 'desc'))
        const listDocs = await getDocs(getData)

        return listDocs.docs.map((doc) => doc.data() as T)
    }

    const editSkill = (item: Object) => {
        console.log('edit', item)
    }

    const deleteSkill = async (id: string): Promise<void> => {
        console.log('delete', id)
    }

    onMounted( async() => {
        const listSkills: Array<ISkills> = await getAllSkills();
        console.log('listSkills', listSkills)
        skills.value = [...listSkills]
    })
</script>

<template>

    <div class="pagelist_wrap">
        <h1>Список Скилов</h1>
        <app-datatable :value="skills">
            <app-column field="skillName" header="Название скила"></app-column>  
            <app-column field="skillSection" header="Секция">
                <template #body="slotProps">
                    <a :href="slotProps.data.skillSection">{{ slotProps.data.skillSection }}</a>
                </template>
            </app-column> 
            <app-column field="skillDescription" header="Описание"></app-column> 
            <app-column field="skillPrioritys" header="Приоритет"></app-column> 
            <app-column>
                <template #body="slotProps">
                    <div>
                        <app-button @click="editSkill(slotProps.data)" icon="pi pi-pencil" severity="info" />
                        <app-button @click="deleteSkill(slotProps.data.id)" icon="pi pi-trash" severity="danger" />
                    </div>
                </template>
            </app-column>
        </app-datatable>
    </div>
</template>