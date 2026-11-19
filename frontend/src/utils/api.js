const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

// localStorage (not sessionStorage) so the session survives new tabs and
// browser restarts, matching the 1d/10d cookie + JWT lifetimes.
const ACCESS_TOKEN_KEY = "calmwind_access_token";
const REFRESH_TOKEN_KEY = "calmwind_refresh_token";

export class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export function getAccessToken() {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getRefreshToken() {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function storeTokens({ accessToken, refreshToken } = {}) {
  try {
    if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } catch {
    // localStorage unavailable; httpOnly cookies still carry the session.
  }
}

export function clearTokens() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch {
    // ignore
  }
}

let refreshPromise = null;

async function parseResponse(response) {
  const text = await response.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }
  }
  if (!response.ok) {
    throw new ApiError(
      response.status,
      payload?.message || `Request failed (${response.status})`,
      payload?.errors || []
    );
  }
  return payload;
}

async function rawRequest(path, { method = "GET", body, isFormData = false } = {}) {
  const headers = {};
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined && !isFormData) headers["Content-Type"] = "application/json";

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      credentials: "include",
      body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      0,
      "Cannot reach the CalmWind server. Start the backend (http://localhost:8000) and try again."
    );
  }
  return parseResponse(response);
}

export async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = getRefreshToken();
      const payload = await rawRequest("/users/refresh-token", {
        method: "POST",
        body: refreshToken ? { refreshToken } : {},
      });
      storeTokens(payload?.data || {});
      return payload?.data;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

const PUBLIC_PATHS = ["/users/login", "/users/register", "/users/refresh-token"];

export async function apiRequest(path, options = {}) {
  const { _retry = false, ...rest } = options;
  try {
    return await rawRequest(path, rest);
  } catch (error) {
    const isPublic = PUBLIC_PATHS.some((p) => path.startsWith(p));
    if (error instanceof ApiError && error.status === 401 && !isPublic && !_retry) {
      try {
        await refreshAccessToken();
      } catch {
        // Refresh definitively failed: drop the cached user too so storage
        // doesn't claim a session that no longer exists.
        clearTokens();
        try {
          localStorage.removeItem("calmwind_auth_user");
        } catch {
          // ignore
        }
        throw error;
      }
      return apiRequest(path, { ...rest, _retry: true });
    }
    throw error;
  }
}
