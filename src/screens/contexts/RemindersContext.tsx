import React, { createContext, useContext, useState, ReactNode } from "react";
import { Reminder } from "../../types";

type ContextType = {
  reminders: Reminder[];
  add: (r: Omit<Reminder, "id">) => void;
  update: (id: string, data: Partial<Reminder>) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

const RemindersContext = createContext<ContextType>({} as ContextType);

export const RemindersProvider = ({ children }: { children: ReactNode }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // ⬇ Função de adicionar lembrete
  const add = (r: Omit<Reminder, "id">) => {
    const newReminder: Reminder = {
      id: String(Date.now()),
      ...r, // title, date, category, notes, done
    };

    setReminders((prev) => [...prev, newReminder]);
  };

  // ⬇ Função única para editar lembrete
  const update = (id: string, data: Partial<Reminder>) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...data } : r))
    );
  };

  // ⬇ Alternar concluído / não concluído
  const toggle = (id: string) => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, done: !r.done } : r
      )
    );
  };

  // ⬇ Remover lembrete
  const remove = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RemindersContext.Provider
      value={{ reminders, add, update, toggle, remove }}
    >
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = () => useContext(RemindersContext);
