import React, { memo, useEffect, useState, useMemo } from "react";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Container, Form } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { TourService } from "services/normal/tour";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import {
  Collapse,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Button, { BtnType } from "components/common/buttons/Button";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faCircleCheck,
  faCalendarDays,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import InputTextField from "components/common/inputs/InputTextfield";
import { VALIDATION } from "configs/constants";
import UseAuth from "hooks/useAuth";
import { setConfirmBookTourReducer } from "redux/reducers/Normal/actionTypes";
import { UserService } from "services/user";
import * as yup from "yup";

import PopupDetailTour from "pages/listTour/[tourId]/components/SectionTour/components/PopupDetailTour";
import { BookTourReview, Tour } from "models/tour";
import { ReducerType } from "redux/reducers";
import moment from "moment";
import { fCurrency2VND, fPercent, fShortenNumber } from "utils/formatNumber";
import _ from "lodash";
import {
  DataPagination,
  EDiscountType,
  EServicePolicyType,
} from "models/general";
import { FindAll, GetVoucherValue, Voucher } from "models/voucher";
import { VoucherService } from "services/normal/voucher";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PopupVoucher from "../PopopVoucher";
import InputTextfield from "components/common/inputs/InputTextfield";
import Toggle from "components/common/Switch";
import { EventService } from "services/normal/event";
import { IEvent } from "models/event";
import ErrorMessage from "components/common/texts/ErrorMessage";

const CHARACTER_LIMIT = 100;

export enum EStep {
  BOOKING,
  REVIEW,
  PAYMENT,
}
export interface BookForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  tourId: number;
  tourOnSaleId: number;
  price: number;
  discount: number;
  totalBill: number;
  numberOfAdult: number;
  numberOfChild: number;
  priceOfChild: number;
  priceOfAdult: number;
  startDate: Date;
  specialRequest?: string;
}
interface Props {
  onSubmit?: (data: BookTourReview) => void;
}
// eslint-disable-next-line react/display-name
const BookingComponent = memo(({ onSubmit }: Props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));
  const { user } = UseAuth();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { confirmBookTour } = useSelector((state: ReducerType) => state.normal);

  const [tour, setTour] = useState<Tour>();
  const [openPopupDetailTour, setOpenPopupDetailTour] = useState(false);
  const [openPopupVoucher, setOpenPopupVoucher] = useState(false);
  const [voucher, setVoucher] = useState<DataPagination<Voucher>>();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [voucherChoose, setVoucherChoose] = useState({
    discountType: null,
    voucherValue: 0,
  });
  const [addCoupon, setAddCoupon] = useState(false);
  const [inputValueCode, setInputValueCode] = useState(null);
  const [valueEvent, setValueEvent] = useState<IEvent>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);
  const [isErrorUseEvent, setIsErrorUseEvent] = useState(false);

  const policyRefund = useMemo(() => {
    return [];
  }, [tour]);

  const schema = useMemo(() => {
    return yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      phoneNumber: yup
        .string()
        .required("Phone is required")
        .matches(VALIDATION.phone, {
          message: "Please enter a valid phone number.",
          excludeEmptyString: true,
        }),
      specialRequest: yup.string().notRequired(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<BookForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onOpenPopupDetailTour = () =>
    setOpenPopupDetailTour(!openPopupDetailTour);

  const onOpenPopupVoucher = () => setOpenPopupVoucher(!openPopupVoucher);

  const _onSubmit = (data: BookForm) => {
    onSubmit({
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      tourId: tour?.id,
      tourOnSaleId: confirmBookTour?.tourOnSaleId,
      price: confirmBookTour?.totalPrice,
      discount:
        voucherChoose?.discountType === EDiscountType.PERCENT
          ? voucherChoose?.voucherValue <= 100
            ? confirmBookTour?.discount + voucherChoose?.voucherValue
            : confirmBookTour?.totalPrice -
              (confirmBookTour?.totalPrice *
                (100 - confirmBookTour?.discount)) /
                100 +
              voucherChoose?.voucherValue
          : confirmBookTour?.totalPrice -
            (confirmBookTour?.totalPrice * (100 - confirmBookTour?.discount)) /
              100 +
            voucherChoose?.voucherValue,
      totalBill:
        voucherChoose?.discountType === EDiscountType.PERCENT
          ? voucherChoose.voucherValue <= 100
            ? (((confirmBookTour?.totalPrice *
                (100 - confirmBookTour?.discount)) /
                100) *
                (100 - voucherChoose.voucherValue)) /
              100
            : (confirmBookTour?.totalPrice *
                (100 - confirmBookTour?.discount)) /
                100 -
              voucherChoose.voucherValue
          : (confirmBookTour?.totalPrice * (100 - confirmBookTour?.discount)) /
              100 -
            voucherChoose.voucherValue,
      numberOfAdult: confirmBookTour?.amountAdult,
      numberOfChild: confirmBookTour?.amountChildren,
      startDate: confirmBookTour?.startDate,
      specialRequest: data?.specialRequest,
      priceOfChild: confirmBookTour?.priceChildren,
      priceOfAdult: confirmBookTour?.priceAdult,
    });
  };

  const specialRequest = watch("specialRequest");

  const maxDateRefund = Math.max.apply(Math, policyRefund);

  const dateBookTour = new Date();
  dateBookTour.setDate(dateBookTour.getDate() + maxDateRefund);

  const fetchVoucher = (value?: {
    take?: number;
    page?: number;
    keyword?: string;
    owner?: number;
  }) => {
    const params: FindAll = {
      take: value?.take || voucher?.meta?.take || 10,
      page: value?.page || voucher?.meta?.page || 1,
      keyword: undefined,
      owner: confirmBookTour?.owner,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    VoucherService.getAllVouchers(params)
      .then((res) => {
        setVoucher({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  const onGetVoucher = (data: GetVoucherValue) => {
    setVoucherChoose({
      discountType: data?.discountType,
      voucherValue: data?.voucherValue,
    });
  };

  const handleValidVoucher = (startTime) => {
    var bookDate = new Date();
    let isValid = false;
    if (bookDate < new Date(startTime)) {
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  };

  const onUseCoupon = () => {
    dispatch(setLoading(true));
    EventService.findByCode(inputValueCode)
      .then((res) => {
        setValueEvent(res?.data);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    console.log(valueEvent, "value");
  }, [valueEvent]);

  useEffect(() => {
    tour?.tourPolicies.forEach((item) => {
      if (item.policyType === EServicePolicyType.REFUND)
        policyRefund.push(item.dayRange);
    });
  }, [tour]);

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
    if (user) {
      UserService.getUserProfile(user?.id)
        .then((res) => {
          reset({
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            phoneNumber: res.phoneNumber,
          });
        })
        .catch((err) => dispatch(setErrorMess(err)))
        .finally(() => dispatch(setLoading(false)));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);

  useEffect(() => {
    setTotalPrice(
      (confirmBookTour?.totalPrice * (100 - confirmBookTour?.discount)) / 100
    );
  }, [confirmBookTour]);

  // useEffect(() => {
  //   if (voucherChoose?.discountType === EDiscountType.PERCENT) {
  //     if (voucherChoose?.voucherValue <= 100) {
  //       if (valueEvent) {
  //         if (totalPrice < valueEvent?.minOrder) {
  //           setIsErrorUseEvent(true);
  //         } else {
  //           if (valueEvent.discountType === EDiscountType.PERCENT) {
  //             if (valueEvent?.maxDiscount === 0) {
  //               setTotalFinal(
  //                 (((totalPrice * (100 - voucherChoose?.voucherValue)) / 100) *
  //                   (100 - valueEvent?.discountValue)) /
  //                   100
  //               );
  //             } else {
  //               setTotalFinal(
  //                 (totalPrice * (100 - voucherChoose?.voucherValue)) / 100 -
  //                   valueEvent?.maxDiscount
  //               );
  //             }
  //           } else {
  //             setTotalFinal(
  //               (totalPrice * (100 - voucherChoose?.voucherValue)) / 100 -
  //                 valueEvent?.discountValue
  //             );
  //           }
  //         }
  //       } else {
  //         setTotalFinal(
  //           (totalPrice * (100 - voucherChoose?.voucherValue)) / 100
  //         );
  //       }
  //     } else {
  //       setTotalFinal(totalPrice - voucherChoose?.voucherValue);
  //     }
  //   } else {
  //     setTotalFinal(totalPrice - voucherChoose?.voucherValue);
  //   }
  // }, [voucherChoose, totalPrice, valueEvent]);
  useEffect(() => {
    if (
      voucherChoose?.discountType === EDiscountType.PERCENT ||
      (valueEvent && valueEvent?.discountType === EDiscountType.PERCENT)
    ) {
      if (voucherChoose?.voucherValue <= 100 || valueEvent?.maxDiscount === 0) {
        setTotalFinal(
          totalPrice *
            (100 - voucherChoose?.voucherValue) *
            (100 - valueEvent?.discountValue)
        );
      } else if (
        voucherChoose?.voucherValue > 100 ||
        valueEvent?.maxDiscount !== 0
      ) {
        setTotalFinal(
          totalPrice - voucherChoose?.voucherValue - valueEvent?.discountValue
        );
      }
    }
    if (
      voucherChoose?.discountType !== EDiscountType.PERCENT ||
      (valueEvent && valueEvent?.discountType !== EDiscountType.PERCENT)
    ) {
      setTotalFinal(
        totalPrice - voucherChoose?.voucherValue - valueEvent?.discountValue
      );
    }
    if (!voucherChoose && !valueEvent) {
      setTotalFinal(totalPrice);
    }
  }, [voucherChoose, totalPrice, valueEvent]);

  useEffect(() => {
    fetchVoucher();
  }, []);

  return (
    <>
      <Grid component="form" onSubmit={handleSubmit(_onSubmit)}>
        <Container>
          <Grid container spacing={2} className={classes.rootContent}>
            <Grid xs={7} item className={classes.leftPanel}>
              <Grid container item spacing={2}>
                <Grid item xs={12}>
                  <h4 className={classes.title}>Contact Details</h4>
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
                      columnSpacing={isMobile ? 0 : 1}
                      rowSpacing={3}
                    >
                      <Grid item xs={12} sm={6}>
                        <InputTextField
                          title="First name"
                          placeholder="First Name"
                          inputRef={register("firstName")}
                          startAdornment={
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                          }
                          errorMessage={errors?.firstName?.message}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputTextField
                          title="Last name"
                          placeholder="Last Name"
                          inputRef={register("lastName")}
                          startAdornment={
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                          }
                          errorMessage={errors?.lastName?.message}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <InputTextField
                        title="Email"
                        placeholder="Email"
                        inputRef={register("email")}
                        startAdornment={
                          <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                        }
                        errorMessage={errors?.email?.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputTextField
                        title="Phone"
                        placeholder="Phone"
                        inputRef={register("phoneNumber")}
                        startAdornment={
                          <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                        }
                        errorMessage={errors?.phoneNumber?.message}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.title}>Special Request</h4>
                  <Grid
                    sx={{
                      backgroundColor: "var(--white-color)",
                      padding: "24px 16px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
                      borderRadius: "10px",
                    }}
                  >
                    <p>
                      Special requests cannot be guaranteed – but the property
                      will do its best to meet your needs. You can always make a
                      special request after your booking is complete!
                    </p>
                    <InputTextfield
                      title="Please write your requests"
                      optional
                      multiline
                      rows={3}
                      infor={`${
                        specialRequest?.length || 0
                      }/${CHARACTER_LIMIT}`}
                      inputRef={register("specialRequest")}
                      inputProps={{
                        maxLength: CHARACTER_LIMIT,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.title}>Location Detail</h4>
                  <Grid
                    sx={{
                      backgroundColor: "var(--white-color)",
                      padding: "24px 16px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
                      borderRadius: "10px",
                    }}
                  >
                    <p>
                      {tour?.moreLocation}, {tour?.commune.name},
                      {tour?.district.name}, {tour?.city.name}
                    </p>
                    <Grid className={classes.mabBox}></Grid>
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
                      cursor: "pointer",
                    }}
                  >
                    <Grid
                      className={classes.boxPrice}
                      sx={{ borderBottom: "1px solid Var(--gray-10)" }}
                      onClick={() => setOpenCollapse(!openCollapse)}
                    >
                      <Grid>
                        {" "}
                        <p className={classes.titlePrice}>Price you pay</p>
                      </Grid>
                      <Grid sx={{ display: "flex", alignItems: "center" }}>
                        <h4 className={classes.price}>
                          {/* {voucherChoose?.discountType === EDiscountType.PERCENT
                            ? voucherChoose.voucherValue <= 100
                              ? valueEvent?.discountType ===
                                EDiscountType.PERCENT
                                ? fCurrency2VND(
                                    (((((confirmBookTour?.totalPrice *
                                      (100 - confirmBookTour?.discount)) /
                                      100) *
                                      (100 - voucherChoose.voucherValue)) /
                                      100) *
                                      (100 - valueEvent?.discountValue)) /
                                      100
                                  )
                                : fCurrency2VND(
                                    (((confirmBookTour?.totalPrice *
                                      (100 - confirmBookTour?.discount)) /
                                      100) *
                                      (100 - voucherChoose.voucherValue)) /
                                      100 -
                                      valueEvent?.discountValue
                                  )
                              : (confirmBookTour?.totalPrice *
                                  (100 - confirmBookTour?.discount)) /
                                  100 -
                                voucherChoose.voucherValue
                            : fCurrency2VND(
                                (confirmBookTour?.totalPrice *
                                  (100 - confirmBookTour?.discount)) /
                                  100 -
                                  voucherChoose.voucherValue
                              )} */}
                          {fCurrency2VND(totalFinal)}
                          VND
                        </h4>
                        {openCollapse ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </Grid>
                    </Grid>
                    <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                      <Grid className={classes.boxPriceDetail}>
                        {confirmBookTour?.discount !== 0 && (
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p>Discount</p>
                            <p> {fCurrency2VND(confirmBookTour?.discount)} %</p>
                          </Grid>
                        )}
                        <Grid
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p>Adult ({confirmBookTour?.amountAdult}x)</p>
                          <p>
                            {" "}
                            {fCurrency2VND(confirmBookTour?.priceAdult)} VND
                          </p>
                        </Grid>
                        {confirmBookTour?.amountChildren !== 0 && (
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p>Child ({confirmBookTour?.amountChildren}x)</p>
                            <p>
                              {" "}
                              {fCurrency2VND(
                                confirmBookTour?.priceChildren
                              )}{" "}
                              VND
                            </p>
                          </Grid>
                        )}
                      </Grid>
                    </Collapse>
                    <Grid className={classes.containerVoucher}>
                      <Grid className={classes.titleVoucher}>
                        <MonetizationOnIcon />
                        <p>Our discount code</p>
                      </Grid>
                      <Grid sx={{ display: "flex", paddingTop: "14px" }}>
                        {voucher?.data?.length &&
                          voucher?.data?.map((item, index) => (
                            <Grid key={index}>
                              {item?.discountType === EDiscountType.PERCENT ? (
                                <Grid
                                  className={clsx(classes.boxVoucher, {
                                    [classes.boxVoucherInValid]:
                                      handleValidVoucher(item?.startTime),
                                  })}
                                >
                                  <span>
                                    Deal {fPercent(item?.discountValue)}
                                  </span>
                                  {item?.maxDiscount !== 0 && (
                                    <span>
                                      Max {fCurrency2VND(item?.maxDiscount)} VND
                                    </span>
                                  )}
                                </Grid>
                              ) : (
                                <Grid
                                  className={clsx(classes.boxVoucher, {
                                    [classes.boxVoucherInValid]:
                                      handleValidVoucher(item?.startTime),
                                  })}
                                >
                                  Deal {fShortenNumber(item?.discountValue)} VND
                                </Grid>
                              )}
                            </Grid>
                          ))}
                      </Grid>
                      <Grid
                        className={classes.btnChooseVoucher}
                        onClick={onOpenPopupVoucher}
                      >
                        <p>Choose the voucher</p>
                      </Grid>
                    </Grid>
                    <Grid>
                      <FormGroup>
                        <FormControlLabel
                          className={classes.boxToggle}
                          control={
                            <Toggle
                              checked={addCoupon}
                              onChange={() => setAddCoupon(!addCoupon)}
                            />
                          }
                          label="Add Coupon"
                        />
                      </FormGroup>
                      {addCoupon && (
                        <Grid
                          className={classes.inputCoupon}
                          container
                          spacing={2}
                        >
                          <Grid item xs={8}>
                            <InputTextfield
                              placeholder="Example: CHEAPTRAVEL"
                              type="text"
                              onChange={(e) =>
                                setInputValueCode(e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              btnType={BtnType.Primary}
                              className={classes.btnUseCoupon}
                              onClick={onUseCoupon}
                            >
                              Use Coupon
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                      {isErrorUseEvent && (
                        <ErrorMessage>
                          Your order must be larger{" "}
                          {fCurrency2VND(valueEvent?.minOrder)} VND
                        </ErrorMessage>
                      )}
                    </Grid>
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingTop: "14px",
                      }}
                      className={classes.btnContinue}
                    >
                      <Button btnType={BtnType.Primary} type="submit">
                        Continue to Review
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              xs={5}
              item
              sx={{ marginTop: "40px" }}
              className={classes.rightPanel}
            >
              <Grid className={classes.rootPanelRight}>
                <Grid className={classes.boxTitle}>
                  <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                  <p>Booking summary</p>
                </Grid>
                <Grid className={classes.boxProduct}>
                  <Grid>
                    <p>{tour?.title}</p>
                  </Grid>
                  <Grid className={classes.product}>
                    <img src={tour?.images[0]} alt="anh"></img>
                    <p onClick={onOpenPopupDetailTour}>View detail</p>
                  </Grid>
                </Grid>
                <Grid className={classes.boxInfoPerson}>
                  <Grid className={classes.information}>
                    <Grid>
                      <span>Visit date</span>
                    </Grid>
                    <Grid>
                      <p>
                        {moment(confirmBookTour?.startDate).format(
                          "dddd, MMMM Do YYYY"
                        )}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid className={classes.information}>
                    <Grid>
                      <span>Total visitors</span>
                    </Grid>
                    <Grid>
                      <p>Adult: {confirmBookTour?.amountAdult}</p>
                      <p>Child: {confirmBookTour?.amountChildren}</p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.boxTip}>
                  <Grid className={classes.tip}>
                    <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
                    <p>
                      Valid on{" "}
                      <span className={classes.tipBold}>
                        {moment(confirmBookTour?.startDate).format(
                          "MMMM Do YY"
                        )}
                      </span>
                    </p>
                  </Grid>
                  <Grid className={clsx(classes.tipRequest, classes.tip)}>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <p>No Reservation Needed</p>
                  </Grid>
                  <Grid className={clsx(classes.tipRequest, classes.tip)}>
                    <FontAwesomeIcon icon={faRotateLeft}></FontAwesomeIcon>
                    <p>
                      Refundable until{" "}
                      <span className={classes.tipBold}>
                        {moment(dateBookTour).format("MMM Do YY")}
                      </span>
                    </p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={classes.btnContinueMobile}>
                <Button btnType={BtnType.Secondary} type="submit">
                  Continue to Review
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <PopupDetailTour
        isOpen={openPopupDetailTour}
        toggle={onOpenPopupDetailTour}
        tour={tour}
      />
      <PopupVoucher
        isOpen={openPopupVoucher}
        toggle={onOpenPopupVoucher}
        voucher={voucher?.data}
        totalBill={
          (confirmBookTour?.totalPrice * (100 - confirmBookTour?.discount)) /
          100
        }
        onGetVoucher={onGetVoucher}
      />
    </>
  );
});

export default BookingComponent;
