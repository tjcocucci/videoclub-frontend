"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getSession } from "@/actions";

interface SessionContextType {
  session: any;
  loading: boolean;
  updateSession: () => Promise<any>;
  setLoading: (loading: boolean) => void;
  setSession: (session: any) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateSession = async () => {
    setLoading(true);
    try {
      const s = await getSession();
      setSession(s);
    } catch (error) {
      console.error("Error fetching session:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{ session, loading, updateSession, setLoading, setSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
