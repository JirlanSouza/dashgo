import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Router from "next/router";

import { apiClient } from "@services/api/setupApiClient";
import { BrowserAuthStorage } from "@services/storage/auth";
import { navigateTo } from "@services/navigation";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  isAuthenticated: boolean;
  user: User;
  setProtectedPath: (path: string) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);
const authStorage = BrowserAuthStorage.getInstance();

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [protectedPaths, setProtectedPaths] = useState([]);

  useEffect(() => {
    const token = authStorage.getStoredToken();

    if (token && !user) {
      updateUserFromApi();
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setProtectedPath(path: string) {
    setProtectedPaths([...protectedPaths, path]);
    signOut();
  }

  async function updateUserFromApi() {
    return;
    const response = await apiClient.request.get<User>("/me");
    const userData = response?.data;

    if (!userData) {
      signOut();
      return;
    }

    setUser({ ...userData });
  }

  function signOut() {
    authStorage.removeTokens();
    navigateTo("/");
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await apiClient.request.post("/sessions", {
        email,
        password,
      });
      const { token, refreshToken, permissions, roles } = response.data;

      authStorage.storeAuthTokens({ token, refreshToken });

      setUser({
        email,
        permissions,
        roles,
      });

      apiClient.updateAuthorization(token);
      navigateTo("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, setProtectedPath, isAuthenticated: !!user, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
