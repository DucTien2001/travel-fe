import { Tour } from "models/tour";

// tour
export const GET_NORMAL_TOURS_REQUEST = "GET_NORMAL_TOURS_REQUEST";
export const SET_NORMAL_TOURS_REDUCER = "SET_NORMAL_TOURS_REDUCER";
// hotel
export const GET_NORMAL_HOTELS_REQUEST = "GET_NORMAL_HOTELS_REQUEST";
export const SET_NORMAL_HOTELS_REDUCER = "SET_NORMAL_HOTELS_REDUCER";
// room bill confirm
export const GET_ROOM_BILL_CONFIRM_REQUEST = "GET_ROOM_BILL_CONFIRM_REQUEST";
export const SET_ROOM_BILL_CONFIRM_REDUCER = "SET_ROOM_BILL_CONFIRM_REDUCER";

//tour bill
export const GET_TOUR_BILLS_REQUEST = "GET_TOUR_BILLS_REQUEST";
export const SET_TOUR_BILLS_REDUCER = "SET_TOUR_BILLS_REDUCER";
//HOTEL BILL
export const GET_ROOM_BILLS_REQUEST = "GET_ROOM_BILLS_REQUEST";
export const SET_ROOM_BILLS_REDUCER = "SET_ROOM_BILLS_REDUCER";
// comment tour 
export const GET_TOUR_COMMENT_REQUEST = "GET_TOUR_COMMENT_REQUEST";
export const SET_TOUR_COMMENT_REDUCER = "SET_TOUR_COMMENT_REDUCER";


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

// ********** hotel **********
export const getAllHotels = () => {
  return {
    type: GET_NORMAL_HOTELS_REQUEST,
  };
};

export const setAllHotelsReducer = (data: any) => {
  return {
    type: SET_NORMAL_HOTELS_REDUCER,
    data: data,
  };
};

// ********** room bill confirm **********
export const getRoomBillConfirm = () => {
  return {
    type: GET_ROOM_BILL_CONFIRM_REQUEST,
  };
};

export const setRoomBillConfirmReducer = (data: any) => {
  return {
    type: SET_ROOM_BILL_CONFIRM_REDUCER,
    data: data,
  };
};

// ********** TOUR bill **********
export const getAllTourBills = (userId: number) => {
  return {
    type: GET_TOUR_BILLS_REQUEST,
    userId,
  };
};

export const setAllTourBillsReducer = (data: any) => {
  return {
    type: SET_TOUR_BILLS_REDUCER,
    data: data,
  };
};

// ********** hotel bill **********
export const getAllRoomBills = (userId: number) => {
  return {
    type: GET_ROOM_BILLS_REQUEST,
    userId,
  };
};

export const setAllRoomBillsReducer = (data: any) => {
  return {
    type: SET_ROOM_BILLS_REDUCER,
    data: data,
  };
};