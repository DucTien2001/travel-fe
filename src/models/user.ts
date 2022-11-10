import { OptionItem } from "./general";

export interface User {
    id: number;
    email: string;
    passWord: string;
    role: number;
    avatar: any;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    introduction: string;
    isDelete: boolean;
    isVerified: boolean;
}

export interface LoginForm {
  username: string,
  password: string
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: number;
  phoneNumber: string;
}

export enum EUserType {
  ADMIN = 1,
  ENTERPRISE = 2,
  USER = 3,
}

export const adminTypes: OptionItem[] = [
  {
      id: EUserType.ADMIN,
      name: 'Admin'
  },
  {
      id: EUserType.USER,
      name: 'User'
  }
]

export interface IVerifySignup {
  code: string,
  userId: number
}
