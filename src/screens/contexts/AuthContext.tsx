import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  createdAt: string; 
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const login = (email: string, password: string): boolean => {
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      alert("Usuário não encontrado ou senha incorreta");
      return false;
    }
    setUser(found);
    return true;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const exists = users.some(u => u.email === email);
    if (exists) {
      alert("Email já cadastrado!");
      return false;
    }

    const newUser: User = {
      name,
      email,
      password,
      createdAt: new Date().toLocaleString(), // <-- adicionada
    };

    setUsers([...users, newUser]);
    alert("Cadastro realizado! Agora faça login.");
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
