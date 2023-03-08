import type { NextPage } from "next";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
} from "reactstrap";
import { useState, useMemo } from "react";
import clsx from "clsx";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextfield from "components/common/inputs/InputTextfield";
import Google from "components/SocialButton/Google";
import Link from "next/link";
import { VALIDATION } from "configs/constants";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import { EUserType } from "models/user";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { UserService } from "services/user";
import PopupConfirmSucess from "components/Popup/PopupConfirmSucess";
import { Grid } from "@mui/material";

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  role: number;
}

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const schema = useMemo(() => {
    return yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      password: yup
        .string()
        .matches(VALIDATION.password, {
          message:
            "Password must contains at least 8 characters, including at least one letter and one number and a special character.",
          excludeEmptyString: true,
        })
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords does not match")
        .required("Confirm password is required"),
      phoneNumber: yup
        .string()
        .required("Phone is required")
        .matches(VALIDATION.phone, {
          message: "Please enter a valid phone number.",
          excludeEmptyString: true,
        }),
      role: yup.number().required(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      role: EUserType.USER,
    },
  });

  const onClosePopupRegisterSuccess = () =>
    setRegisterSuccess(!registerSuccess);

  const _onSubmit = (data: SignUpForm) => {
    console.log(data);
    dispatch(setLoading(true));
    UserService.register({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      phoneNumber: data.phoneNumber,
      role: data.role,
    })
      .then(() => {
        setRegisterSuccess(true);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => dispatch(setLoading(false)));
    // clearForm();
  };
  return (
    <div className="main-content">
      <div className={clsx("header page-header-image", classes.headerWrapper)}>
        <Container className={classes.container}>
          <div className="header-body mb-7">
            <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                <Col lg="5" md="7" className={classes.containerCard}>
                  <Card className={clsx("shadow", classes.card)}>
                    <CardHeader>
                      <div
                        className={clsx(
                          "text-center mt-4",
                          classes.headerSignUpContainer
                        )}
                      >
                        <p>Sign up</p>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5">
                      <Grid
                        component={"form"}
                        onSubmit={handleSubmit(_onSubmit)}
                        container
                        spacing={{ xs: 2, md: 3 }}
                      >
                        <Grid
                          item
                          container
                          xs={12}
                          sx={{ display: "flex" }}
                          spacing={3}
                        >
                          <Grid xs={6} className={classes.colName} item>
                            <InputTextfield
                              title="First name"
                              placeholder="Your first name"
                              type="text"
                              inputRef={register("firstName")}
                              autoComplete="off"
                              errorMessage={errors.firstName?.message}
                            />
                          </Grid>
                          <Grid xs={6} className={classes.colName} item>
                            <InputTextfield
                              title="Last name"
                              placeholder="Your last name"
                              type="text"
                              inputRef={register("lastName")}
                              autoComplete="off"
                              errorMessage={errors.lastName?.message}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <InputTextfield
                            title="Email"
                            placeholder="Enter your email"
                            type="email"
                            inputRef={register("email")}
                            autoComplete="off"
                            errorMessage={errors.email?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputTextfield
                            title="Password"
                            placeholder="Enter your password"
                            type="password"
                            showEyes={true}
                            inputRef={register("password")}
                            autoComplete="off"
                            errorMessage={errors.password?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputTextfield
                            title="Confirm password"
                            placeholder="Enter your confirm password"
                            type="password"
                            showEyes={true}
                            inputRef={register("confirmPassword")}
                            autoComplete="off"
                            errorMessage={errors.confirmPassword?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputTextfield
                            title="Phone"
                            placeholder="Enter your phone"
                            type="text"
                            inputRef={register("phoneNumber")}
                            autoComplete="off"
                            errorMessage={errors.phoneNumber?.message}
                          />
                        </Grid>
                        <Grid className={classes.boxTextRole} item>
                          <p className={classes.textYouAre}>You are: </p>
                          <div className={classes.boxCheckRole}>
                            <Controller
                              name="role"
                              control={control}
                              render={({ field }) => (
                                <>
                                  <InputCheckbox
                                    content="Normal"
                                    checked={field.value === EUserType.USER}
                                    onChange={() => {
                                      setValue("role", EUserType.USER);
                                    }}
                                  />
                                  <InputCheckbox
                                    content="Enterprise"
                                    checked={
                                      field.value === EUserType.ENTERPRISE
                                    }
                                    onChange={() => {
                                      setValue("role", EUserType.ENTERPRISE);
                                    }}
                                  />
                                </>
                              )}
                            />
                          </div>
                        </Grid>
                        <Grid
                          className={classes.btnSignUpContainer}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "24px 0 0 24px",
                          }}
                        >
                          <Button btnType={BtnType.Linear} type="submit">
                            Create an account
                          </Button>
                        </Grid>
                      </Grid>
                      <div className={classes.separator}>
                        <span className={classes.childrenSeparator}>
                          or sign up with
                        </span>
                      </div>
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Google />
                      </Grid>
                      <Row className="mt-3">
                        <Col className="text-right" xs="12">
                          <Link href="/auth/login">
                            <a>
                              <span>Already I have an account ?</span>
                            </a>
                          </Link>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
        <PopupConfirmSucess
          isOpen={registerSuccess}
          onClose={onClosePopupRegisterSuccess}
          toggle={onClosePopupRegisterSuccess}
          title={"Confirm"}
          description={
            "You have register successfully. Please check email to verify."
          }
        />
      </div>
    </div>
  );
};
export default Login;
