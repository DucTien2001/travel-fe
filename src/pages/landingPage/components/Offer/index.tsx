import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardTitle,
  CardFooter,
} from "reactstrap";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { fCurrency2, fCurrency2VND } from "utils/formatNumber";
import Link from "next/link";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Stars from "components/Stars";
import Aos from "aos";
import "aos/dist/aos.css";
import { Card, Grid, useMediaQuery, useTheme } from "@mui/material";

// eslint-disable-next-line react/display-name
const OfferComponent = memo(() => {
  const { allTours, allHotels } = useSelector(
    (state: ReducerType) => state.normal
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const listBestSeller = allTours.filter((item) => {
    return item.discount;
  });

  const listHotelLove = allHotels.filter((item) => {
    return item?.rate >= 4;
  });

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <>
      <Grid className={classes.root}>
        <Grid>
          <h3 className={classes.title}>Best Places on Viet Nam</h3>
          <Grid container spacing={1} className={classes.containerBoxCard}>
            <Grid item xs={5} sx={{ height: "100%", paddingBottom: "8px" }}>
              <Card className={clsx(classes.card6)}>Phu Quoc Island</Card>
            </Grid>
            <Grid item xs={7} container spacing={1} sx={{ height: "100%" }}>
              <Grid xs={4} className={classes.col4} item container spacing={1}>
                <Grid xs={8} item className={classes.col4Long}>
                  <Card className={clsx(classes.card4Long)}>Da Nang</Card>
                </Grid>
                <Grid xs={4} item className={classes.col4Short}>
                  <Card className={clsx(classes.card4Short)}>Nha Trang</Card>
                </Grid>
              </Grid>
              <Grid xs={4} className={classes.col4} item container spacing={1}>
                <Grid xs={6} item className={classes.col4Long}>
                  <Card className={clsx(classes.card41Equal)}>Ha Long Bay</Card>
                </Grid>
                <Grid xs={6} item className={classes.col4Short}>
                  <Card className={clsx(classes.card42Equal)}>Da Lat</Card>
                </Grid>
              </Grid>
              <Grid xs={4} className={classes.col4} item container spacing={1}>
                <Grid xs={4} item className={classes.col4Long}>
                  <Card className={clsx(classes.card41Short)}>Sa Pa</Card>
                </Grid>
                <Grid xs={8} item className={classes.col4Short}>
                  <Card className={clsx(classes.card41Long)}>Hue</Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ paddingTop: "64px" }}>
          <h3 className={classes.title}>Favorite place in Viet Nam</h3>
          <Grid container spacing={1} className={classes.containerBoxCard}>
            <Grid
              item
              xs={8}
              sx={{ height: "100%", paddingBottom: "8px" }}
              container
              className={classes.col8}
              spacing={1}
            >
              <Grid
                xs={6}
                item
                className={classes.col6}
                sx={{ paddingRight: "8px" }}
              >
                <Card className={clsx(classes.cardPhuYen)}>
                  <p>Phu Yen</p> <span>100 hotels</span>
                </Card>
              </Grid>
              <Grid xs={6} item container className={classes.col6} spacing={1}>
                <Grid xs={6} item>
                  <Card className={clsx(classes.cardDaLat)}>
                    <p>Da Lat</p>
                    <span>100 hotels</span>
                  </Card>
                </Grid>
                <Grid xs={6} item>
                  <Card className={clsx(classes.cardQuyNhon)}>
                    <p>Quy Nhon</p>
                    <span>100 hotels</span>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ paddingBottom: "16px", paddingLeft: "0 !important" }}
            >
              <Card className={clsx(classes.cardVungTau)}>
                <p>Vung Tau</p>
                <span>100 hotels</span>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
});

export default OfferComponent;
