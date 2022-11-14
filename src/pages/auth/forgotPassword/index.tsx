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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Link from "next/link";
import { UserService } from "services/user";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import Router from "next/router";


interface ForgotPasswordForm { 
    email: string;
}

const Login: NextPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const schema = useMemo(() => {
    return yup.object().shape({
        email: yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language] );
  
  const {
      register,
      handleSubmit,
      formState: { errors },
      } = useForm<ForgotPasswordForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
  });

  const _onSubmit = (data: ForgotPasswordForm) => {
      dispatch(setLoading(true))
      UserService.sendEmailForgotPassword(data.email)
        .then(() => {
          dispatch(setSuccessMess("Send verify code successfully"))
          Router.push(`/auth/verifyForgotPassword?email=${data.email}`);
        })
        .catch((e) => dispatch(setErrorMess(e)))
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
                      <div className={clsx("text-center mt-4", classes.headerContainer)}>
                        <p>Forgot password</p>
                        <span>No worries! Just enter your email and we will send you a reset password link.</span>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5">
                      <Form role="form" onSubmit={handleSubmit(_onSubmit)}>
                        <InputTextFieldBorder
                        label="Email address"
                        placeholder="Enter your email"
                        type="text"
                        inputRef={register("email")}
                        errorMessage={errors.email?.message}
                        />
                        <div className={classes.btnContainer}>
                          <Button btnType={BtnType.Linear} type="submit">
                            Send recovery email
                          </Button>
                        </div>
                      </Form>
                        <Row className="mt-3">
                          <Col xs="12">
                            <Link href="/auth/login">
                              <a>
                              <span>Back to login page</span>
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
      </div>
    )
};
export default Login;
