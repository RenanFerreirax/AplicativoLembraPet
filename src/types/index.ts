export type Category =
  | 'vacina'
  | 'medicamento'
  | 'veterinario'
  | 'higiene'
  | 'passeio'
  | 'alimentacao';

export interface Reminder {
  id: string;
  title: string;
  date: string; // ISO
  category: Category;
  done: boolean;
  notes?: string;
}
