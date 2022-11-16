// tour
export const GET_TOURS_REQUEST = "GET_TOURS_REQUEST";
export const SET_TOURS_REDUCER = "SET_TOURS_REDUCER";

// ********** tour **********
export const getAllTours = () => {
  return {
    type: GET_TOURS_REQUEST,
  };
};

export const setAllToursReducer = (data: any) => {
  return {
    type: SET_TOURS_REDUCER,
    data: data,
  };
};

