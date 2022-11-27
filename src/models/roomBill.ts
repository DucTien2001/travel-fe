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
}

export interface IVerifyBookRoom {
  code: string;
  billId: number;
}
