import type { Section, Priority } from '@/stores/listing';
export interface ISkills {
  id: string;
  skillName: string;
  skillSection: Section;
  skillDescription: string;
  skillPrioritys: Priority;
  createdAt?: Date;
}

// книги bbcTop
export interface BookBbc {
  id: number | string;
  name: string;
  desc: string;
  author: string;
  country: string;
  src: string;
  year: string;
  likes: string[];
  is_done: boolean;
  series: boolean;
  people: string[];
  in_rus: boolean;
}
