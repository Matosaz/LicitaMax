import { useState, createContext, useContext, useCallback } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simula armazenamento local de usuários
const USERS_STORAGE_KEY = 'app_users';
const SESSION_STORAGE_KEY = 'app_session';

const getStoredUsers = (): Record<string, { password: string; name?: string }> => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

const saveUsers = (users: Record<string, { password: string; name?: string }>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const getStoredSession = (): User | null => {
  const stored = localStorage.getItem(SESSION_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

const saveSession = (user: User | null) => {
  if (user) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredSession());
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const users = getStoredUsers();
      const userData = users[email];
      
      if (!userData || userData.password !== password) {
        throw new Error('Email ou senha incorretos');
      }

      const newUser: User = {
        id: email,
        email,
        name: userData.name,
      };

      setUser(newUser);
      saveSession(newUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      const users = getStoredUsers();
      
      if (users[email]) {
        throw new Error('Este email já está cadastrado');
      }

      users[email] = { password, name };
      saveUsers(users);

      const newUser: User = {
        id: email,
        email,
        name,
      };

      setUser(newUser);
      saveSession(newUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    saveSession(null);
  }, []);

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
