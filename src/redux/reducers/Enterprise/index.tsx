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
    isTemporarilyStopWorking?: boolean;
}
export interface IHotel {
  name: string;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  location: string;
  tags: string;
  images: string;
  creator: number;
}

export interface IRoom {
  title: string;
  description: string;
  discount: number;
  tags: string;
  images: string;
  numberOfBed: number;
  numberOfRoom: number;
  mondayPrice: number;
  tuesdayPrice: number;
  wednesdayPrice: number;
  thursdayPrice: number;
  fridayPrice: number;
  saturdayPrice: number;
  sundayPrice: number;
  hotelId: number;
}
export interface EnterpriseState {
  allTours?: ITour[],
  allHotels: {
    hotel: IHotel,
    allRooms: IRoom[]
    }[],
}


const initial: EnterpriseState = {
  allTours: [],
  allHotels: [],
};

export const enterpriseReducer = (state = initial, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_TOURS_REDUCER:
        draft.allTours = action.data;
        break;
      default:
        return state;
    }
  });
