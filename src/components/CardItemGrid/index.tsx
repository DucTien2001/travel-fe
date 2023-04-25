import React, { memo } from "react";
import Link from "next/link";
// reactstrap components
import { Card, CardTitle, CardBody, Col, Badge } from "reactstrap";
import clsx from "clsx";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import Stars from "components/Stars";
import { fCurrency2, fCurrency2VND } from "utils/formatNumber";
import useAuth from "hooks/useAuth";
import IconMain from "components/common/icons/IconMain";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faChevronLeft,
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
  checkInTime?: string;
  checkOutTime?: string;
  contact?: string;
  city?: string;
  district?: string;
  commune?: string;
  rate?: number;
  price?: number;
  discount?: number;
  isTemporarilyStopWorking?: boolean;
  isDelete?: boolean;
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
    contact,
    checkInTime,
    checkOutTime,
    city,
    district,
    commune,
    rate,
    price,
    discount,
    isTemporarilyStopWorking,
    isDelete,
    numberOfReviewers,
  }: Props) => {
    const { user } = useAuth();
    return (
      <>
        <Col
          xs={4}
          className={clsx(
            { [classes.stopWorking]: isTemporarilyStopWorking || isDelete },
            classes.cardItem,
            className
          )}
          key={id}
        >
          <Link href={`/${linkView}/:${id}`}>
            <a>
              <Grid
                sx={{
                  boxShadow: "var(--box-shadow-100)",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                <Grid className={classes.boxImg}>
                  <img src={src}></img>
                </Grid>
                <Grid
                  sx={{
                    padding: "10px 14px",
                    backgroundColor: "var(--white-color)",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    boxShadow: "var(--bui-shadow-100)",
                    minHeight: "225px",
                    flexGrow: "1",
                  }}
                >
                  <Grid className={classes.boxLocation}>
                    <FontAwesomeIcon icon={faSignsPost}></FontAwesomeIcon>
                    <div>
                      <p>
                        {commune}, {district}, {city}
                      </p>
                    </div>
                  </Grid>
                  <Grid className={classes.boxTitle}>
                    <p>{title}</p>
                  </Grid>
                  <Grid sx={{ paddingTop: "28px" }}>
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
            </a>
          </Link>
        </Col>
      </>
    );
  }
);

export default ListServices;
