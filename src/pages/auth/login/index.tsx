import type { NextPage } from "next";
import { Container, Row, Col, Card, CardHeader, CardBody, Form } from "reactstrap";
import { useState, useMemo, useEffect } from "react";
import clsx from "clsx";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Google from "components/SocialButton/Google";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { UserService } from "services/user";
import { EKey } from "models/general";
import { setUserLogin } from "redux/reducers/User/actionTypes";
import { ReducerType } from "redux/reducers";
import Router from "next/router";
import { EUserType } from "models/user";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import ErrorMessage from "components/common/texts/ErrorMessage";
import PopupDefault from "components/Popup/PopupDefault";
import { getAllHotels, getAllTours } from "redux/reducers/Enterprise/actionTypes";
import { getAllRoomBills, getAllTourBills } from "redux/reducers/Normal/actionTypes";


interface LoginForm {
  email: string;
  password: string;
  role: number;
}

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReducerType) => state.user);

  const [errorSubmit, setErrorSubmit] = useState(false)
  const [isNotVerified, setIsNotVerified] = useState(false)

  const schema = useMemo(() => {
    return yup.object().shape({
      email: yup.string().email("Please enter a valid email address").required("Email is required"),
      password: yup.string().required("Password is required"),
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
    watch,
    getValues,
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      role: EUserType.USER,
    },
  });
  
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      errorSubmit && setErrorSubmit(false)
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  useEffect(() => {
    if (user) {
      Router.push("/");
    }
  }, [user]);

  const clearForm = () => {
    reset({
      email: "",
      password: "",
      role: EUserType.USER,
    });
  };

  const _onSubmit = (data: LoginForm) => {
    console.log(data);
    dispatch(setLoading(true));
    UserService.login({
      username: data?.email,
      password: data?.password,
      role: data?.role,
    })
      .then((res) => {
        localStorage.setItem(EKey.TOKEN, res.token);
        dispatch(setUserLogin(res.user));
        if(res?.role === EUserType.ENTERPRISE) {
          dispatch(getAllTours(res.user.id))
          dispatch(getAllHotels(res.user.id))
        }
        dispatch(getAllTourBills(user?.id));
        dispatch(getAllRoomBills(user?.id));
      })
      .catch(e => {
        if (e.detail === 'notVerified') setIsNotVerified(true)
        else setErrorSubmit(true)
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const onReSendVerifySignUp = () => {
    setIsNotVerified(false)
    const email = getValues('email');
    if (!email || errors.email) return
    dispatch(setLoading(true))
    UserService.reSendEmailVerifySignup(email)
      .then(() => {
        dispatch(setSuccessMess("Resend successfully"))
      })
      .catch(e => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)))
  }
  return (
    <div className="main-content">
      <div className={clsx("header page-header-image", classes.headerWrapper)}>
        <Container className={classes.container}>
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white">Welcome!</h1>
              </Col>
            </Row>
            <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                <Col lg="5" md="7">
                  <Card className={clsx("shadow", classes.card)}>
                    <CardHeader>
                      <div className={clsx("text-center mt-4", classes.headerLoginContainer)}>
                        <p>Sign in</p>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5">
                      <Form role="form" onSubmit={handleSubmit(_onSubmit)}>
                        <InputTextFieldBorder
                          label="Email"
                          placeholder="Enter your email"
                          type="email"
                          inputRef={register("email")}
                          errorMessage={errors.email?.message}
                        />
                        <InputTextFieldBorder
                          label="Password"
                          placeholder="Enter your password"
                          type="password"
                          showEyes={true}
                          inputRef={register("password")}
                          errorMessage={errors.password?.message}
                        />
                        <div className={classes.boxTextRole}>
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
                                    checked={field.value === EUserType.ENTERPRISE}
                                    onChange={() => {
                                      setValue("role", EUserType.ENTERPRISE);
                                    }}
                                  />
                                </>
                              )}
                            />
                          </div>
                        </div>
                        {errorSubmit && (
                          <div className={classes.boxError}>
                          <ErrorMessage>
                            Please enter a correct email and password.
                          </ErrorMessage>
                          </div>
                        )}
                        <div className={classes.btnLoginContainer}>
                          <Button btnType={BtnType.Linear} type="submit">
                            Sign in
                          </Button>
                        </div>
                      </Form>
                      <div className={classes.separator}>
                        <span className={classes.childrenSeparator}>or login with</span>
                      </div>
                      <Google />
                      <Row className="mt-3">
                        <Col xs="6">
                          <Link href="/auth/forgotPassword">
                            <a>
                              <span>Forgot password?</span>
                            </a>
                          </Link>
                        </Col>
                        <Col className="text-right" xs="6">
                          <Link href="/auth/signup">
                            <a>
                              <span>Create new account</span>
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
      </div>
      <PopupDefault
      className={classes.popupResend}
      isOpen={isNotVerified}
      title="Notifications"
      description="Your account is not be verified. Please check your email for confirmation or click here to get a confirmation email resend"
      // eslint-disable-next-line react/no-children-prop
      children= {
        <>
          <Button btnType={BtnType.Linear} onClick={onReSendVerifySignUp}>Send verify</Button>
        </>
      }
      />
    </div>
  );
};

export default Login;
