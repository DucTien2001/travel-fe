import { combineReducers } from "redux";
import { History } from "history";
// import { connectRouter } from "connected-react-router";
import { StatusState, statusReducer } from "./Status";
import { userReducer, UserState } from "./User";

const createRootReducer = () => {
  const reducers = combineReducers({
    status: statusReducer,
    user: userReducer,
    // router: connectRouter(history),
  });
  return reducers;
};

export interface ReducerType {
  status: StatusState;
  user: UserState;
  // router: {
  //   location: {
  //     pathname: string;
  //     search: string;
  //     hash: string;
  //   };
  //   action: string;
  // };
}

export default createRootReducer;
