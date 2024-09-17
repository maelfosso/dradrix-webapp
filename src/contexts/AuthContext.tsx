import { useQuery } from "@tanstack/react-query";
import {
  AUTH_USER} from "@/api/auth";
import Spinner from "@/components/common/Spinner";
import { User } from "models/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchApiResponse } from "@/api/axios";

interface AuthContextProps {
  authenticatedUser: User | null,
  setAuthenticatedUser: (user: User) => void,
  isAuthenticated: boolean,
  checkCurrentUser: () => void,
}

export const AuthContext = createContext<AuthContextProps | null>(null);


interface AuthProviderProps {
  children: JSX.Element
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<User|null>(null);

  const {isPending: isPendingAuth, data, refetch } = useQuery({
    queryKey: ["current", AUTH_USER],
    queryFn: async () => fetchApiResponse<User>(AUTH_USER, "GET")
  });

  useEffect(() => {
    if (data) {
      setAuthenticatedUser(data)
      setIsAuthenticated(!!data);
    }
  }, [data]);

  const checkCurrentUser = () => {
    refetch();
  }

  const value = useMemo(
    () => ({
      authenticatedUser,
      setAuthenticatedUser,
      isAuthenticated,
      checkCurrentUser,
    }), [
      authenticatedUser,
      setAuthenticatedUser,
      isAuthenticated,
    ]
  );

  if (isPendingAuth) {
    return (
      <div className="grid h-screen place-items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
