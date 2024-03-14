import { Auth } from "../types/auth.interface";

export const setCredentials = (auth: Auth) => {
  localStorage.setItem('access_token', auth.accessToken);
  localStorage.setItem('refresh_token', auth.refreshToken);
  localStorage.setItem('expires_in', auth.expiresIn);
}