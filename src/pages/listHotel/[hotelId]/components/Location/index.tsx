import React, { memo, useEffect, useState } from "react";
import Link from "next/link";
// reactstrap components
import { Container, Row, Col, Input, Media } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faPlus,
  faSignsPost,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import { Comment } from "models/comment";
import CardComment from "../CardComments";
import PopupAddComment from "components/Popup/PopupAddComment";
import { HOTEL_SECTION, IHotel } from "models/hotel";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { CommentService } from "services/normal/comment";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ReducerType } from "redux/reducers";
import PopupAddHotelComment from "../PopupAddHotelComment";
import Warning from "components/common/warning";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import clsx from "clsx";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
interface Props {
  hotel: IHotel;
}

// eslint-disable-next-line react/display-name
const Comments = memo(({ hotel }: Props) => {
  return (
    <Grid
      sx={{ backgroundColor: "#f6f2f2", padding: "32px 0 8px 0" }}
      id={HOTEL_SECTION.section_location}
    >
      <Container className={classes.root}>
        <h5> Location Detail</h5>
        <Grid
          sx={{
            padding: "18px",
            backgroundColor: "var(--white-color)",
            borderRadius: "10px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <p className={classes.locationDetail}>
            143 Trần Hưng Đạo, KP 7, TT Dương Đông, H.Phú Quốc, tỉnh Kiên Giang,
            Vietnam
          </p>
          <div className={classes.map}></div>
          <Grid
            className={classes.boxNearPlaces}
            columns={12}
            container
            columnSpacing={3}
          >
            <Grid className={classes.leftNearPlace} xs={6} item>
              <Grid sx={{ marginLeft: "0" }}>
                <Grid sx={{ marginBottom: "14px" }}>
                  <p>Nearby Places</p>
                </Grid>
                <Grid className={classes.itemNearPlace} xs={12}>
                  <Grid sx={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon icon={faSignsPost}></FontAwesomeIcon>
                    <Grid>
                      <p>Da Nang Night Market</p>
                      <span>Shop & Gifts</span>
                    </Grid>
                  </Grid>
                  <Grid>
                    <span>12 km</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.rightNearPlace} xs={6} item>
              <Grid sx={{ marginLeft: "0" }}>
                <Grid sx={{ marginBottom: "14px" }}>
                  <p>Popular in Area</p>
                </Grid>
                <Grid className={classes.itemNearPlace}>
                  <Grid sx={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon icon={faSignsPost}></FontAwesomeIcon>
                    <Grid>
                      <p>Da Nang Night Market</p>
                      <span>Shop & Gifts</span>
                    </Grid>
                  </Grid>
                  <Grid>
                    <span>12 km</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
});

export default Comments;
