import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

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
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }


    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://licitamaxbackend.onrender.com/api/auth/me", {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Token inválido ou expirado");
        return res.json();
      })
      .then(data => {
        setUser(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

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
