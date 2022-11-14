
export const GET_TOURS_REQUEST = "GET_TOURS_REQUEST";
export const GET_TOURS_REDUCER = "GET_TOURS_REDUCER";
export const SET_TOURS_REDUCER = "SET_TOURS_REDUCER";

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

