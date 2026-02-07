import type { Section, Priority } from '@/stores/listing'
export interface ISkills{
    id: string
    skillName: string
    skillSection: Section
    skillDescription: string
    skillPrioritys: Priority
    createdAt?: Date
}

// книги bbcTop
export interface BookBbc {
  id: number
  name: string
  desc: string
  author: string
  country: string
  src: string
  year: string
  likes: string[]
  is_read: boolean
  series: boolean
  people: string[]
  in_rus: boolean
}