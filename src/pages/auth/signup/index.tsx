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
import { useTranslation } from "react-i18next";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Google from "components/SocialButton/Google";
import Link from "next/link";
import { VALIDATION } from "configs/constants";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import {EUserType} from "models/user";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { UserService } from "services/user";
import PopupConfirmSucess from "components/Popup/PopupConfirmSucess";

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
  const { t, i18n } = useTranslation();
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const schema = useMemo(() => {
    return yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
        password: yup.string()
            .matches(VALIDATION.password, { message: 'Password must contains at least 8 characters, including at least one letter and one number and a special character.'
            ,excludeEmptyString: true })
            .required('Password is required'),
        confirmPassword: yup.string().
            oneOf([yup.ref('password')], 'Passwords does not match')
            .required("Confirm password is required"),
        phoneNumber: yup.string()
            .required("Phone is required")
            .matches(VALIDATION.phone, { message: 'Please enter a valid phone number.', excludeEmptyString: true }),
        role: yup.number().required(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language] );
  
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
          role: EUserType.USER
        }
  });

  const clearForm = () => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: EUserType.USER,
    })
  }
  const onClosePopupRegisterSuccess = () => setRegisterSuccess(!registerSuccess);

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
      }).
      then(() => {
        setRegisterSuccess(true)
      })
      .catch((e) => {
        dispatch(setErrorMess(e))
      })
      .finally(() => dispatch(setLoading(false)))
      // clearForm();
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
                  <Col lg="5" md="7" className={classes.containerCard}>
                    <Card className={clsx("shadow", classes.card)}>
                    <CardHeader>
                      <div className={clsx("text-center mt-4", classes.headerSignUpContainer)}>
                        <p>Sign up</p>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5">
                      <Form role="form" onSubmit={handleSubmit(_onSubmit)}>
                        <Row className={classes.row}>
                            <Col xs={6} className={classes.colName}>
                                <InputTextFieldBorder
                                    label="First name"
                                    placeholder="Your first name"
                                    type="text"
                                    inputRef={register("firstName")}
                                    autoComplete="off"
                                    errorMessage={errors.firstName?.message}
                                />
                            </Col>
                            <Col xs={6} className={classes.colName}> 
                                <InputTextFieldBorder
                                    label="Last name"
                                    placeholder="Your last name"
                                    type="text"
                                    inputRef={register("lastName")}
                                    autoComplete="off"
                                    errorMessage={errors.lastName?.message}
                                /> 
                            </Col>
                        </Row>
                        <InputTextFieldBorder
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        inputRef={register("email")}
                        autoComplete="off"
                        errorMessage={errors.email?.message}
                        />
                        <InputTextFieldBorder
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        showEyes={true}
                        inputRef={register("password")}
                        autoComplete="off"
                        errorMessage={errors.password?.message}
                        />
                        <InputTextFieldBorder
                        label="Confirm password"
                        placeholder="Enter your confirm password"
                        type="password"
                        showEyes={true}
                        inputRef={register("confirmPassword")}
                        autoComplete="off"
                        errorMessage={errors.confirmPassword?.message}
                        />
                        <InputTextFieldBorder
                        label="Phone"
                        placeholder="Enter your phone"
                        type="text"
                        inputRef={register("phoneNumber")}    
                        autoComplete="off"
                        errorMessage={errors.phoneNumber?.message}
                        />
                        <div className={classes.boxTextRole}>
                          <p className={classes.textYouAre}>You are: </p>
                          <div className={classes.boxCheckRole}>
                            <Controller
                            name="role"
                            control={control}
                            render={({field}) => (
                              <>
                              <InputCheckbox
                              content="Normal"
                              checked={field.value === EUserType.USER}
                              onChange={() => {
                                setValue("role", EUserType.USER)
                              }}
                              />                
                              <InputCheckbox
                              content="Enterprise"
                              checked={field.value === EUserType.ENTERPRISE}
                              onChange={() => {
                                setValue("role", EUserType.ENTERPRISE)
                              }}
                              />
                              </>
                            )}
                            />
                          </div>
                        </div>
                        <div className={classes.btnSignUpContainer}>
                          <Button btnType={BtnType.Linear} type="submit">
                            Create an account
                          </Button>
                        </div>
                      </Form>
                      <div className={classes.separator}>
                          <span className={classes.childrenSeparator}>or sign up with</span>
                        </div>
                        <Google/>
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
            description={"You have register successfully. Please check email to verify."}
            />
        </div>
      </div>
    )
};
export default Login;
