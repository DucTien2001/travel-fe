import React, { memo } from "react";
import Link from "next/link";
// reactstrap components
import { Col, Row, Badge } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import Stars from "components/Stars";
import clsx from "clsx";
import { fCurrency2, fCurrency2VND } from "utils/formatNumber";
import useAuth from "hooks/useAuth";
import { Grid } from "@mui/material";
import IconMain from "components/common/icons/IconMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faLocationDot,
  faSignsPost,
} from "@fortawesome/free-solid-svg-icons";
interface Props {
  className?: string;
  linkView: string;
  linkBook: string;
  id: number;
  src?: string;
  title: string;
  description: string;
  businessHours?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  location: string;
  contact?: string;
  price?: number;
  discount?: number;
  tags?: string[];
  rate?: number;
  creator: number;
  isTemporarilyStopWorking?: boolean;
  isDelete?: boolean;
  roomNumber?: string;
  bookDates?: string;
  isHotel?: boolean;
  numberOfReviewers?: number;
}

// eslint-disable-next-line react/display-name
const ListServices = memo(
  ({
    className,
    linkView,
    linkBook,
    id,
    src,
    title,
    description,
    businessHours,
    location,
    contact,
    price,
    discount,
    checkInTime,
    checkOutTime,
    tags,
    rate,
    creator,
    isTemporarilyStopWorking,
    isDelete,
    roomNumber,
    bookDates,
    isHotel,
    numberOfReviewers,
  }: Props) => {
    const { user } = useAuth();
    return (
      <>
        <Grid
          xs={3}
          key={id}
          sx={{
            display: "flex",
            minHeight: "200px",
            minWidth: "640px",
            paddingBottom: "24px",
            cursor: "pointer",
          }}
          className={clsx(
            { [classes.stopWorking]: isTemporarilyStopWorking || isDelete },
            classes.row,
            className
          )}
        >
          <Grid className={classes.boxImg}>
            <img src={src} alt="anh"></img>
          </Grid>
          <Grid
            sx={{
              padding: "24px 14px 14px 14px",
              flexGrow: "1",
              justifyContent: "space-between",
              flexShrink: "1",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
              backgroundColor: "var(--white-color)",
              boxShadow: "var(--bui-shadow-100)",
            }}
          >
            <Grid className={classes.boxLocation}>
              <FontAwesomeIcon icon={faSignsPost}></FontAwesomeIcon>
              <div>Ganh Day Commue Phu Quoc Vinwonder</div>
            </Grid>
            <Grid className={classes.boxTitle}>
              <p>{title}</p>
            </Grid>
            {isHotel && (
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: "8px",
                }}
              >
                <Grid
                  sx={{
                    padding: "6px 14px",
                    backgroundColor: "var(--primary-light-color)",
                    color: "var(--white-color)",
                    borderRadius: "10px",
                    marginRight: "16px",
                  }}
                >
                  Hotel
                </Grid>
                <Stars numberOfStars={rate} />
              </Grid>
            )}
            <Grid className={classes.boxReview} sx={{ paddingTop: "8px" }}>
              {rate !== 0 && (
                <Grid className={classes.boxReview}>
                  <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                  <span>
                    {rate}{" "}
                    <span className={classes.numberOfReviews}>
                      ( {numberOfReviewers} reviews)
                    </span>
                  </span>
                </Grid>
              )}
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Grid className={classes.boxPrice}>
                {discount !== 0 && (
                  <span>
                    {fCurrency2((price * (100 - discount)) / 100)} VND
                  </span>
                )}
                <p>{fCurrency2(price)} VND</p>
              </Grid>
              <Grid className={classes.boxViewMore}>
                <p>View more</p>
                <FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
);

export default ListServices;
