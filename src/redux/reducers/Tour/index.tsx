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

export interface TourState {
  allTours: ITour[];
}

const initial: TourState = {
  allTours: [],
};

export const tourReducer = (state = initial, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_TOURS_REDUCER:
        draft.allTours = action.data;
        break;
      default:
        return state;
    }
  });
