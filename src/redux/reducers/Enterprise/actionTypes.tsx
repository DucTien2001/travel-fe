// tour
export const GET_TOURS_REQUEST = "GET_TOURS_REQUEST";
export const SET_TOURS_REDUCER = "SET_TOURS_REDUCER";

// hotel
export const GET_HOTELS_REQUEST = "GET_HOTELS_REQUEST";
export const SET_HOTELS_REDUCER = "SET_HOTELS_REDUCER";

// ********** tour **********
export const getAllTours = (userId: number) => {
  return {
    type: GET_TOURS_REQUEST,
    userId,
  };
};

export const setAllToursReducer = (data: any) => {
  return {
    type: SET_TOURS_REDUCER,
    data: data,
  };
};

// *********** hotel ************
export const getAllHotels = (userId: number) => {
  return {
    type: GET_HOTELS_REQUEST,
    userId,
  };
};

export const setAllHotelsReducer = (data: any) => {
  return {
    type: SET_HOTELS_REDUCER,
    data: data,
  };
};