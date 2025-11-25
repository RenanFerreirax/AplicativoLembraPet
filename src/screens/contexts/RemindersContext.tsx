import React, { createContext, useContext, useState, ReactNode } from "react";
import { Reminder } from "../../types";
import { MOCK_REMINDERS } from "../../mocks/reminders";
import { v4 as uuid } from "uuid";

type ContextType = {
  reminders: Reminder[];
  add: (r: Omit<Reminder, "id">) => void;
  edit: (id: string, data: Partial<Reminder>) => void;
  toggle: (id: string) => void;
  remove: (id: string) => void;
};

const RemindersContext = createContext<ContextType | undefined>(undefined);

export const RemindersProvider = ({ children }: { children: ReactNode }) => {
  const [reminders, setReminders] = useState<Reminder[]>(MOCK_REMINDERS);

  const add = (r: Omit<Reminder, "id">) => {
    const item: Reminder = { ...r, id: uuid() };
    setReminders((prev) => [item, ...prev]);
  };

  const edit = (id: string, data: Partial<Reminder>) => {
    setReminders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  };

  const toggle = (id: string) => {
    setReminders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
    );
  };

  const remove = (id: string) => {
    setReminders((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <RemindersContext.Provider
      value={{ reminders, add, edit, toggle, remove }}
    >
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = () => {
  const ctx = useContext(RemindersContext);
  if (!ctx)
    throw new Error("useReminders must be used within RemindersProvider");
  return ctx;
};
