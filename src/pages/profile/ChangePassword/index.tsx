/* eslint-disable react/display-name */
import React, {memo, useMemo, useState} from "react";
import classes from "./styles.module.scss";
import {Row, Container, Col, Form} from "reactstrap";
import {images} from "configs/images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera} from '@fortawesome/free-solid-svg-icons';
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Button, {BtnType} from "components/common/buttons/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VALIDATION } from "configs/constants";
import { Divider }from "components/common/Divider";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { UserService } from "services/user";
import { useDispatch } from "react-redux";
import UseAuth from "hooks/useAuth";

interface FormData { 
    currentPassword: string;
    newPassword:string;
    confirmPassword:string;
}
interface Props { 

}

const UserProfile = memo((props: Props) => {
    const dispatch = useDispatch();
    const { user } = UseAuth();
    const [isEmptyPassword, setIsEmptyPassword] = useState(false)

    const schema = useMemo(() => {
        return yup.object().shape({
          currentPassword: isEmptyPassword ? yup.string() : yup.string().required("Current password is required"),
          newPassword: yup
            .string()
            .matches(VALIDATION.password, {
              message: "Password must contains at least 8 characters, including at least one letter and one number and a special character",
              excludeEmptyString: true,
            })
            .notOneOf(
              [yup.ref("currentPassword")],
              "New password must be different current password"
            )
            .required("New password is required."),
          confirmPassword: yup
            .string()
            .oneOf(
              [yup.ref("newPassword")],
              "Confirm new password do not match. Try again"
            )
            .required("Confirm new password is required"),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isEmptyPassword]);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        } = useForm<FormData>({
          resolver: yupResolver(schema),
          mode: "onChange",
    });

    const _onSubmit = (data: FormData) => {
      dispatch(setLoading(true));
      if(user) {
        UserService.changePassword({
          userId: user.id,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        })
          .then((res) => {
            dispatch(setSuccessMess("Change password successfully"));
            if (isEmptyPassword) {
              setIsEmptyPassword(false)
            }
            reset();
          })
          .catch((e) => dispatch(setErrorMess(e)))
          .finally(() => dispatch(setLoading(false)));     
      }
    }
    return (
        <>
            <Container className={`px-lg-5 ${classes.containerForm}`}>
                <h3>Change password</h3>
                <p>You should use a strong password that you have not used anywhere else.</p>
                <Divider/>
                {isEmptyPassword && <p>Your account has not been set a password, please set a password.</p>}
                <Form role="form" onSubmit={handleSubmit(_onSubmit)}>
                    {!isEmptyPassword && (<InputTextFieldBorder
                        className="mb-4"
                        label="Current password"
                        name="currentPassword"
                        placeholder="Current Password"
                        type="password"
                        showEyes={true}
                        autoComplete="off"
                        inputRef={register("currentPassword")}
                        errorMessage={errors.currentPassword?.message}
                    />)}
                    <InputTextFieldBorder
                        className="mb-4"
                        label="New password"
                        name="newPassword"
                        placeholder="New password"
                        type="password"
                        showEyes={true}
                        autoComplete="off"
                        inputRef={register("newPassword")}
                        errorMessage={errors.newPassword?.message}

                    />
                    <InputTextFieldBorder
                        className="mb-4"
                        label="Confirm password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        type="password"
                        showEyes={true}
                        autoComplete="off"
                        inputRef={register("confirmPassword")}
                        errorMessage={errors.confirmPassword?.message}
                    />
                    <Button btnType={BtnType.Primary} type="submit" className={classes.btnSave}>
                        Save change
                    </Button>
                </Form>
            </Container>
        </>
    );
});

export default UserProfile;