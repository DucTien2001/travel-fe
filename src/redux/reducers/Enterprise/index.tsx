import produce from "immer";
import * as types from "./actionTypes";

export interface ITour {
  id?: number;
  title: string;
  description: string;
  priceAdult?: number;
  priceChild?: [];
  childOldRangeFrom?: [];
  childOldRangeTo?: [];
  city?: string;
  district?: string;
  commune?: string;
  moreLocation?: string;
  highlight?: string;
  termsAndCondition?: string;
  languages?: [];
  suitablePerson?: [];
  totalTicket?: [];
  startDate?: [];
  endDate?: [];
  businessHours?: string[];
  location?: string;
  price?: number;
  discount: number;
  tags?: string[];
  rate?: number;
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
  mondayPrice: number;
  tuesdayPrice: number;
  wednesdayPrice: number;
  thursdayPrice: number;
  fridayPrice: number;
  saturdayPrice: number;
  sundayPrice: number;
  hotelId: number;
  isTemporarilyStopWorking?: boolean;
}
export interface EnterpriseState {
  allTours: ITour[];
  allHotels: IHotel[];
  tour: ITour;
}

const initial: EnterpriseState = {
  allTours: [],
  allHotels: [],
  tour: null,
};

export const enterpriseReducer = (state = initial, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_TOURS_REDUCER:
        draft.allTours = action.data;
        break;
      case types.SET_HOTELS_REDUCER:
        draft.allHotels = action.data;
        break;
      case types.SET_TOUR_REDUCER:
        draft.tour = action.data;
        break;
      default:
        return state;
    }
  });
