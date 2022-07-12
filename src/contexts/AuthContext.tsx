import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Router from "next/router";
import { setCookie, parseCookies } from "nookies";

import { authApi } from "@services/api";

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

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [protectedPaths, setProtectedPaths] = useState([]);

  useEffect(() => {
    const { "dashgo.token": token } = parseCookies();

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

      setCookie(undefined, "dashgo.token", token, {
        maxAge: 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "dashgo.refreshToken", refreshToken, {
        maxAge: 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      authApi.defaults.headers["Authorization"] = `Barear ${token}`;

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
