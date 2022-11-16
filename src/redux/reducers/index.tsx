import { combineReducers } from "redux";
import { History } from "history";
// import { connectRouter } from "connected-react-router";
import { StatusState, statusReducer } from "./Status";
import { userReducer, UserState } from "./User";
import { enterpriseReducer, EnterpriseState } from "./Enterprise";
import { tourReducer, TourState } from "./Tour";

const createRootReducer = () => {
  const reducers = combineReducers({
    status: statusReducer,
    user: userReducer,
    enterprise: enterpriseReducer,
    tour: tourReducer,
    // router: connectRouter(history),
  });
  return reducers;
};

export interface ReducerType {
  status: StatusState;
  user: UserState;
  enterprise: EnterpriseState;
  tour: TourState;
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
