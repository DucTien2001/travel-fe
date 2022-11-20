import produce from "immer";
import * as types from "./actionTypes";

export interface ITour {
  id?: number;
  title: string;
  description: string;
  businessHours: string;
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
  rooms: IRoom[];
  startDate: string;
  endDate: string;
}

export interface NormalState {
  allTours: ITour[];
  allHotels: IHotel[];
  roomBillConfirm: IRoomBillConfirm;
}

const initial: NormalState = {
  allTours: [],
  allHotels: [],
  roomBillConfirm: null,
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
      default:
        return state;
    }
  });
