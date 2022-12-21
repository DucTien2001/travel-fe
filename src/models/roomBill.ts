import { IHotel } from "./hotel";
import { IRoom } from "./room";

export interface IRoomBillConfirm {
  hotel: IHotel;
  rooms: IRoom[];
  startDate: string;
  endDate: string;
}

export interface ICreateRoomBill {
  userId: number;
  userMail: string;
  hotelId: number;
  rooms: {
    roomId: string;
    amount: string;
    discount: number;
    price: number;
    bookedDates: Date;
    totalPrice: number;
  }[];
  bookedDates: string[];
  startDate: string;
  endDate: string;
  totalBill: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;  
  bankName: string;
  bankAccountName: string;
  bankNumber: string;
  accountExpirationDate: Date;
  deposit: number;
}

export interface IVerifyBookRoom {
  code: string;
  billId: number;
}

export interface IHotelsRevenueByMonth {
  hotelIds: number[];
  month: number;
  year: number;
}

export interface IHotelsRevenueByYear {
  hotelIds: number[];
  year: number;
}
