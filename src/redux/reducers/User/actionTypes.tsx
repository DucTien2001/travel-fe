import { User } from "models/user";

export const USER_LOGIN_REDUCER = "USER_LOGIN_REDUCER";

export const GET_ME_REQUEST = "GET_ME_REQUEST";

export const getMe = () => {
  return {
    type: GET_ME_REQUEST,
  };
};

export const setUserLogin = (data: User) => {
  return {
    type: USER_LOGIN_REDUCER,
    data: data,
  };
};
