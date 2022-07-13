import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Router from "next/router";

import { authApi } from "@services/api";
import { AuthStorage } from "@services/storage/auth";

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
const authStorage = AuthStorage.getInstance();

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [protectedPaths, setProtectedPaths] = useState([]);

  useEffect(() => {
    const token = authStorage.getStoredToken();

    if (token && !user) {
      updateUserFromApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setProtectedPath(path: string) {
    setProtectedPaths([...protectedPaths, path]);
    handleProtectedPath();
  }

  async function updateUserFromApi() {
    try {
      const response = await authApi.get<User>("/me");
      const { email, permissions, roles } = response.data;

      setUser({ email, permissions, roles });
      handleProtectedPath();
    } catch {
      handleProtectedPath();
    }
  }

  function handleProtectedPath() {
    if (user) {
      return;
    }

    const isProtectedPath = protectedPaths.includes(Router.pathname);
    console.log(isProtectedPath, protectedPaths);
    if (isProtectedPath) {
      Router.push("/");
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await authApi.post("/sessions", { email, password });
      const { token, refreshToken, permissions, roles } = response.data;

      authStorage.storeAuthTokens({ token, refreshToken });

      setUser({
        email,
        permissions,
        roles,
      });

      authApi.updateAuthorization(token);
      Router.push("/dashboard");
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
