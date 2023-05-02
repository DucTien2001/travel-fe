import { Tour, TourPrice } from "models/tour";
import { IParticipantInfo } from "models/tourBill";

export interface FindAll {
    take: number;
    page: number;
    keyword?: string;
}


export interface TourBill {
    id?:number;
    tourOnSaleId?: number;
    amountChild?: number;
    amountAdult?: number;
    price?: number;
    discount?: number;
    totalBill?: number;
    tourData?: Tour;
    createdAt?: Date;
    tourOnSaleData?: TourPrice;
    participantsInfo?: IParticipantInfo[];
    status?: number;
    paymentStatus?: number;
    email?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    specialRequest?: string;
  }

  export interface UpdateStatus {
    status: number;
  }