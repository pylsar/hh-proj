export interface ISkills{
    id: string
    skillName: string
    skillSection: {  
        name: string
        code: string
    }
    skillDescription: string
    skillPrioritys?: string
    createdAt?: Date
}