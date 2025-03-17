import { createContext, useContext, ReactNode } from "react";
import { useMockAuth } from "@/contexts/MockAuthContext";
import { Toaster } from "@/components/ui/toaster";

type AuthContextType = ReturnType<typeof useMockAuth>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useMockAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
