import { Role } from "./role.interface";

export interface Context {
  userId?: string;
  username?: string;
  name?: string;
  lastName?: string;
  secondLastName?: string;
  email?: string;
  roles: Role[];
  modules?: string[];
  iat?: number;
  exp?: number;
}
