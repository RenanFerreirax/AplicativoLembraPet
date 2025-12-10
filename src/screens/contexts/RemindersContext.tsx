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

  const add = (r: Omit<Reminder, "id">) => {
    const newReminder: Reminder = { id: String(Date.now()), ...r };
    setReminders((prev) => [...prev, newReminder]);
  };

  const update = (id: string, data: Partial<Reminder>) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
  };

  const toggle = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  };

  const remove = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RemindersContext.Provider value={{ reminders, add, update, toggle, remove }}>
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = () => useContext(RemindersContext);
