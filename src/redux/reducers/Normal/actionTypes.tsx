// tour
export const GET_NORMAL_TOURS_REQUEST = "GET_NORMAL_TOURS_REQUEST";
export const SET_NORMAL_TOURS_REDUCER = "SET_NORMAL_TOURS_REDUCER";

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

