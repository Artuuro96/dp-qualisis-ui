import { Context } from "./context.interface";

export interface Auth {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  isAuthenticated: boolean
  isAuthWithRole: boolean;
  context: Context | null;
}