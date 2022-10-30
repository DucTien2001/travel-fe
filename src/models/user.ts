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