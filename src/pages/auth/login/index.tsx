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
import InputTextField from "components/common/inputs/InputTextField";
import Google from "components/SocialButton/Google";
import Link from "next/link";
import TransparentNavbar from "components/Navbars/TransparentNavbar";
import Footer from "components/Footer";

interface LoginForm { 
    email: string;
    password: string;
}

const Login: NextPage = () => {
  const { t, i18n } = useTranslation();

  const schema = useMemo(() => {
    return yup.object().shape({
        email: yup.string().email("Please enter a valid email address").required("User name is required"),
        password: yup.string().required("Password is required"),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language] );
  
  const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      } = useForm<LoginForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
  });

  const clearForm = () => {
    reset({
      email: "",
      password: "",
    })
  }

  const _onSubmit = (data: LoginForm) => {
      console.log(data);
      clearForm();
  }
    return (
      <div className="main-content">
        <TransparentNavbar/>
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
                        <InputTextField
                        label="User name"
                        placeholder="Enter your username"
                        type="email"
                        inputRef={register("email")}
                        errorMessage={errors.email?.message}
                        />
                        <InputTextField
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        showEyes={true}
                        inputRef={register("password")}
                        errorMessage={errors.password?.message}
                        />
                        <div className={classes.btnLoginContainer}>
                          <Button btnType={BtnType.Linear} type="submit">
                            Sign in
                          </Button>
                        </div>
                      </Form>
                      <div className={classes.separator}>
                          <span className={classes.childrenSeparator}>or login with</span>
                        </div>
                        <Google/>
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
        <Footer/>
      </div>
    )
};

export default Login;
