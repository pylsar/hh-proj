import type { Section, Priority } from '@/stores/listing'
export interface ISkills{
    id: string
    skillName: string
    skillSection: Section
    skillDescription: string
    skillPrioritys: Priority
    createdAt?: Date
}