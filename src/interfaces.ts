import type { Section, Priority } from '@/stores/listing';
export interface ISkills {
  id: string; /** id */
  skillName: string; /** Название элемента */
  skillSection: Section; /** Раздел элемента */
  skillDescription: string; /** Описание элемента */
  skillPrioritys: Priority; /** Приоритет элемента */
  createdAt?: Date;
}

// книги bbcTop
export interface BookBbc {
  id: number | string; /** id */
  name: string; /** имя элемента */
  desc: string; /** описание элемента */
  author: string; /** автор/режиссер/создатель */
  country: string; /** Страна в которой создали */
  src: string; /** путь до картинки */
  year: string | number; /** Год создания */
  likes: string[]; /** страны в которых популярна */
  is_done: boolean; /** завершен/прочитан/просмотрен */
  series: boolean; /** является ли циклом */
  people: string[]; /** известные люди которым нравится */
  in_rus: boolean; /** локализован ли на русский язык */
}
