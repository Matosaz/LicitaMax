import React, { createContext, useContext,useEffect, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  // outras infos que quiser
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setLoading(false);
    return;
  }

  fetch("http://localhost:8080/api/auth/me", {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  .then(res => {
    if (!res.ok) throw new Error("Token inválido ou expirado");
    return res.json();
  })
  .then(data => {
    setUser(data.data); // CORREÇÃO AQUI
  })
  .catch(() => {
    localStorage.removeItem("token");
    setUser(null);
  })
  .finally(() => setLoading(false));
}, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: !!user,
        logout,
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }
  return context;
}
