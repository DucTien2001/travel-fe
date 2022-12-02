import { User } from "./user";

export interface IGetAllTourComments {
  tourIds: number[];
}

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
export interface HotelReviewer{
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
    hotelReviewer?: HotelReviewer;
    createdAt: Date;
    replyComment?: string;
}

export interface IReplyTourComment {
    replyComment: string;
  }
  

  export interface ICreateHotelComment {
    id?: number;
    comment: string;
    rate: number;
    hotelId: number;
    userId: number;
  }
  
  export interface IUpdateHotelComment {
    comment: string;
    rate: number;
  }
  
  export interface IReplyHotelComment {
    replyComment: string;
  }
  
  export interface IGetAllHotelComments {
    hotelIds: number[];
  }