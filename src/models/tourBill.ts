import { TourPrice } from "./tour";
import { Tour } from "./tour";

export interface Create {
  tourId: number;
  tourOnSaleId: number;
  amountChild: number;
  amountAdult: number;
  price: number;
  discount: number;
  totalBill: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

export interface Update {
  tourOnSaleId?: number;
  amountChild?: number;
  amountAdult?: number;
  price?: number;
  discount?: number;
  totalBill?: number;
  status?: number;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
}
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
  status?: number;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  specialRequest?: string;
}

export interface IVerifyBookTour {
  code: string;
  billId: number;
}

export interface IToursRevenueByMonth {
  tourIds: number[];
  month: number;
  year: number;
}

export interface IToursRevenueByYear {
  tourIds: number[];
  year: number;
}

export interface EGetAllTourBillsAnyDate {
  tourIds: number[];
  date: Date;
}