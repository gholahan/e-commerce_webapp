import { useEffect, useState } from "react";
import { refresh } from "../auth.api";
import { useAuthStore } from "../auth.store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { refreshToken, setTokens, logout } = useAuthStore();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      if (!navigator.onLine) {
        setAuthReady(true);
        return;
      }

      if (!refreshToken) {
        setAuthReady(true);
        return;
      }

      try {
        const data = await refresh(refreshToken);
        setTokens(data.accessToken, data.refreshToken);
      } catch (error: any) {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          logout();
        }
      } finally {
        setAuthReady(true);
      }
    };

    initAuth();
  }, [refreshToken, setTokens, logout]);

  if (!authReady) {
    return <div>Initializing session...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
