import { jwtDecode } from "jwt-decode";
import { Context } from "../types/context.interface"
import { Error } from "../types/inital-state.interface";

export const getUserContext = (): Context | null => {
  const token = localStorage.getItem('access_token');
  return token ? jwtDecode(token) as Context : null;
}

export const getToken = (): string => {
  return localStorage.getItem('access_token') || '';
}

export const getErrorMessage = (error: Error): string => {
  if(!error) {
    return "Algo salió mal, reintenta más tarde o contacta a soporte"
  }

  return Array.isArray(error.message) ? error.message[0] : error.message;
}