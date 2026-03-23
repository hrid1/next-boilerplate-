export type User = {
  id:    string;
  name:  string;
  email: string;
  role:  "admin" | "editor" | "viewer";
};

export type LoginDto = {
  email:    string;
  password: string;
};

// Bearer mode → backend returns this
// httpOnly mode → backend only returns user, sets cookie itself
export type LoginResponse = {
  user:          User;
  access_token?: string;   // only in Bearer mode
  refresh_Token?: string;   // only if refresh supported
};