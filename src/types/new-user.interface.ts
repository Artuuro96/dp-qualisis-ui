export interface NewUser {
  id: string;
  name: string;
  lastName: string;
  secondLastName: string;
  username: string;
  email: string;
  active: boolean;
  recoveryCode: string;
  verified: boolean;
  roles: string[];
  modules: string[];
  password?: string;
  activeRole: {
    id: string;
    name: string;
  };
}