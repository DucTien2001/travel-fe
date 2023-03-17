import React, { memo, useEffect, useState, useMemo } from "react";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Container, Form } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { TourService } from "services/normal/tour";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { Grid, Link, useMediaQuery, useTheme, Collapse } from "@mui/material";
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
  faHotel,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import InputTextField from "components/common/inputs/InputTextfield";
import { VALIDATION } from "configs/constants";
import UseAuth from "hooks/useAuth";
import {
  setConfirmBookTourReducer,
  setUserInformationBookRoomReducer,
} from "redux/reducers/Normal/actionTypes";
import { UserService } from "services/user";
import * as yup from "yup";
import { HotelService } from "services/normal/hotel";
import { Restaurant, Wifi } from "@mui/icons-material";
import moment from "moment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InputTextfield from "components/common/inputs/InputTextfield";
import { fCurrency2VND } from "utils/formatNumber";
import { sumPrice } from "utils/totalPrice";
import { ReducerType } from "redux/reducers";
import { IUserInformationBookRoom } from "redux/reducers/Normal";
import PopupCheckReview from "components/Popup/PopupCheckReview";
import { PAYMENT_HOTEL_SECTION } from "models/payment";

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
  specialRequest?: string;
}
interface Props {
  onSubmit?: (data: IUserInformationBookRoom) => void;
  handleChangeStep?: () => void;
}
// eslint-disable-next-line react/display-name
const BookingComponent = memo(({ onSubmit, handleChangeStep }: Props) => {
  const dispatch = useDispatch();
  const { roomBillConfirm } = useSelector((state: ReducerType) => state.normal);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));
  const { user } = UseAuth();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(true);
  const [hotel, setHotel] = useState<any>();
  const [modal, setModal] = useState(false);

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

  const toggle = () => setModal(!modal);

  const specialRequest = watch("specialRequest");
  const totalPrice = [];

  roomBillConfirm?.rooms.forEach((room) => {
    room?.priceDetail.map((price) => {
      const _price =
        (price?.price * room?.amount * (100 - room?.discount)) / 100;
      totalPrice.push(_price);
    });
  });

  console.log(roomBillConfirm, "========");

  useEffect(() => {
    if (router) {
      HotelService.getHotel(Number(router.query.hotelId.slice(1)))
        .then((res) => {
          setHotel(res.data);
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

  const _onSubmit = (data: BookForm) => {
    if (user) {
      onSubmit({
        userId: user?.id,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        firstName: data?.firstName,
        lastName: data?.lastName,
        specialRequest: data?.specialRequest,
      });
    }

    // dispatch(setLoading(true));
    //   if(user) {
    //     TourBillService.create({
    //       userId: user?.id,
    //       userMail: data?.email,
    //       tourId: tour?.id,
    //       amount: data.amount,
    //       price: tour?.price,
    //       discount: tour?.discount,
    //       email: data?.email,
    //       phoneNumber: data?.phoneNumber,
    //       firstName: data?.firstName,
    //       lastName: data?.lastName,
    //     })
    //     .then(() => {
    //       dispatch(setSuccessMess("Book tour successfully"));
    //     })
    //     .catch((e) => {
    //       dispatch(setErrorMess(e));
    //     })
    //     .finally(() => {
    //       toggle();
    //       dispatch(setLoading(false));
    //     });
    //   }
    // dispatch(
    //   setConfirmBookTourReducer({
    //     userId: user?.id,
    //     userMail: data?.email,
    //     tourId: tour?.id,
    //     amount: data.amount,
    //     price: tour?.price,
    //     discount: tour?.discount,
    //     email: data?.email,
    //     phoneNumber: data?.phoneNumber,
    //     firstName: data?.firstName,
    //     lastName: data?.lastName,
    //   })
    // );
  };

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

  return (
    <>
      <Grid
        component="form"
        onSubmit={handleSubmit(_onSubmit)}
        id={PAYMENT_HOTEL_SECTION.BOOKING}
      >
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
                      infor={`${specialRequest?.length}/${CHARACTER_LIMIT}`}
                      inputRef={register("specialRequest")}
                      inputProps={{
                        maxLength: CHARACTER_LIMIT,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.title}>Cancellation Policy</h4>
                  <Grid
                    sx={{
                      backgroundColor: "var(--white-color)",
                      padding: "24px 16px",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
                      borderRadius: "10px",
                    }}
                  >
                    <p>
                      This reservation is non-refundable & non-reschedulable.
                    </p>
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
                      143 Trần Hưng Đạo, KP 7, TT Dương Đông, H.Phú Quốc, tỉnh
                      Kiên Giang, Vietnam{" "}
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
                    }}
                  >
                    <Grid
                      className={classes.boxPrice}
                      sx={{ borderBottom: "1px solid Var(--gray-10)" }}
                      onClick={() => setOpen(!open)}
                    >
                      <Grid>
                        {" "}
                        <p className={classes.titlePrice}>Price you pay</p>
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
                    <Grid className={classes.boxInforPrice}>
                      <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                      <p>
                        Taxes and fees, are recovery charges which Traveloka
                        pays to the property. If you have any questions
                        regarding tax and invoice, please refer to Traveloka
                        Terms and Condition
                      </p>
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
                              <p>Room name: </p> <p>{room?.title}</p>
                            </Grid>{" "}
                            <Grid
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <p>Price: </p>
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
                            {room?.discount !== 0 && (
                              <Grid
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p>Discount: </p> <p>{room?.discount}%</p>
                              </Grid>
                            )}
                            <Grid
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <p>Amount: </p> <p>{room?.amount}</p>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Collapse>
                    <Grid
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                      className={classes.btnContinue}
                    >
                      <Button btnType={BtnType.Secondary} type="submit">
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
                  <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon>
                  <p>{hotel?.name}</p>
                </Grid>
                <Grid className={classes.boxInfoPerson}>
                  <Grid className={classes.information}>
                    <Grid>
                      <span>Check-in</span>
                    </Grid>
                    <Grid>
                      <p>
                        {moment(roomBillConfirm?.startDate).format(
                          "DD/MM/YYYY"
                        )}
                      </p>
                    </Grid>
                  </Grid>
                  <Grid className={classes.information}>
                    <Grid>
                      <span>Check-out</span>
                    </Grid>
                    <Grid>
                      <p>
                        {moment(roomBillConfirm?.endDate).format("DD/MM/YYYY")}
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
                {roomBillConfirm?.rooms.map((room, index) => (
                  <Grid className={classes.boxProduct} key={index}>
                    <Grid>
                      <p className={classes.nameProduct}>{room?.title}</p>
                    </Grid>
                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingBottom: "8px",
                      }}
                    >
                      <p>Number of bed</p> <span>{room?.numberOfBed}</span>
                    </Grid>
                    <Grid
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <p>Guest per room</p> <span>4</span>
                    </Grid>
                    <Grid className={classes.product}>
                      <img src={images.bgUser.src} alt="anh"></img>
                      <Grid
                        sx={{
                          paddingLeft: "12px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Grid className={classes.boxConvenient}>
                          <Restaurant /> Free breakfast
                        </Grid>
                        <Grid className={classes.boxConvenient}>
                          <Wifi /> Free wifi
                        </Grid>

                        <Link href={`/listTour/:${hotel?.id}`}>
                          View detail
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}

                <Grid className={classes.boxTip}>
                  <Grid className={classes.tip}>
                    <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
                    <p>Valid on 05 Apr 2023</p>
                  </Grid>
                  <Grid className={clsx(classes.tipRequest, classes.tip)}>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <p>No Reservation Needed</p>
                  </Grid>
                  <Grid className={clsx(classes.tipRequest, classes.tip)}>
                    <FontAwesomeIcon icon={faRotateLeft}></FontAwesomeIcon>
                    <p>Refundable until 3 Apr 2023</p>
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
        {/* <PopupCheckReview
        isOpen={modal}
        onClose={toggle}
        toggle={toggle}
        onClick={handleChangeStep}
      /> */}
      </Grid>
    </>
  );
});

export default BookingComponent;
