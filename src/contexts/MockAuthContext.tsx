import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type User = {
  id: string;
  email: string;
  role: "admin" | "seller" | "buyer";
  name: string;
};

type MockAuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isProcessing: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
};

const MockAuthContext = createContext<MockAuthContextType | undefined>(
  undefined,
);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsProcessing(true);
    setAuthError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simple validation
      if (!email.includes("@") || password.length < 6) {
        setAuthError(
          "Invalid email or password. Password must be at least 6 characters.",
        );
        return false;
      }

      // Create mock user
      const mockUser: User = {
        id: "mock-" + Date.now(),
        email,
        name: email.split("@")[0],
        role: "seller", // Default role
      };

      setUser(mockUser);
      localStorage.setItem("mockUser", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      setAuthError("An unexpected error occurred");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsProcessing(true);
    setAuthError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simple validation
      if (!email.includes("@")) {
        setAuthError("Please enter a valid email address");
        return false;
      }

      if (password.length < 6) {
        setAuthError("Password must be at least 6 characters");
        return false;
      }

      // Create mock user
      const mockUser: User = {
        id: "mock-" + Date.now(),
        email,
        name: email.split("@")[0],
        role: "seller", // Default role
      };

      setUser(mockUser);
      localStorage.setItem("mockUser", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      setAuthError("An unexpected error occurred");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const logout = async () => {
    setIsProcessing(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUser(null);
      localStorage.removeItem("mockUser");
      return true;
    } catch (error) {
      setAuthError("Failed to log out");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MockAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isProcessing,
        authError,
        login,
        register,
        logout,
      }}
    >
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error("useMockAuth must be used within a MockAuthProvider");
  }
  return context;
}
