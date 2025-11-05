"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { decodeToken, getTokenFromStorage } from "../utils/utils";

interface AuthContextType {
  email: string | null;
  token: string | null;
  setAuth: (email: string | null, token: string | null) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getTokenFromStorage();
    if (storedToken) {
      const decoded = decodeToken(storedToken);
      if (decoded?.email) {
        setEmail(decoded.email);
        setToken(storedToken);
      }
    }
  }, []);

  const setAuth = (userEmail: string | null, userToken: string | null) => {
    setEmail(userEmail);
    setToken(userToken);
    if (userToken) {
      localStorage.setItem("token", userToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setEmail(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const getToken = () => {
    const currentToken = token || getTokenFromStorage();
    return currentToken;
  };

  return (
    <AuthContext.Provider value={{ email, token, setAuth, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth err");
  }
  return context;
}
