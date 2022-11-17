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

export interface NormalState {
  allTours: ITour[];
  tour: ITour;
}

const initial: NormalState = {
  allTours: [],
  tour: null,
};

export const normalReducer = (state = initial, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SET_NORMAL_TOURS_REDUCER:
        draft.allTours = action.data;
        break;
      case types.SET_NORMAL_TOURS_DETAIL_REDUCER:
        draft.tour = action.data;
        break;
      default:
        return state;
    }
  });
