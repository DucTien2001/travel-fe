import "styles/globals.css";
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/react-demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
import "./index.scss";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import LayoutAuth from "components/Layout/DefaultLayout";
import LayoutEnterprise from "components/Layout/EnterpriseLayout";
import { config } from "@fortawesome/fontawesome-svg-core";
import { publicRoutes } from "routes";
config.autoAddCss = false;
import type { AppProps } from "next/app";
import { useDispatch, useSelector } from "react-redux";
// import { createConfigureStore } from "redux/configureStore";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { wrapper } from "redux/configureStore";
import { useEffect, useState } from "react";
import { getMe } from "redux/reducers/User/actionTypes";
import AppStatus from "components/AppStatus";
import Router from "next/router";
import LoadingScreen from "components/LoadingSrceen";
import { EUserType } from "models/user";
import { ReducerType } from "redux/reducers";
import {
  getAllHotels as getAllHotelsOfEnterprise,
  getAllTours as getAllToursOfEnterprise,
} from "redux/reducers/Enterprise/actionTypes";
import { getAllTours as getAllToursOfNormal, getAllHotels as getAllHotelsOfNormal } from "redux/reducers/Normal/actionTypes";
// import { getAllHotels as getAllHotelsOfNormal } from "redux/reducers/Normal/actionTypes";

// const { store } = createConfigureStore();

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReducerType) => state.user);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllToursOfNormal());
    dispatch(getAllHotelsOfNormal());
    if (user) {
      if (user?.role === EUserType.ENTERPRISE) {
        dispatch(getAllToursOfEnterprise(user?.id));
        dispatch(getAllHotelsOfEnterprise(user?.id));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });
  return (
    <LayoutAuth>
      {loading && <LoadingScreen />}
      <AppStatus />
      <Component {...pageProps} />
    </LayoutAuth>
  );
}

export default withRedux(wrapper)(withReduxSaga(MyApp));
// export default MyApp;
