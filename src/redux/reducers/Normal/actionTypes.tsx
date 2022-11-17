import { Tour } from "models/tour";

// tour
export const GET_NORMAL_TOURS_REQUEST = "GET_NORMAL_TOURS_REQUEST";
export const SET_NORMAL_TOURS_REDUCER = "SET_NORMAL_TOURS_REDUCER";

export const GET_NORMAL_TOURS_DETAIL_REQUEST = "GET_NORMAL_TOURS_DETAIL_REQUEST";
export const SET_NORMAL_TOURS_DETAIL_REDUCER = "SET_NORMAL_TOURS_DETAIL_REDUCER";
// ********** tour **********
export const getAllTours = () => {
  return {
    type: GET_NORMAL_TOURS_REQUEST,
  };
};

export const setAllToursReducer = (data: any) => {
  return {
    type: SET_NORMAL_TOURS_REDUCER,
    data: data,
  };
};

export const getTour = (id: number) => {
  return {
    type: GET_NORMAL_TOURS_DETAIL_REQUEST,
    id: id,
  };
};

export const setTourReducer = (data: Tour) => {
  return {
    type: SET_NORMAL_TOURS_DETAIL_REDUCER,
    data: data
  }
}
