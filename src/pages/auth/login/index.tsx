import type { NextPage } from "next";
import { Container, Row, Col, Card, CardHeader, CardBody, Form } from "reactstrap";
import { useState, useMemo, useEffect } from "react";
import clsx from "clsx";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Google from "components/SocialButton/Google";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { UserService } from "services/user";
import { EKey } from "models/general";
import { setUserLogin } from "redux/reducers/User/actionTypes";
import { ReducerType } from "redux/reducers";
import Router from "next/router";

interface LoginForm {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReducerType) => state.user);

  const { t, i18n } = useTranslation();

  const schema = useMemo(() => {
    return yup.object().shape({
      email: yup.string().email("Please enter a valid email address").required("Email is required"),
      password: yup.string().required("Password is required"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      Router.push('/')
    }
  }, [user]);

  const clearForm = () => {
    reset({
      email: "",
      password: "",
    });
  };

  const _onSubmit = (data: LoginForm) => {
    console.log(data);
    dispatch(setLoading(true));
    UserService.login({
      username: data?.email,
      password: data?.password,
    })
      .then((res) => {
        localStorage.setItem(EKey.TOKEN, res.token);
        dispatch(setUserLogin(res.user));
        // if (solutionId) {
        //   dispatch(push(routes.project.create));
        // }
      })
      .catch((e) => {
        // if (e.detail === 'notVerified') setIsNotVerified(true)
        // else setErrorSubmit(true)
      })
      .finally(() => {
        // clearForm();
        dispatch(setLoading(false));
      });
  };
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
    </div>
  );
};

export default Login;
