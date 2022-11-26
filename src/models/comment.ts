import { User } from "./user";

export interface ICreateTourComment {
    id?: number;
    comment: string;
    rate: number;
    tourId: number;
    userId: number;
  }

export interface IUpdateTourComment {
    comment: string;
    rate: number;
}
  
export interface Comment {
    id?: number;
    comment: string;
    rate: number;
    tourId?: number;
    roomId?: number;
    user: User;
    date: Date;
}
  