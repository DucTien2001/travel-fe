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
import { appWithTranslation } from 'next-i18next';
import i18n from 'locales';
import { getMe } from "redux/reducers/User/actionTypes";
import AppStatus from "components/AppStatus";
import Router, { useRouter } from "next/router";
import LoadingScreen from "components/LoadingSrceen";
import { EUserType } from "models/user";
import { ReducerType } from "redux/reducers";
import "../styles/globals.css";
import {
  getAllHotels as getAllHotelsOfEnterprise,
  getAllTours as getAllToursOfEnterprise,
} from "redux/reducers/Enterprise/actionTypes";

import {
  getAllTours as getAllToursOfNormal,
  getAllHotels as getAllHotelsOfNormal,
  getAllTourBills,
  getAllRoomBills,
} from "redux/reducers/Normal/actionTypes";
import Home from "pages";
import { langSupports } from "models/general";
import moment from 'moment';
import { I18nextProvider } from "react-i18next";

// const { store } = createConfigureStore();

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReducerType) => state.user);

  useEffect(() => {
    if (!i18n.language) return
    if (!langSupports.find(lang => lang.key === i18n.language)) {
      i18n.changeLanguage(langSupports[0].key)
    }
    moment.locale(i18n.language)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

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
      dispatch(getAllTourBills(user?.id));
      dispatch(getAllRoomBills(user?.id));
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

  let allowed = true;
  const router = useRouter();
  if (
    router.pathname.startsWith("/enterprises") &&
    user?.role !== EUserType.ENTERPRISE &&
    user?.role !== EUserType.STAFF
  ) {
    allowed = false;
  }
  if (
    router.pathname.startsWith("/admin") &&
    user?.role !== EUserType.SUPER_ADMIN &&
    user?.role !== EUserType.ADMIN
  ) {
    allowed = false;
  }

  const ComponentToRender = allowed ? Component : Home;
  return (
      <I18nextProvider i18n={i18n}>
        <LayoutAuth>
          {/* {loading && <LoadingScreen />} */}
          <AppStatus />
          <ComponentToRender {...pageProps} />
        </LayoutAuth>
      </I18nextProvider>
  );
}

export default withRedux(wrapper)(withReduxSaga(MyApp));
// export default appWithTranslation(withRedux(wrapper)(withReduxSaga(MyApp)));
// export default MyApp;
