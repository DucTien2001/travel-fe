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
  businessHours?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  location: string;
  locationDetail?: string;
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
    locationDetail,
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
              {/* <Card
                className={clsx(
                  "card-pricing card-background",
                  classes.cardImage
                )}
                style={{ backgroundImage: `url(${src})` }}
              >
                <CardBody className={classes.cardBody}>
                  <div
                    className={
                      discount ? classes.discountWrapper : classes.noDiscount
                    }
                  >
                    <span className={classes.percent}>{discount}%</span>
                    <span className={classes.discount}>DISCOUNT</span>
                  </div>
                  <h5 className={clsx("category", classes.title)}>
                    {title}
                    {roomNumber} - {location}
                  </h5>
                  <Stars numberOfStars={rate} />
                  {!!tags?.length && (
                    <div className={classes.tags}>
                      {tags?.map((item, index) => (
                        <Badge pill color="var(--primary-color)" key={index}>
                          {item}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p>{businessHours}</p>
                  {checkInTime && (
                    <p>
                      {checkInTime} - {checkOutTime}
                    </p>
                  )}
                  {price && (
                    <CardTitle tag="h3" className={classes.priceTitle}>
                      {fCurrency2VND(price)} VND{" "}
                      <span className={classes.textPer}>/ person</span>
                    </CardTitle>
                  )}

                  <div className={classes.btnControlCard}>
                    <Link href={`/${linkView}/:${id}`}>
                      <a>
                        <Button
                          className={clsx("btn-round", classes.btnView)}
                          btnType={
                            isHotel ? BtnType.Secondary : BtnType.Primary
                          }
                          disabled={isTemporarilyStopWorking}
                        >
                          View more
                        </Button>
                      </a>
                    </Link>
                    {user ? (
                      <Link href={`/${linkBook}/:${id}`}>
                        <a>
                          <Button
                            className={
                              isHotel
                                ? clsx("btn-round", classes.isHotel)
                                : clsx("btn-round")
                            }
                            btnType={BtnType.Secondary}
                            disabled={isTemporarilyStopWorking}
                          >
                            Book now
                          </Button>
                        </a>
                      </Link>
                    ) : (
                      <Link href={`/auth/login`}>
                        <a>
                          <Button
                            className={
                              isHotel
                                ? clsx("btn-round", classes.isHotel)
                                : clsx("btn-round")
                            }
                            btnType={BtnType.Secondary}
                            disabled={isTemporarilyStopWorking}
                          >
                            Book now
                          </Button>
                        </a>
                      </Link>
                    )}
                  </div>
                  {rate !== 0 && !isHotel && (
                    <div className={classes.containerReview}>
                      <div className={classes.boxReview}>
                        <IconMain /> <span>{rate?.toFixed(1)}</span>
                      </div>
                      <span>({numberOfReviewers} reviews)</span>
                    </div>
                  )}
                </CardBody>
              </Card> */}
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
                    Ganh Day Commue Phu Quoc Vinwonder saefesfsfdfe dsade adeda
                    asd ea sda
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
            </a>
          </Link>
        </Col>
      </>
    );
  }
);

export default ListServices;
