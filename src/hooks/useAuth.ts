import { useState } from "react";
import { useSupabase } from "@/contexts/SupabaseContext";
import { toast } from "@/components/ui/use-toast";

export function useAuth() {
  const { signIn, signUp, signOut, user, session, loading } = useSupabase();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const login = async (email: string, password: string) => {
    setIsProcessing(true);
    setAuthError(null);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        const errorMessage =
          error.status === 429
            ? "Too many requests. Please try again later."
            : error.message;
        setAuthError(errorMessage);
        toast({
          variant: "destructive",
          title: "Login failed",
          description: errorMessage,
        });
        return false;
      }
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
      return true;
    } catch (err: any) {
      const errorMessage =
        err.status === 429
          ? "Too many requests. Please try again later."
          : err.message || "An error occurred during login";
      setAuthError(errorMessage);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const register = async (email: string, password: string) => {
    setIsProcessing(true);
    setAuthError(null);

    try {
      const { error } = await signUp(email, password);
      if (error) {
        const errorMessage =
          error.status === 429
            ? "Too many requests. Please try again later."
            : error.message;
        setAuthError(errorMessage);
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: errorMessage,
        });
        return false;
      }
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
      return true;
    } catch (err: any) {
      const errorMessage =
        err.status === 429
          ? "Too many requests. Please try again later."
          : err.message || "An error occurred during registration";
      setAuthError(errorMessage);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  const logout = async () => {
    setIsProcessing(true);
    try {
      const { error } = await signOut();
      if (error) {
        setAuthError(error.message);
        toast({
          variant: "destructive",
          title: "Logout failed",
          description: error.message,
        });
        return false;
      }
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully.",
      });
      return true;
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during logout";
      setAuthError(errorMessage);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: errorMessage,
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    user,
    session,
    isAuthenticated: !!user,
    isLoading: loading,
    isProcessing,
    authError,
    login,
    register,
    logout,
  };
}
