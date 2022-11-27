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

export interface TourReviewer{
    address?: string;
    avatar: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    role?: number;
    userName?: string;
}
  
export interface Comment {
    id?: number;
    comment: string;
    rate: number;
    tourId?: number;
    roomId?: number;
    userId?: number;
    tourReviewer?: TourReviewer;
    createdAt: Date;
    replyComment?: string;
}

export interface IReplyTourComment {
    replyComment: string;
  }
  