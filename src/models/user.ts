import { OptionItem } from "./general";

export interface User {
    id: number;
    email: string;
    passWord: string;
    role: string;
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

export enum EAdminType {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  USER = 3,
}

export const adminTypes: OptionItem[] = [
  {
      id: EAdminType.ADMIN,
      name: 'Admin'
  },
  {
      id: EAdminType.USER,
      name: 'User'
  }
]

export interface IVerifySignup {
  code: string,
  userId: number
}
