export const authConfig = {
  httpOnly:       false,   // true = backend sets cookie, false = Bearer token
  refreshEnabled: false,   // true = backend supports refresh token endpoint

  cookieName:    "token",
  refreshCookie: "refresh_token",
  tokenExpiry:   7,
} as const;