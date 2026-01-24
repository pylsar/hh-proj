
<template>
    <app-confirmdialog />
    <div v-if="isLoading" class="spiner-box">
        <app-progressspiner />
    </div>
    <div v-else class="pagelist_wrap">
        <h1>Мой Список</h1>
        <div class="top-menu-items">
            <div v-for="section in sections" :key="section.code" @click="filterList(section)"  :class="['top-menu-item', { 'active': activeSection === section.code }]">
                <span>
                    {{ section.name }}
                </span>
            </div>
            <div v-if="activeSection" @click="activeSection = null" class="top-menu-item reset-filter">
                <span>Показать все</span>
            </div>
        </div>
        
        <app-datatable :value="filteredSkills">
            <app-column field="skillName" header="Название"></app-column>  
            <app-column field="skillSection" header="Секция">
                <template #body="slotProps">
                    <span>{{ slotProps.data.skillSection.name }}</span>
                </template>
            </app-column> 
            <app-column field="skillDescription" header="Описание"></app-column> 
            <app-column field="skillPrioritys" header="Приоритет">
                 <template #body="slotProps">
                    <span>{{ slotProps.data.skillPrioritys.name }}</span>
                </template>
            </app-column> 
            <app-column>
                <template #body="slotProps">
                    <div class="table-controls">
                        <app-button @click="editSkill(slotProps.data)" icon="pi pi-pencil" severity="info" />
                        <app-button @click="deleteSkill(slotProps.data.id)" icon="pi pi-trash" severity="danger" />
                    </div>
                </template>
            </app-column>
        </app-datatable>

        <div class="edit-popup">
        <app-dialog v-model:visible="isVisible" modal header="Изменить запись">
            <div class="card-content">
                <app-inputtext placeholder="название" v-model="skillNameEdit" class="skills__input"/>
                <app-select placeholder="раздел" v-model="skillSectionEdit" :options="sections" optionLabel="name" class="skills__input"/>
                <app-textarea placeholder="описание" v-model="skillDescriptionEdit" rows="5" cols="30" class="skills__input"/>
                <app-select placeholder="приоритет" v-model="skillPrioritysEdit" :options="priorites" optionLabel="name" class="skills__input"/>
                <app-button @click="editSkillToSend" label="Создать" :disabled="disabledEditButton" :loading="loadingBtn"></app-button>
            </div>
        </app-dialog>
    </div>
        
    </div>
    
</template>


<script setup lang="ts">
    import {ref, onMounted, computed} from 'vue'
    import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc  } from 'firebase/firestore';
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
    const skillSectionEdit = ref<{ name: string; code: string } | null>(null)
    const skillDescriptionEdit = ref<string>('')
    const skillPrioritysEdit = ref<{ name: string; code: string } | null>(null)
    const editId = ref<string>('')

    const activeSection = ref<string | null>(null)
    const sections = ref([
        { name: 'Фильмы', code: 'movies' },
        { name: 'Сериалы', code: 'smovies' },
        { name: 'Книги', code: 'books' },
        { name: 'Игры', code: 'games' },
        { name: 'Спорт', code: 'sports' },
        { name: 'Разное', code: 'dif' }
    ]);

    const priorites = ref([
        { name: 'Низкий', code: 'low' },
        { name: 'Средний', code: 'middle' },
        { name: 'Высокий', code: 'high' },
    ]);

    const getAllSkills = async <T extends ISkills>(): Promise<T[]> =>{
        const getData = query(collection(db, `users/${userStore.userId}/skills`), orderBy('createdAt', 'desc'))
        const listDocs = await getDocs(getData)

        return listDocs.docs.map((doc) => doc.data() as T)
    }


    const editSkill = (item: ISkills): void => {
        console.log('edit', item)
        isVisible.value = true

        skillNameEdit.value = item.skillName
        skillSectionEdit.value = item.skillSection
        skillDescriptionEdit.value = item.skillDescription
        skillPrioritysEdit.value = item.skillPrioritys
        editId.value = item.id

        // if (item.skillPrioritys) {
        //     skillPrioritysEdit.value = item.skillPrioritys
        // } else {
        //     // 'Низкий' приоритет по умолчанию
        //     skillPrioritysEdit.value = priorites.value[0]
        // }
    }



    const editSkillToSend = async (): Promise<void> => {
        loadingBtn.value = true
        try {

            if (!skillSectionEdit.value) {
                loadingBtn.value = false
                return
            }

            // Если priority не выбран, устанавливаем значение по умолчанию
            // if (!skillPrioritysEdit.value) {
            //     skillPrioritysEdit.value = priorites.value[0]
            // }

            //проверка на undefined
            const defaultPriority = { name: 'Низкий', code: 'low' } as const;

            const editObj = {
                id: editId.value,
                skillName: skillNameEdit.value,
                skillSection: skillSectionEdit.value,
                skillDescription: skillDescriptionEdit.value,
                skillPrioritys: skillPrioritysEdit.value || priorites.value[0] || defaultPriority,
            }
            console.log('editSkillToSend', editObj)
        
            const skillRef = doc(db, `users/${userStore.userId}/skills`, editId.value);
            await updateDoc(skillRef, {
                skillName: skillNameEdit.value,
                skillSection: skillSectionEdit.value,
                skillDescription: skillDescriptionEdit.value,
                skillPrioritys: skillPrioritysEdit.value,
            });
        
            const index = skills.value.findIndex(item => item.id === editId.value);
            if (index !== -1) {
                // Создаем обновленный объект
                const updatedSkill: ISkills = {
                    ...skills.value[index], // копируем все старые свойства
                    ...editObj // перезаписываем обновленными значениями
                };
                skills.value[index] = updatedSkill;
            }
        
            isVisible.value = false;
            resetEditForm();
            
        } catch (error) {
            console.error('Ошибка при обновлении навыка:', error);
        } finally {
            loadingBtn.value = false;
        }
    }

    const resetEditForm = (): void => {
        skillNameEdit.value = '';
        skillSectionEdit.value = null;
        skillDescriptionEdit.value = '';
        skillPrioritysEdit.value = null;
        editId.value = '';
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
                isLoading.value = true
                await deleteDoc(doc(db, `users/${userStore.userId}/skills`, id))
                // await getAllSkills()
                const index = skills.value.findIndex(item => item.id === id);
                if (index !== -1) {
                    skills.value.splice(index, 1);
                }
                isLoading.value = false
            }
        })
    }

    onMounted( async() => {
        const listSkills: ISkills[] = await getAllSkills();
        console.log('listSkills', listSkills)
        skills.value = [...listSkills]
    })

    const disabledEditButton = computed<boolean>(() => {
        return !(skillNameEdit.value && skillSectionEdit.value && skillDescriptionEdit.value)
    })


    const filterList = (section: { name: string; code: string }): void => {
        if (activeSection.value === section.code) {
            // Если нажимаем на уже активную секцию, снимаем фильтр
            activeSection.value = null;
        } else {
            // Иначе устанавливаем новую активную секцию
            activeSection.value = section.code;
        }
    }

    const filteredSkills = computed<ISkills[]>(() => {
        if (!activeSection.value) {
            return skills.value;
        }
        
        return skills.value.filter(skill => {
            return skill.skillSection.code === activeSection.value;
        });
    });
</script>

<style scoped>
    .edit-popup{
        width: 600px;
        margin: 0 auto;  
    }

     .card-content{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .edit-popup input,
    .edit-popup .p-select,
    .edit-popup textarea{
        width: 100%;
    }

    .pagelist_wrap h1 {
        margin-bottom: 20px;
    }

    .spiner-box{
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .top-menu-items{
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 20px;
    }

    .top-menu-item{
        padding: 6px 12px;
        border: 1px solid var(--p-menubar-border-color);
        cursor: pointer;
        border-radius: var(--p-menubar-border-radius);
    }

    .top-menu-item.active{
        border: 1px solid red;
        cursor: default;
    }

    .table-controls{
        display: flex;
        gap: 6px;
    }

    .table-controls button{
        width: 30px;
        height: 30px;
    }


    @media (max-width: 668px) {
       .edit-popup{
            width: 100%;
        }
    }


</style>