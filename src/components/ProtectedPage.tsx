import { ReactNode, useEffect } from "react";

import { useAuth } from "@contexts/AuthContext";

interface ProtectedPageProps {
  path: string;
  children: ReactNode;
}

export function ProtectedPage({
  path,
  children,
}: ProtectedPageProps): JSX.Element {
  const { isAuthenticated, setProtectedPath } = useAuth();

  useEffect(() => {
    setProtectedPath(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : <></>;
}
