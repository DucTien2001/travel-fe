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
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextfield from "components/common/inputs/InputTextfield";
import Link from "next/link";
import { VALIDATION } from "configs/constants";
import { useDispatch } from "react-redux";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { UserService } from "services/user";
import Router from "next/router";
import { Grid } from "@mui/material";

interface VerifyForgotPasswordForm {
  code: string;
  newPassword: string;
  confirmNewPassword: string;
}

const VerifyForgotPassword: NextPage = () => {
  const dispatch = useDispatch();

  const schema = useMemo(() => {
    return yup.object().shape({
      code: yup.string().required("Verify code is required"),
      newPassword: yup
        .string()
        .matches(VALIDATION.password, {
          message:
            "Password must contains at least 8 characters, including at least one letter and one number and a special character.",
          excludeEmptyString: true,
        })
        .required("New password is required"),
      confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords does not match")
        .required("Confirm new password is required"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyForgotPasswordForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const _onSubmit = (data: VerifyForgotPasswordForm) => {
    const urlParams = new URLSearchParams(location.search);
    const email = urlParams.get("email");
    const newEmail = email.replace(" ", "+");
    dispatch(setLoading(true));
    UserService.changePassForgot({
      email: newEmail,
      code: data.code,
      password: data.newPassword,
      confirmPassword: data.confirmNewPassword,
    })
      .then(() => {
        Router.push("/auth/login");
        dispatch(setSuccessMess("Reset password successfully"));
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => dispatch(setLoading(false)));
  };
  return (
    <div className="main-content">
      <div className={clsx("header page-header-image", classes.headerWrapper)}>
        <Container className={classes.container}>
          <div className="header-body mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white text-center">Welcome!</h1>
              </Col>
            </Row>
            <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                <Col lg="5" md="7">
                  <Card className={clsx("shadow", classes.card)}>
                    <CardHeader>
                      <div
                        className={clsx(
                          "text-center mt-4",
                          classes.headerContainer
                        )}
                      >
                        <p>Verify forgot password</p>
                        <span>
                          Please enter verify code have been send your email.
                        </span>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5">
                      <Grid
                        component="form"
                        onSubmit={handleSubmit(_onSubmit)}
                        container
                        spacing={{ xs: 2, md: 3 }}
                      >
                        <Grid item xs={12}>
                          <InputTextfield
                            title="Verify code"
                            placeholder="Enter verify code"
                            type="text"
                            inputRef={register("code")}
                            errorMessage={errors.code?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputTextfield
                            label="New password"
                            placeholder="Enter your new password"
                            type="password"
                            showEyes={true}
                            inputRef={register("newPassword")}
                            errorMessage={errors.newPassword?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputTextfield
                            label="Confirm new password"
                            placeholder="Enter confirm new password"
                            type="password"
                            showEyes={true}
                            inputRef={register("confirmNewPassword")}
                            errorMessage={errors.confirmNewPassword?.message}
                          />
                        </Grid>
                        <Grid className={classes.btnContainer} item xs={12}>
                          <Button btnType={BtnType.Linear} type="submit">
                            Send
                          </Button>
                        </Grid>
                      </Grid>
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
export default VerifyForgotPassword;
function setMessSuccess(arg0: boolean) {
  throw new Error("Function not implemented.");
}
