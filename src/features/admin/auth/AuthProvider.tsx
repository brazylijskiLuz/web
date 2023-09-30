import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthStorage } from "./auth-storage";
import { useAuthStore } from "@/stores/auth.store";
import { AuthApi } from "@/api/requests/auth.api";
import { useUserStore } from "@/stores/user.store";

interface AuthProviderProps extends PropsWithChildren {
  role: "ADMIN";
}

export function AuthProvider({ children, role }: AuthProviderProps) {
  const setToken = useAuthStore((state) => state.setToken);

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const retrieveToken = useCallback((): string | null => {
    const fromStorage = AuthStorage.getToken();
    setToken(fromStorage);
    return fromStorage;
  }, [setToken]);

  const userRedirect = useCallback(() => {
    setToken("");
    router.push("/");
  }, [setToken]);

  const roleRedirect = useCallback(
    (role: "ADMIN") => {
      if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        userRedirect();
      }
    },
    [userRedirect],
  );

  useEffect(() => {
    async function checkAuth() {
      const token = retrieveToken();
      const isAuth = Boolean(token);
      if (!isAuth) {
        return userRedirect();
      }
      try {
        const res = await AuthApi.getRefreshToken();
        const jwt = res.data?.jwt || null;
        setToken(jwt);
        // setUser(user);
        if (!jwt) {
          userRedirect();
        } else {
          roleRedirect("ADMIN");
        }
        // if (jwt.role !== role) {
        //     return roleRedirect('ADMIN');
        // }
        setLoading(false);
      } catch (error) {
        return userRedirect();
      }
    }
    checkAuth();
  }, [roleRedirect, setToken, userRedirect, retrieveToken, role, setUser]);

  if (loading) {
    return (
      <div>
        <p>loading</p>
      </div>
    );
  }

  return children;
}
