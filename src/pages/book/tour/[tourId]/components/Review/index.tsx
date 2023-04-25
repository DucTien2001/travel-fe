import React, { memo, useEffect, useMemo, useState } from "react";
// reactstrap components
import { Container } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import { ReducerType } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { Collapse, Grid } from "@mui/material";
import { ReceiptLong, Person, Email, Phone } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button, { BtnType } from "components/common/buttons/Button";
import { fCurrency2VND } from "utils/formatNumber";
import moment from "moment";
import { PAYMENT_HOTEL_SECTION } from "models/payment";
import { TourService } from "services/normal/tour";
import { Tour } from "models/tour";
import AttractionsIcon from "@mui/icons-material/Attractions";
import _ from "lodash";
import { TourBillService } from "services/normal/tourBill";
interface Props {
  handleChangeStep?: () => void;
}
const Review = memo(({ handleChangeStep }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { confirmBookTourReview } = useSelector(
    (state: ReducerType) => state.normal
  );

  const [open, setOpen] = useState(false);
  const [tour, setTour] = useState<Tour>();

  const policyType = useMemo(() => {
    return _.toArray(_.groupBy(tour?.tourPolicies, "policyType"));
  }, [tour]);

  const onSubmit = () => {
    TourBillService.create({
      tourId: confirmBookTourReview?.tourId,
      tourOnSaleId: confirmBookTourReview?.tourOnSaleId,
      amountChild: confirmBookTourReview.numberOfChild,
      amountAdult: confirmBookTourReview.numberOfAdult,
      price: confirmBookTourReview?.price,
      discount: confirmBookTourReview?.discount,
      totalBill: confirmBookTourReview?.totalBill,
      email: confirmBookTourReview?.email,
      phoneNumber: confirmBookTourReview?.phoneNumber,
      firstName: confirmBookTourReview?.firstName,
      lastName: confirmBookTourReview?.lastName,
    })
      .then((res) => {
        router.push(res?.data?.checkoutUrl);
        handleChangeStep();
      })
      .catch((err) => {
        dispatch(setErrorMess(err));
      });
  };

  useEffect(() => {
    if (router) {
      TourService.getTour(Number(router.query.tourId.slice(1)))
        .then((res) => {
          setTour(res.data);
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (!confirmBookTourReview) {
      router.push(`/listTour/:${tour?.id}`);
    }
  }, [dispatch, confirmBookTourReview]);

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
                    }}
                  >
                    <Grid item xs={3} className={classes.boxImgHotel}>
                      <img src={tour?.images[0]} alt="anh"></img>
                    </Grid>
                    <Grid item xs={9}>
                      <Grid className={classes.boxProductName}>
                        <AttractionsIcon />
                        <p>{tour?.title}</p>
                      </Grid>
                      <Grid className={classes.boxLocation}>
                        <p>
                          {tour?.moreLocation}, {tour?.commune?.name},{" "}
                          {tour?.district?.name}, {tour?.city?.name}
                        </p>
                      </Grid>
                      <Grid container spacing={2} sx={{ paddingTop: "16px" }}>
                        <Grid item xs={4} className={classes.boxInforTime}>
                          <p className={classes.textTitle}>Start date</p>
                          <p className={classes.textDate}>
                            {moment(confirmBookTourReview?.startDate).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                        </Grid>
                        <Grid item xs={4} className={classes.boxInforTime}>
                          <p className={classes.textTitle}>Duration</p>
                          <p className={classes.textDate}>
                            {tour?.numberOfDays} Days - {tour?.numberOfNights}{" "}
                            Nights
                          </p>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
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
                    <h5 className={classes.title}>
                      Cancellation and Reschedule
                    </h5>
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
                    <Grid className={classes.rootOverview}>
                      <Grid className={classes.boxTitle}>
                        <p>Terms and Condition</p>
                      </Grid>
                      <Grid className={classes.boxDuration}>
                        <p className={classes.titleDetail}>
                          - General Infomation:{" "}
                        </p>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: tour?.termsAndCondition,
                          }}
                        ></p>
                      </Grid>
                    </Grid>
                    <Grid className={classes.rootOverview}>
                      <Grid className={classes.boxTitle}>
                        <p>Reschedule & Refund</p>
                      </Grid>
                      <Grid className={classes.boxDuration}>
                        <p className={classes.titleDetail}>
                          - Reschedule Policy:{" "}
                        </p>
                        {policyType[0]?.length ? (
                          <ul>
                            {policyType[0]?.map((item, index) => (
                              <li key={index}>
                                Request a refund at the latest{" "}
                                <span className={classes.titleDetail}>
                                  {item?.dayRange} day(s)
                                </span>{" "}
                                before your selected visit date to get up to{" "}
                                <span className={classes.titleDetail}>
                                  {item?.moneyRate}%{" "}
                                </span>{" "}
                                refund.
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>This booking cannot be rescheduled.</p>
                        )}

                        <p className={classes.titleDetail}>- Refund Policy: </p>
                        {policyType[1]?.length ? (
                          <ul>
                            {policyType[1]?.map((item, index) => (
                              <li key={index}>
                                Request a refund at the latest{" "}
                                <span className={classes.titleDetail}>
                                  {item?.dayRange} day(s)
                                </span>{" "}
                                before your selected visit date to get up to{" "}
                                <span className={classes.titleDetail}>
                                  {item?.moneyRate}%{" "}
                                </span>{" "}
                                refund.
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>This booking cannot be rescheduled.</p>
                        )}
                      </Grid>
                    </Grid>
                  </Collapse>
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
                  >
                    <Grid>
                      {" "}
                      <p className={classes.titlePrice}>
                        Total{" "}
                        {confirmBookTourReview?.discount !== 0 && (
                          <span>(voucher has been applied)</span>
                        )}
                      </p>
                    </Grid>
                    <Grid className={classes.priceTotal}>
                      <h4 className={classes.price}>
                        {fCurrency2VND(confirmBookTourReview?.totalBill)} VND
                      </h4>
                    </Grid>
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    className={classes.boxPriceDetail}
                  >
                    <p>Adult ({confirmBookTourReview?.numberOfAdult}x)</p>
                    <p>
                      {" "}
                      {fCurrency2VND(confirmBookTourReview?.priceOfAdult)} VND
                    </p>
                  </Grid>
                  {confirmBookTourReview?.numberOfChild !== 0 && (
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      className={classes.boxPriceDetail}
                    >
                      <p>Child ({confirmBookTourReview?.numberOfChild}x)</p>
                      <p>
                        {" "}
                        {fCurrency2VND(confirmBookTourReview?.priceOfChild)} VND
                      </p>
                    </Grid>
                  )}
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingTop: "14px",
                    }}
                    className={classes.btnContinue}
                  >
                    <Button btnType={BtnType.Secondary} onClick={onSubmit}>
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
                      {confirmBookTourReview?.lastName}{" "}
                      {confirmBookTourReview?.firstName}
                    </p>
                  </Grid>
                  <Grid className={classes.boxInfoPerson}>
                    <Email />
                    <p>{confirmBookTourReview?.email}</p>
                  </Grid>
                  <Grid className={classes.boxInfoPerson}>
                    <Phone />
                    <p>+ {confirmBookTourReview?.phoneNumber}</p>
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
                      {confirmBookTourReview?.lastName}{" "}
                      {confirmBookTourReview?.firstName}
                    </p>
                  </Grid>
                  <Grid className={classes.boxInfoGuest}>
                    <p className={classes.guestTitle}>Special Request</p>
                    {confirmBookTourReview?.specialRequest ? (
                      <p>{confirmBookTourReview?.specialRequest}</p>
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
