import { AuthWithRole } from "../types/auth-with-role.interface";
import { Auth } from "../types/auth.interface";

export const setCredentials = (auth: Auth & AuthWithRole) => {
  localStorage.setItem('access_token', auth.accessToken);
  localStorage.setItem('refresh_token', auth.refreshToken);
  localStorage.setItem('expires_in', auth.expiresIn);
}