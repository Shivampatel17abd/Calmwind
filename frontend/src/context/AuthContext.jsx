import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchCurrentUser,
  updateAccount as updateAccountApi,
  changePassword as changePasswordApi,
} from "../utils/auth";
import { clearTokens } from "../utils/api";

const AuthContext = createContext(null);
const CACHED_USER_KEY = "calmwind_auth_user";

function readCachedUser() {
  try {
    const raw = localStorage.getItem(CACHED_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function cacheUser(user) {
  try {
    if (user) localStorage.setItem(CACHED_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CACHED_USER_KEY);
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => readCachedUser());
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useCallback((next) => {
    setUserState(next);
    cacheUser(next);
  }, []);

  // Restore session on load: cookie and/or stored Bearer token via current-user.
  // apiRequest auto-refreshes once on 401 using the refresh token.
  // Only a definitive 401 signs the user out. A network error (status 0),
  // 5xx, or a backend restart must NOT destroy an otherwise valid session —
  // keep the cached user and tokens and let the next request retry.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const current = await fetchCurrentUser();
        if (!cancelled) setUser(current);
      } catch (error) {
        if (!cancelled && error?.status === 401) {
          clearTokens();
          setUser(null);
        }
        // Transient failure: keep cached user/tokens, stay signed in.
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [setUser]);

  const login = useCallback(
    async (credentials) => {
      const loggedIn = await loginUser(credentials);
      setUser(loggedIn);
      return loggedIn;
    },
    [setUser]
  );

  const register = useCallback(
    async (details) => {
      const newUser = await registerUser(details);
      setUser(newUser);
      return newUser;
    },
    [setUser]
  );

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // Session is cleared locally even if the server call fails.
    } finally {
      clearTokens();
      setUser(null);
    }
  }, [setUser]);

  const refreshUser = useCallback(async () => {
    const current = await fetchCurrentUser();
    setUser(current);
    return current;
  }, [setUser]);

  const updateAccount = useCallback(
    async (details) => {
      const updated = await updateAccountApi(details);
      setUser(updated);
      return updated;
    },
    [setUser]
  );

  const changePassword = useCallback(
    async (details) => changePasswordApi(details),
    []
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
      refreshUser,
      updateAccount,
      changePassword,
    }),
    [user, isLoading, login, register, logout, refreshUser, updateAccount, changePassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
