<script setup lang="ts">
    import {ref, onMounted, computed} from 'vue'
    import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
    import { useUserStore } from '@/stores/user';
    import type { ISkills } from '@/interfaces';
    import { useConfirm } from 'primevue/useconfirm';

    const userStore = useUserStore();
    const db = getFirestore();
    const confirm = useConfirm();

    const skills = ref<ISkills[]>([])
    const isLoading = ref<boolean>(false)
    const isVisible = ref<boolean>(false)
    const loadingBtn = ref<boolean>(false)

    const skillNameEdit = ref<string>('')
    const skillSectionEdit = ref<string>('')
    const skillDescriptionEdit = ref<string>('')
    const skillPrioritysEdit = ref<string>('')
    const editId = ref<string>('')

    const getAllSkills = async <T extends ISkills>(): Promise<T[]> =>{
        const getData = query(collection(db, `users/${userStore.userId}/skills`), orderBy('createdAt', 'desc'))
        const listDocs = await getDocs(getData)

        return listDocs.docs.map((doc) => doc.data() as T)
    }


    const editSkill = (item: ISkills) => {
        console.log('edit', item)
        isVisible.value = true

        skillNameEdit.value = item.skillName
        skillSectionEdit.value = item.skillSection
        skillDescriptionEdit.value = item.skillDescription
        skillPrioritysEdit.value = item.skillPrioritys
        editId.value = item.id
    }



    const editSkillToSend = async () => {
       const editObj = {
            id: editId.value,
            skillName: skillNameEdit.value,
            skillSection: skillSectionEdit.value,
            skillDescription: skillDescriptionEdit.value,
            skillPrioritys: skillPrioritysEdit.value,
        }
        console.log('editSkillToSend', editObj)
    }

    const deleteSkill = async (id: string): Promise<void> => {
        console.log('delete', id)
        confirm.require({
            message: 'Вы действительно хотите удалить запись?',
            header: 'Удаление записи',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Отмена',
            acceptLabel: 'Удалить',
            rejectClass: 'p-button-secondary p-button-outlined',
            acceptClass: 'p-button-danger',
            accept: async() => {
                isLoading: true
                await deleteDoc(doc(db, `users/${userStore.userId}/skills`, id))
                // await getAllSkills()
                const index = skills.value.findIndex(item => item.id === id);
                if (index !== -1) {
                    skills.value.splice(index, 1);
                }
                isLoading: false
            }
        })
    }

    onMounted( async() => {
        const listSkills: Array<ISkills> = await getAllSkills();
        console.log('listSkills', listSkills)
        skills.value = [...listSkills]
    })

    const disabledEditButton = computed<boolean>(() => {
        return !(skillNameEdit.value && skillSectionEdit.value && skillDescriptionEdit.value)
    })
</script>

<template>
    <app-confirmdialog />
    <app-progressspiner v-if="isLoading"/>
    <div v-else class="pagelist_wrap">
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

    <app-dialog v-model:visible="isVisible" modal header="Изменить запись" class="edit-popup">
        <app-inputtext placeholder="название" v-model="skillNameEdit" class="skills__input"/>
        <app-inputtext placeholder="раздел" v-model="skillSectionEdit" class="skills__input"/>
        <app-inputtext placeholder="описание" v-model="skillDescriptionEdit" class="skills__input"/>
        <app-inputtext placeholder="приоритет" v-model="skillPrioritysEdit" class="skills__input"/>

        <app-button @click="editSkillToSend" label="Создать" :disabled="disabledEditButton" :loading="loadingBtn"></app-button>
    </app-dialog>
</template>

<style scoped>
 .edit-popup{
        width: 600px;
        margin: 0 auto;  
    }

    .edit-popup input{
        width: 100%;
    }
</style>