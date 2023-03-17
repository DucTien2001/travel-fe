import React, { memo, useEffect, useMemo, useState } from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import SectionHeader from "components/Header/SectionHeader";
import { ReducerType } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { HotelService } from "services/normal/hotel";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import PopupCheckReview from "components/Popup/PopupCheckReview";
import {
  Collapse,
  Grid,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
} from "@mui/material";
import QontoStepIcon from "components/QontoStepIcon";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import {
  Restaurant,
  Wifi,
  ReceiptLong,
  AccessTime,
  Receipt,
  Person,
  Email,
  Phone,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button, { BtnType } from "components/common/buttons/Button";
import { fCurrency2VND } from "utils/formatNumber";
import { IUserInformationBookRoom } from "redux/reducers/Normal";
import { sumPrice } from "utils/totalPrice";
import moment from "moment";
import { PAYMENT_HOTEL_SECTION } from "models/payment";

interface Props {
  userInformation?: IUserInformationBookRoom;
}
const Review = memo(({ userInformation }: Props) => {
  const { roomBillConfirm } = useSelector((state: ReducerType) => state.normal);

  const [open, setOpen] = useState(true);
  const [readMore, setReadMore] = useState(false);

  const totalPrice = [];

  roomBillConfirm?.rooms.forEach((room) => {
    room?.priceDetail.map((price) => {
      const _price =
        (price?.price * room?.amount * (100 - room?.discount)) / 100;
      totalPrice.push(_price);
    });
  });

  return (
    <Grid component="form">
      <Container>
        <Grid
          container
          spacing={2}
          className={classes.rootContent}
          id={PAYMENT_HOTEL_SECTION.REVIEW}
        >
          <Grid xs={8} item className={classes.leftPanel}>
            <Grid container item spacing={2}>
              <Grid item xs={12}>
                <h4 className={classes.title}>Please Review Your Booking </h4>
                <p className={classes.subTitle}>
                  Please review your booking details before continuing to
                  payment
                </p>

                <Grid
                  sx={{
                    backgroundColor: "var(--white-color)",
                    padding: "24px 16px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
                    borderRadius: "10px",
                  }}
                >
                  <Grid
                    container
                    sx={{
                      paddingBottom: "16px",
                      borderBottom: "1px solid var(--gray-20)",
                    }}
                  >
                    <Grid item xs={3} className={classes.boxImgHotel}>
                      <img
                        src={roomBillConfirm?.hotel?.images[0]}
                        alt="anh"
                      ></img>
                    </Grid>
                    <Grid item xs={9}>
                      <Grid className={classes.boxProductName}>
                        <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon>
                        <p>{roomBillConfirm?.hotel?.name}</p>
                      </Grid>
                      <Grid container spacing={2} sx={{ paddingTop: "16px" }}>
                        <Grid item xs={4} className={classes.boxInforTime}>
                          <p className={classes.textTitle}>Check-in</p>
                          <p className={classes.textDate}>
                            {moment(roomBillConfirm?.startDate).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                          <p className={classes.textTime}>
                            From {roomBillConfirm?.hotel?.checkInTime}
                          </p>
                        </Grid>
                        <Grid item xs={4} className={classes.boxInforTime}>
                          <p className={classes.textTitle}>Check-out</p>
                          <p className={classes.textDate}>
                            {moment(roomBillConfirm?.endDate).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                          <p className={classes.textTime}>
                            Before {roomBillConfirm?.hotel?.checkOutTime}
                          </p>
                        </Grid>
                        <Grid item xs={4} className={classes.boxInforTime}>
                          <p className={classes.textTitle}>Duration</p>
                          <p className={classes.textDate}>1 Night</p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {roomBillConfirm?.rooms.map((room, index) => (
                    <Grid sx={{ paddingTop: "16px" }} key={index}>
                      <Grid className={classes.boxNameRoom}>
                        <p>{room?.title}</p>
                      </Grid>
                      <Grid container sx={{ paddingTop: "16px" }}>
                        <Grid xs={6} item>
                          <Grid className={classes.boxInfoPerson} container>
                            <Grid item xs={6}>
                              <p>Guest per room</p>
                            </Grid>
                            <Grid item xs={6}>
                              <span>2 Guest(s)</span>
                            </Grid>
                          </Grid>
                          <Grid className={classes.boxInfoPerson} container>
                            <Grid item xs={6}>
                              <p>Number of bed</p>
                            </Grid>{" "}
                            <Grid>
                              <span>{room?.numberOfBed} bed(s)</span>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid xs={6} item>
                          <Grid container>
                            <Grid item xs={4} className={classes.boxImgRoom}>
                              <img src={images.bgUser.src} alt="anh"></img>
                            </Grid>
                            <Grid item sx={{ paddingLeft: "14px" }} xs={8}>
                              <Grid className={classes.boxService}>
                                <Restaurant /> <p>Free breakfast</p>
                              </Grid>
                              <Grid className={classes.boxService}>
                                <Wifi /> <p>Free wifi</p>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  sx={{
                    backgroundColor: "var(--white-color)",
                    padding: "24px 16px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
                    borderRadius: "10px",
                  }}
                >
                  <Grid
                    sx={{
                      paddingBottom: "6px",
                      borderBottom: "1px solid var(--gray-20)",
                    }}
                  >
                    <h5 className={classes.title}>Hotel & Room Policy</h5>
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "14px",
                      alignContent: "flex-end",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpen(!open)}
                  >
                    <Grid className={classes.boxSubTitle}>
                      <ReceiptLong />
                      <p>Cancellation & Reschedule Policy</p>
                    </Grid>
                    <Grid>
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Grid>
                  </Grid>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Grid className={classes.boxContentPolicy}>
                      <p>
                        This reservation is non-refundable & non-reschedulable.
                      </p>
                    </Grid>
                  </Collapse>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  sx={{
                    backgroundColor: "var(--white-color)",
                    padding: "24px 16px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
                    borderRadius: "10px",
                  }}
                >
                  <Grid
                    sx={{
                      paddingBottom: "6px",
                      borderBottom: "1px solid var(--gray-20)",
                    }}
                  >
                    <h5 className={classes.title}>Accommodation Policies</h5>
                  </Grid>
                  <Grid>
                    <Grid className={classes.boxSubTitlePolicy}>
                      <AccessTime />
                      <Grid xs={8}>
                        <Grid sx={{ paddingBottom: "8px" }}>
                          <p>Check-in/Check-out Time</p>
                        </Grid>
                        <Grid
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Grid container>
                            <Grid item xs={6}>
                              <p className={classes.textCheck}>Check-in:</p>
                            </Grid>
                            <Grid item xs={6}>
                              <p>From {roomBillConfirm?.hotel?.checkInTime}</p>
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Grid item xs={6}>
                              <p className={classes.textCheck}>Check-out:</p>
                            </Grid>
                            <Grid item xs={6}>
                              <p>
                                Before {roomBillConfirm?.hotel?.checkOutTime}
                              </p>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid className={classes.boxSubTitlePolicy}>
                      <Receipt />
                      <Grid xs={11}>
                        <Grid sx={{ padding: "4px 0 8px 0" }}>
                          <p>Required Documents</p>
                        </Grid>
                        <Collapse in={readMore} timeout="auto" unmountOnExit>
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <p className={classes.textContentPolicy}>
                              Whether you are a couple looking for a romantic
                              getaway or a family seeking for a beach holiday
                              trip, our hotel constitutes a perfect holiday
                              option for enjoying Danang lifestyle and
                              experiencing its unique glamor. Enjoy the most
                              memorable nights with your loved one by staying at
                              Seashore Hotel & Apartment. With Son Tra Mountain
                              on the side and Man Thai Beach on the opposite,
                              taking in the views from room’s windows or soaking
                              up the sun at the top swimming pool will leave a
                              lasting impression on all of our guests. Extra
                              charge for children: - Children under 6 years old
                              will: FREE - Children from 6 - 11 years old and
                              sharing the same bed with parents will be charged
                              extra breakfast at VND 150,000/night/pax. -
                              Children from 12 years and over are considered as
                              adults, compulsory extra bed is required VND
                              300,000/night/pax. Extra bed is subject to
                              availability upon check-in
                            </p>
                          </Grid>
                        </Collapse>
                      </Grid>
                    </Grid>
                    <Grid
                      className={classes.boxSeeMore}
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? <p>Read All</p> : <p>Read Less</p>}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <h4 className={classes.title}>Price Detail</h4>
                <Grid
                  sx={{
                    backgroundColor: "var(--white-color)",
                    padding: "24px 16px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
                    borderRadius: "10px",
                  }}
                >
                  <Grid
                    className={classes.boxPrice}
                    sx={{ borderBottom: "1px solid Var(--gray-10)" }}
                    onClick={() => setOpen(!open)}
                  >
                    <Grid>
                      {" "}
                      <p className={classes.titlePrice}>Total</p>
                    </Grid>
                    <Grid className={classes.priceTotal}>
                      <h4 className={classes.price}>
                        {fCurrency2VND(sumPrice(totalPrice))} VND
                      </h4>
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Grid>
                  </Grid>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Grid className={classes.boxPriceDetail}>
                      {roomBillConfirm?.rooms.map((room, index) => (
                        <Grid sx={{ padding: "0 0 14px 0" }} key={index}>
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p>{room?.title} </p>

                            {room?.priceDetail.map((price, index) => (
                              <p key={index}>
                                {fCurrency2VND(
                                  (price?.price *
                                    room?.amount *
                                    (100 - room?.discount)) /
                                    100
                                )}{" "}
                                VND
                              </p>
                            ))}
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingTop: "14px",
                    }}
                    className={classes.btnContinue}
                  >
                    <Button btnType={BtnType.Secondary} type="submit">
                      Continue to Pay
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            xs={4}
            item
            sx={{ marginTop: "70px" }}
            className={classes.rightPanel}
          >
            <Grid sx={{ borderRadius: "10px" }}>
              <Grid className={classes.boxContactDetail}>
                <Grid
                  sx={{
                    padding: "16px",
                    borderBottom: "1px solid var(--gray-20)",
                  }}
                >
                  <h5 className={classes.title}>Contact Details</h5>
                </Grid>
                <Grid sx={{ padding: "16px" }}>
                  <Grid className={classes.boxInfoPerson}>
                    <Person />
                    <p>
                      {userInformation?.lastName} {userInformation?.firstName}
                    </p>
                  </Grid>
                  <Grid className={classes.boxInfoPerson}>
                    <Email />
                    <p>{userInformation?.email}</p>
                  </Grid>
                  <Grid className={classes.boxInfoPerson}>
                    <Phone />
                    <p>+ {userInformation?.phoneNumber}</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={classes.boxContactDetail}>
                <Grid
                  sx={{
                    padding: "16px",
                    borderBottom: "1px solid var(--gray-20)",
                  }}
                >
                  <h5 className={classes.title}>Guest Details</h5>
                </Grid>
                <Grid sx={{ padding: "16px" }}>
                  <Grid
                    className={classes.boxInfoGuest}
                    sx={{ paddingBottom: "14px" }}
                  >
                    <p className={classes.guestTitle}>Gest Name</p>
                    <p>
                      {userInformation?.lastName} {userInformation?.firstName}
                    </p>
                  </Grid>
                  <Grid className={classes.boxInfoGuest}>
                    <p className={classes.guestTitle}>Special Request</p>
                    {userInformation?.specialRequest ? (
                      <p>{userInformation?.specialRequest}</p>
                    ) : (
                      <p>-</p>
                    )}
                  </Grid>
                  <Grid className={classes.boxAdvice}>
                    <p>
                      Special requests are subject to availability and are not
                      guaranteed. Some requests may incur charges.
                    </p>
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

export default Review;
