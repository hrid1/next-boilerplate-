import axios, { AxiosRequestConfig } from "axios";
import { authConfig } from "@/config/auth.config";
import { cookie } from "@/lib/cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: authConfig.httpOnly,
});

// ── Request interceptor ───────────────────────────────────────
api.interceptors.request.use((config) => {
  if (!authConfig.httpOnly) {
    const token = cookie.get(authConfig.cookieName);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor ──────────────────────────────────────
let isRefreshing = false;
let failedQueue: { resolve: Function; reject: Function }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

const clearAndRedirect = () => {
  if (!authConfig.httpOnly) {
    cookie.remove(authConfig.cookieName);
    cookie.remove(authConfig.refreshCookie);
  }
  window.location.href = "/login";
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    // Skip 401 handling for login endpoint
    if (status === 401 && original.url?.includes("/auth/login")) {
      return Promise.reject(error);
    }

    // Only handle 401
    if (status !== 401) return Promise.reject(error);

    // Already retried → give up
    if (original._retry) {
      clearAndRedirect();
      return Promise.reject(error);
    }

    // ── No refresh support → clear and redirect immediately ──
    if (!authConfig.refreshEnabled) {
      clearAndRedirect();
      return Promise.reject(error);
    }

    // ── Refresh supported → try to get new token ─────────────
    const refreshToken = !authConfig.httpOnly
      ? cookie.get(authConfig.refreshCookie)
      : true; // httpOnly mode → just call the endpoint, browser sends cookie

    // No refresh token in cookie → give up
    if (!refreshToken) {
      clearAndRedirect();
      return Promise.reject(error);
    }

    // Another request is already refreshing → queue this one
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          if (!authConfig.httpOnly && newToken) {
            original.headers = {
              ...original.headers,
              Authorization: `Bearer ${newToken}`,
            };
          }
          return api(original);
        })
        .catch(Promise.reject);
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const payload = !authConfig.httpOnly
        ? { refreshToken: cookie.get(authConfig.refreshCookie) }
        : {};

      const { data } = await api.post("/auth/refresh", payload);

      // Bearer mode → save new token
      if (!authConfig.httpOnly && data.token) {
        cookie.set(authConfig.cookieName, data.token);
        api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      }

      processQueue(null, data.token ?? null);

      // Retry original request with new token
      if (!authConfig.httpOnly && data.token) {
        original.headers = {
          ...original.headers,
          Authorization: `Bearer ${data.token}`,
        };
      }

      return api(original);
    } catch (refreshError) {
      // Refresh itself failed → session is dead
      processQueue(refreshError, null);
      clearAndRedirect();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;

// ------------------------------------------------------

//  ### How the 401 logic flows
//  ```
// Got 401
//   │
//   ├── already retried?
//   │     └── yes → clearAndRedirect()
//   │
//   ├── refreshEnabled: false?
//   │     └── yes → clearAndRedirect()   ← your case right now
//   │
//   ├── refreshEnabled: true
//   │     │
//   │     ├── no refresh token in cookie?
//   │     │     └── clearAndRedirect()
//   │     │
//   │     ├── already refreshing?
//   │     │     └── queue the request, wait for new token
//   │     │
//   │     └── call POST /auth/refresh
//   │           ├── success → save token, retry original, flush queue
//   │           └── failed  → clearAndRedirect(), flush queue with error
