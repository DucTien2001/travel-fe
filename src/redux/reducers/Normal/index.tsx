import produce from "immer";
import { Comment } from "models/comment";
import * as types from "./actionTypes";

export interface ITour {
  id?: number;
  title: string;
  description: string;
  businessHours: string[];
  location: string;
  price: number;
  discount: number;
  tags: string[];
  images: string[];
  creator: number;
  contact: string;
  isTemporarilyStopWorking?: boolean;
}

export interface IHotel {
  id?: number;
  name: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  location: string;
  contact: string;
  tags: string[];
  images: string[];
  creator: number;
  isTemporarilyStopWorking?: boolean;
}

export interface IRoom {
  title: string;
  description: string;
  discount: number;
  tags: string;
  images: string;
  numberOfBed: number;
  numberOfRoom: number;
  hotelId: number;
  amount: number;
  priceDetail: any;
}

export interface IRoomBillConfirm {
  hotel: IHotel;
  rooms: IRoom[];
  startDate: string;
  endDate: string;

}
export interface ITourBill {
  userId: number;
  userMail: string;
  tourId: number;
  amount: number;
  price: number;
  discount: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  verifyCode: string;
}
export interface ICreateRoomBill {
  id?:number;
  userId: number;
  userMail: string;
  hotelId: number;
  rooms: {
    roomId: string;
    amount: string;
    discount: number;
    price: number;
    bookedDate: Date;
    totalPrice: number;
  }[];
  bookedDates: string;
  startDate: Date;
  endDate: Date;
  totalBill: number;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  verifyCode: string;

}
export interface NormalState {
  allTours: ITour[];
  allHotels: IHotel[];
  roomBillConfirm: IRoomBillConfirm;
  allTourBills: ITourBill[];
  allRoomBills: ICreateRoomBill[];
}

const initial: NormalState = {
  allTours: [],
  allHotels: [],
  roomBillConfirm: null,
  allTourBills: [],
  allRoomBills: [],
};

export const normalReducer = (state = initial, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_NORMAL_TOURS_REDUCER:
        draft.allTours = action.data;
        break;
      case types.SET_NORMAL_HOTELS_REDUCER:
        draft.allHotels = action.data;
        break;
      case types.SET_ROOM_BILL_CONFIRM_REDUCER:
        draft.roomBillConfirm = action.data;
        break;
      case types.SET_TOUR_BILLS_REDUCER:
        draft.allTourBills = action.data;
        break;
      case types.SET_ROOM_BILLS_REDUCER:
        draft.allRoomBills = action.data;
        break;  
      default:
        return state;
    }
  });
