export enum IRole {
  SUPER_ADMIN = "superAdmin",
  BRANCH_ADMIN = "admin",
  RECECPTIONIST = "recepionist",
  THERAPIST = "therapist",
}
export interface User {
  email?: string;
  phone?: string;
  type: string;
  userId?: string;
  status?: string;
  created?: number;
  countryCode?: string;
  role: IRole;
  branch_id: number | string;
}

export type UserState = {
  user: User;
  token: string | null;
  isAuthenticated: boolean;
  status: string;
  error: string | undefined;
  isNavigated: boolean;
};

export interface ISignupServiceRequestProps {
  requestData: User;
}

export interface ResponseUser extends User {}

export interface ISignUpServiceResponse {
  token: string;
  user: ResponseUser;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: ResponseUser;
}
