import { Module } from "./module.interface";
import { Role } from "./role.interface";

export interface User {
  id: string;
  name: string;
  lastName: string;
  secondLastName: string;
  username: string;
  email: string;
  active: boolean;
  recoveryCode: string;
  verified: boolean;
  roles: Role[];
  modules: Module[];
  password?: string;
  createdAt?: string;
  worker: Worker,
  activeRole: {
    id: string;
    name: string;
  };
}

export interface Worker {
  id: string;
  name: string;
  lastName: string;
  secondLastName: string;
  username: string;
  email: string;
  activeRole: string | null;
}