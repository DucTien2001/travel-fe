export interface FindAll {
    take: number;
    page: number;
    keyword?: string;
}


export interface SendOffer {
  email: string;
}


export interface IStaff {
  id?: number;
  username: string;
  lastName: string;
  firstName: string;
  address?:string;
  becomeStaffDate?: Date;
  role?:number;
  isVerified?: boolean;
  isDeleted?: boolean;
  phoneNumber?: string; 
}