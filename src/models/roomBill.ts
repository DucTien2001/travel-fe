import { IHotel } from "./hotel";
import { IRoom } from "./room";

export interface IRoomBillConfirm {
    hotel: IHotel;
    rooms: IRoom[];
    startDate: string;
    endDate: string;
  }

export interface RoomBill {
    userId: number;
    rooms: {
      roomId: number;
      amount: number;
      discount: number;
    }[];
    bookedDates: string;
    specialDates: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
}
  