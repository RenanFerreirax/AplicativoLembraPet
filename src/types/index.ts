export type Category = "vacina" | "banho" | "passeio" | "general";

export type Reminder = {
  id: string;
  title: string;
  date: string;
  category: Category;
  notes?: string;
  done: boolean; // ✔ Aqui está o campo correto
};
