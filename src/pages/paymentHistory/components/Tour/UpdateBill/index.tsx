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
  Grid,
  Link,
  Popover,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import Button, { BtnType } from "components/common/buttons/Button";
import { Controller, useForm } from "react-hook-form";
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
import { ITour } from "redux/reducers/Normal";
import PopupDetailTour from "pages/listTour/[tourId]/components/SectionTour/components/PopupDetailTour";
import { BookTourReview, Tour } from "models/tour";
import { ReducerType } from "redux/reducers";
import moment from "moment";
import {
  fCurrency2,
  fCurrency2VND,
  fPercent,
  fShortenNumber,
} from "utils/formatNumber";
import _ from "lodash";
import {
  DataPagination,
  EDiscountType,
  EPaymentStatus,
  EServicePolicyType,
  OptionItem,
} from "models/general";
import { FindAll, GetVoucherValue, Voucher } from "models/voucher";
import { VoucherService } from "services/normal/voucher";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import InputTextfield from "components/common/inputs/InputTextfield";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { TourBillService } from "services/normal/tourBill";
import { TourBill } from "models/tourBill";
import InputCounter from "components/common/inputs/InputCounter";
import InputSelect from "components/common/inputs/InputSelect";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import PopupVoucher from "pages/book/tour/[tourId]/components/PopopVoucher";
import { use } from "i18next";
var isEmpty = require("lodash.isempty");

const CHARACTER_LIMIT = 100;

const languageOptions = [
  { id: 1, name: "English", value: "English" },
  { id: 2, name: "VietNamese", value: "VietNamese" },
];

interface PriceAndAge {
  tourOnSaleId: number;
  childrenAgeMin: number;
  childrenAgeMax: number;
  priceChildren: number;
  adultPrice: number;
  discount: number;
  quantity: number;
  quantityOrdered: number;
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
  language?: OptionItem;
}

interface Props {
  tourBillId: number;
  onSubmit?: (data: BookTourReview) => void;
}
// eslint-disable-next-line react/display-name
const BookingComponent = memo(({ tourBillId, onSubmit }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));
  const { getSelectChangeDate } = useSelector(
    (state: ReducerType) => state.normal
  );

  const { t, i18n } = useTranslation();
  const [tourBill, setTourBill] = useState<TourBill>(null);
  const [tour, setTour] = useState<Tour>();
  const [openPopupDetailTour, setOpenPopupDetailTour] = useState(false);
  const [openPopupVoucher, setOpenPopupVoucher] = useState(false);
  const [voucher, setVoucher] = useState<DataPagination<Voucher>>();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openCollapseReschedule, setOpenCollapseReschedule] = useState(false);
  const [voucherChoose, setVoucherChoose] = useState({
    discountType: null,
    voucherValue: null,
  });
  const [priceAndAge, setPriceAndAge] = useState<PriceAndAge>({
    tourOnSaleId: null,
    childrenAgeMin: null,
    childrenAgeMax: null,
    priceChildren: null,
    adultPrice: null,
    discount: null,
    quantity: null,
    quantityOrdered: null,
  });
  const [totalBillReschedule, setTotalBillReschedule] = useState(null);
  const [isValidQuantity, setIsValidQuantity] = useState(false);
  const [priceMustPay, setPriceMustPay] = useState(null);

  const dayValid = useMemo(() => {
    return tour?.tourOnSales?.map((item) => {
      return moment(item.startDate).format("DD/MM/YYYY");
    });
  }, [tour]);

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
      startDate: yup.date().required(),
      numberOfAdult: yup.number().notRequired(),
      numberOfChild: yup.number().notRequired(),
      specialRequest: yup.string().notRequired(),
      language: yup
        .object()
        .typeError("Language is required.")
        .shape({
          id: yup.number().required("Language is required"),
          name: yup.string().required(),
          value: yup.string().required(),
        })
        .required(),
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
    defaultValues: {
      language: languageOptions[0],
    },
  });

  const onOpenPopupDetailTour = () =>
    setOpenPopupDetailTour(!openPopupDetailTour);

  const onOpenPopupVoucher = () => setOpenPopupVoucher(!openPopupVoucher);

  const _onSubmit = (data: BookForm) => {
    TourBillService.updateTourBill(tourBill?.id, {
      tourOnSaleId: priceAndAge?.tourOnSaleId,
      amountChild: data?.numberOfChild,
      amountAdult: data?.numberOfAdult,
      price: totalBillReschedule,
      discount: priceAndAge?.discount,
      totalBill: priceMustPay,
      status: EPaymentStatus.PAID,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      firstName: data?.firstName,
      lastName: data?.lastName,
    })
      .then((res) => {
        router.push(res?.data?.checkoutUrl);
      })
      .catch((err) => {
        dispatch(setErrorMess(err));
      });
    console.log({
      tourOnSaleId: priceAndAge?.tourOnSaleId,
      amountChild: data?.numberOfChild,
      amountAdult: data?.numberOfAdult,
      price: totalBillReschedule,
      discount: priceAndAge?.discount,
      totalBill: priceMustPay,
      status: EPaymentStatus.PAID,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      firstName: data?.firstName,
      lastName: data?.lastName,
    });
  };

  const specialRequest = watch("specialRequest");

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
      owner: tour?.owner,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }

    VoucherService.getAllVouchers(params)
      .then((res) => {
        setVoucher({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((err) => {
        dispatch(setErrorMess(err));
      });
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

  const yesterday = moment().subtract(1, "day");

  const disableCustomDt = (current) => {
    return (
      dayValid?.includes(current.format("DD/MM/YYYY")) &&
      current.isAfter(yesterday) &&
      !current.isSame(tourBill?.tourOnSaleData?.startDate)
    );
  };

  const handleChangeStartDate = (e) => {
    tour?.tourOnSales.forEach((item) => {
      if (
        moment(item.startDate).format("DD/MM/YYYY") ===
        moment(e._d).format("DD/MM/YYYY")
      ) {
        setPriceAndAge({
          tourOnSaleId: item?.id,
          childrenAgeMin: item.childrenAgeMin,
          childrenAgeMax: item.childrenAgeMax,
          priceChildren: item.childrenPrice,
          adultPrice: item.adultPrice,
          discount: item.discount,
          quantity: item.quantity,
          quantityOrdered: item.quantityOrdered,
        });
      }
    });
  };

  const _numberOfChild = watch("numberOfChild");
  const _numberOfAdult = watch("numberOfAdult");
  const _startDate = watch("startDate");
  const dateReschedule = new Date();

  useEffect(() => {
    if (tourBillId && !isNaN(Number(tourBillId))) {
      TourBillService.getTourBill(tourBillId)
        .then((res) => {
          setTourBill(res?.data);
        })
        .catch((err) => {
          dispatch(setErrorMess(err));
        });
    }
  }, [tourBillId]);

  useEffect(() => {
    if (_startDate) {
      handleChangeStartDate(_startDate);
    }
  }, [_startDate]);

  useEffect(() => {
    if (!isEmpty(tourBill)) {
      TourService.getTour(tourBill?.tourData?.id)
        .then((res) => {
          setTour(res.data);
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        });
    }
    reset({
      lastName: tourBill?.lastName,
      firstName: tourBill?.firstName,
      email: tourBill?.email,
      phoneNumber: tourBill?.phoneNumber,
      specialRequest: tourBill?.specialRequest,
      startDate: new Date(getSelectChangeDate?.startDate),
      numberOfAdult: tourBill?.amountAdult,
      numberOfChild: tourBill?.amountChild,
    });
  }, [tourBill]);

  useEffect(() => {
    setPriceAndAge({
      tourOnSaleId: getSelectChangeDate?.id,
      childrenAgeMin: getSelectChangeDate?.childrenAgeMin,
      childrenAgeMax: getSelectChangeDate?.childrenAgeMax,
      priceChildren: getSelectChangeDate?.childrenPrice,
      adultPrice: getSelectChangeDate?.adultPrice,
      discount: getSelectChangeDate?.discount,
      quantity: getSelectChangeDate?.quantity,
      quantityOrdered: getSelectChangeDate?.quantityOrdered,
    });
  }, [getSelectChangeDate]);

  useEffect(() => {
    if (!isEmpty(tour)) {
      fetchVoucher();
    }
  }, [tour]);

  useEffect(() => {
    if (
      _numberOfAdult + _numberOfChild >=
      priceAndAge.quantity - priceAndAge.quantityOrdered
    ) {
      setIsValidQuantity(true);
    } else {
      setIsValidQuantity(false);
    }
  }, [priceAndAge, _numberOfAdult, _numberOfChild]);

  useEffect(() => {
    if (priceAndAge?.discount <= 100) {
      setTotalBillReschedule(
        ((_numberOfChild * priceAndAge?.priceChildren +
          _numberOfAdult * priceAndAge?.adultPrice) *
          (100 - priceAndAge?.discount)) /
          100
      );
    } else {
      setTotalBillReschedule(
        _numberOfChild * priceAndAge?.priceChildren +
          _numberOfAdult * priceAndAge?.adultPrice -
          priceAndAge?.discount
      );
    }
  }, [priceAndAge, _numberOfAdult, _numberOfChild]);

  useEffect(() => {
    {
      tour?.tourPolicies.map((item, index) =>
        dateReschedule?.setDate(dateReschedule?.getDate()) <
          new Date(tourBill?.createdAt)?.setDate(
            new Date(tourBill?.createdAt)?.getDate() + item?.dayRange
          ) && item?.policyType === EServicePolicyType.RESCHEDULE
          ? voucherChoose?.discountType === EDiscountType.PERCENT
            ? voucherChoose.voucherValue <= 100
              ? setPriceMustPay(
                  (totalBillReschedule * (100 - voucherChoose.voucherValue)) /
                    100 -
                    tourBill?.totalBill * (item?.moneyRate / 100)
                )
              : setPriceMustPay(
                  totalBillReschedule -
                    voucherChoose.voucherValue -
                    tourBill?.totalBill * (item?.moneyRate / 100)
                )
            : setPriceMustPay(
                totalBillReschedule -
                  voucherChoose.voucherValue -
                  tourBill?.totalBill * (item?.moneyRate / 100)
              )
          : null
      );
    }
  }, [
    tour,
    tourBill,
    totalBillReschedule,
    voucherChoose,
    _numberOfAdult,
    _numberOfChild,
  ]);

  return (
    <>
      <Grid component="form" onSubmit={handleSubmit(_onSubmit)}>
        <Container>
          <Grid container spacing={2} className={classes.rootContent}>
            <Grid xs={7} item className={classes.leftPanel}>
              <Grid container item spacing={2}>
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
                      sx={{
                        borderBottom: "1px solid Var(--gray-10)",
                        paddingBottom: "14px",
                      }}
                      onClick={() => setOpenCollapse(!openCollapse)}
                    >
                      <Grid>
                        {" "}
                        <p className={classes.titlePrice}>
                          Price you pay previously
                        </p>
                      </Grid>
                      <Grid sx={{ display: "flex", alignItems: "center" }}>
                        <h4 className={classes.price}>
                          {fCurrency2VND(tourBill?.totalBill)}
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
                        {tourBill?.discount !== 0 && (
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p>Discount</p>
                            {tourBill?.discount <= 100 ? (
                              <p>{fPercent(tourBill?.discount)} %</p>
                            ) : (
                              <p>{fCurrency2VND(tourBill?.discount)} VND</p>
                            )}
                          </Grid>
                        )}
                        <Grid
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p>Adult ({tourBill?.amountAdult}x)</p>
                        </Grid>
                        {tourBill?.amountChild !== 0 && (
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p>Child ({tourBill?.amountChild}x)</p>
                          </Grid>
                        )}
                      </Grid>
                    </Collapse>
                    <Grid
                      className={classes.boxPrice}
                      sx={{
                        borderBottom: "1px solid Var(--gray-10)",
                        padding: "14px 0",
                      }}
                      onClick={() =>
                        setOpenCollapseReschedule(!openCollapseReschedule)
                      }
                    >
                      <Grid>
                        {" "}
                        <p className={classes.titlePrice}>
                          Price you pay reschedule
                        </p>
                      </Grid>
                      <Grid sx={{ display: "flex", alignItems: "center" }}>
                        <h4 className={classes.price}>
                          {voucherChoose?.discountType === EDiscountType.PERCENT
                            ? voucherChoose.voucherValue <= 100
                              ? fCurrency2VND(
                                  (totalBillReschedule *
                                    (100 - voucherChoose.voucherValue)) /
                                    100
                                )
                              : fCurrency2VND(
                                  totalBillReschedule -
                                    voucherChoose.voucherValue
                                )
                            : fCurrency2VND(
                                totalBillReschedule - voucherChoose.voucherValue
                              )}
                          {/* {totalBillReschedule} */}
                          VND
                        </h4>
                        {openCollapseReschedule ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </Grid>
                    </Grid>
                    <Collapse
                      in={openCollapseReschedule}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Grid className={classes.boxPriceDetail}>
                        {priceAndAge?.discount !== 0 && (
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p>Discount</p>
                            {priceAndAge?.discount <= 100 ? (
                              <p>{fPercent(priceAndAge?.discount)}</p>
                            ) : (
                              <p>{fCurrency2VND(priceAndAge?.discount)} VND</p>
                            )}
                          </Grid>
                        )}
                        <Grid
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p>Adult ({_numberOfAdult}x)</p>
                          <p>
                            {" "}
                            {fCurrency2VND(
                              priceAndAge?.adultPrice * _numberOfAdult
                            )}{" "}
                            VND
                          </p>
                        </Grid>
                        {_numberOfChild !== 0 && (
                          <Grid
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p>Child ({_numberOfChild}x)</p>
                            <p>
                              {" "}
                              {fCurrency2VND(
                                priceAndAge?.priceChildren * _numberOfChild
                              )}{" "}
                              VND
                            </p>
                          </Grid>
                        )}
                      </Grid>
                    </Collapse>
                    <Grid>
                      <Grid className={classes.boxReschedule}>
                        <p>You are reimbursed:</p>
                        {tour?.tourPolicies.map((item, index) =>
                          dateReschedule?.setDate(dateReschedule?.getDate()) <=
                            new Date(tourBill?.createdAt)?.setDate(
                              new Date(tourBill?.createdAt)?.getDate() +
                                item?.dayRange
                            ) &&
                          item?.policyType === EServicePolicyType.RESCHEDULE ? (
                            <p>
                              {fCurrency2VND(
                                tourBill?.totalBill * (item?.moneyRate / 100)
                              )}{" "}
                              VND
                            </p>
                          ) : null
                        )}
                      </Grid>
                      <Grid className={classes.boxReschedule}>
                        <p>You have to pay extra:</p>
                        {/* {tour?.tourPolicies.map((item, index) =>
                          dateReschedule?.setDate(dateReschedule?.getDate()) <
                            new Date(tourBill?.createdAt)?.setDate(
                              new Date(tourBill?.createdAt)?.getDate() +
                                item?.dayRange
                            ) &&
                          item?.policyType === EServicePolicyType.RESCHEDULE ? (
                            <p>
                              {fCurrency2VND(
                                totalBillReschedule -
                                  tourBill?.totalBill * (item?.moneyRate / 100)
                              )}{" "}
                              VND
                            </p>
                          ) : null
                        )} */}
                        <p>{fCurrency2VND(priceMustPay)} VND</p>
                      </Grid>
                    </Grid>
                    <Grid className={classes.containerVoucher}>
                      <Grid className={classes.titleVoucher}>
                        <MonetizationOnIcon />
                        <p>Our discount code</p>
                      </Grid>
                      <Grid sx={{ display: "flex", paddingTop: "14px" }}>
                        {voucher?.data?.length ? (
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
                          ))
                        ) : (
                          <Grid>
                            <p style={{ fontWeight: "600" }}>
                              There are currently no coupons available !
                            </p>
                          </Grid>
                        )}
                      </Grid>
                      <Grid
                        className={classes.btnChooseVoucher}
                        onClick={onOpenPopupVoucher}
                      >
                        <p>Choose the voucher</p>
                      </Grid>
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
                        Continue to Payment
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
                    <p>{tourBill?.tourData?.title}</p>
                  </Grid>
                  <Grid className={classes.product}>
                    <img src={tourBill?.tourData?.images[0]} alt="anh"></img>
                    <p onClick={onOpenPopupDetailTour}>View detail</p>
                  </Grid>
                </Grid>
                <Grid className={classes.boxSelect}>
                  <p>When are you going?</p>
                  <Grid sx={{ paddingTop: "14px" }}>
                    <InputDatePicker
                      control={control}
                      name="startDate"
                      placeholder="Check-out"
                      closeOnSelect={true}
                      timeFormat={false}
                      className={classes.inputStartDate}
                      isValidDate={disableCustomDt}
                      inputRef={register("startDate")}
                      // _onChange={(e) => setStartDateSelected(e)}
                      errorMessage={errors.startDate?.message}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.boxSelect} sx={{ paddingTop: "14px" }}>
                  <p>Language options?</p>
                  <InputSelect
                    className={classes.inputSelect}
                    control={control}
                    name="language"
                    selectProps={{
                      options: languageOptions,
                    }}
                  />
                </Grid>
                <Grid className={classes.boxSelect}>
                  <p>How many tickets?</p>
                  <Grid className={classes.boxNumberTickets}>
                    <Grid>
                      <p>Adult (age &gt; {priceAndAge?.childrenAgeMax})</p>
                      <span>{fCurrency2(priceAndAge?.adultPrice)} VND</span>
                    </Grid>
                    <Grid>
                      <Controller
                        name="numberOfAdult"
                        control={control}
                        render={({ field }) => (
                          <InputCounter
                            className={classes.inputCounter}
                            max={
                              priceAndAge?.quantity -
                              priceAndAge.quantityOrdered
                            }
                            min={tourBill?.amountAdult}
                            disabled={isValidQuantity}
                            onChange={field.onChange}
                            value={field.value}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid className={classes.boxNumberTickets}>
                    <Grid>
                      <p>
                        Child (age {priceAndAge?.childrenAgeMin}-
                        {priceAndAge?.childrenAgeMax})
                      </p>
                      <span>{fCurrency2(priceAndAge?.priceChildren)} VND</span>
                    </Grid>
                    <Grid>
                      <Controller
                        name="numberOfChild"
                        control={control}
                        render={({ field }) => (
                          <InputCounter
                            className={classes.inputCounter}
                            max={
                              priceAndAge?.quantity -
                              priceAndAge.quantityOrdered
                            }
                            min={tourBill?.amountChild}
                            disabled={isValidQuantity}
                            onChange={field.onChange}
                            value={field.value}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <div className={classes.priceWrapper}>
                  <Grid>
                    <p className={classes.discount}>
                      Number of tickets left:{" "}
                      <span>
                        {priceAndAge?.quantity - priceAndAge.quantityOrdered}{" "}
                      </span>
                      tickets
                    </p>
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      paddingTop: "10px",
                    }}
                  >
                    <p>Duration: &nbsp;</p>
                    <p>
                      {tour?.numberOfDays} days - {tour?.numberOfNights} nights
                    </p>
                  </Grid>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      paddingTop: "10px",
                    }}
                  >
                    <p>Booking date: &nbsp;</p>
                    <p>{moment(tourBill?.createdAt).format("DD-MM-YYYY")}</p>
                  </Grid>
                </div>
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
        onGetVoucher={onGetVoucher}
      />
    </>
  );
});

export default BookingComponent;
