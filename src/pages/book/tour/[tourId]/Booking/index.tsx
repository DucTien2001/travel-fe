import React, { memo, useEffect, useState, useMemo } from "react";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Container, Form } from "reactstrap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { TourService } from "services/normal/tour";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { Grid, Link, useMediaQuery, useTheme } from "@mui/material";
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
import { ITour } from "redux/reducers/Normal";

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
}
interface Props {
  onSubmit?: (data: FormData) => void;
}
// eslint-disable-next-line react/display-name
const BookingComponent = memo(({ onSubmit }: Props) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));
  const { user } = UseAuth();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [tour, setTour] = useState<ITour>();

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

  const _onSubmit = (data: BookForm) => {
    const _formData = new FormData();
    _formData.append("firsName", data.firstName);
    _formData.append("lastName", data.lastName);
    _formData.append("email", data.email);
    _formData.append("phoneNumber", data.phoneNumber);
    onSubmit(_formData);

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
                    >
                      <Grid>
                        {" "}
                        <p className={classes.titlePrice}>Price you pay</p>
                      </Grid>
                      <Grid>
                        <h4 className={classes.price}>590,000 VND</h4>
                      </Grid>
                    </Grid>
                    <Grid className={classes.boxPriceDetail}>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <p>Adult(1x)</p>
                        <p>390,000 VND</p>
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <p>Child(1x)</p>
                        <p>200,000 VND</p>
                      </Grid>
                    </Grid>
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
                  <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                  <p>Booking summary</p>
                </Grid>
                <Grid className={classes.boxProduct}>
                  <Grid>
                    <p>{tour?.title}</p>
                  </Grid>
                  <Grid className={classes.product}>
                    <img src={tour?.images[0]} alt="anh"></img>
                    <Link href={`/listTour/:${tour?.id}`}>View detail</Link>
                  </Grid>
                </Grid>
                <Grid className={classes.boxInfoPerson}>
                  <Grid className={classes.information}>
                    <Grid>
                      <span>Visit date</span>
                    </Grid>
                    <Grid>
                      <p>Wed, 5 Apr 2023</p>
                    </Grid>
                  </Grid>
                  <Grid className={classes.information}>
                    <Grid>
                      <span>Total visitors</span>
                    </Grid>
                    <Grid>
                      <p>Adult: 1</p>
                      <p>Child: 2</p>
                    </Grid>
                  </Grid>
                </Grid>
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
      </Grid>
    </>
  );
});

export default BookingComponent;
