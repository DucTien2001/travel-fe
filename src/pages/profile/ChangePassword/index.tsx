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
import { useTranslation } from "react-i18next";
import { VALIDATION } from "configs/constants";
import { Divider }from "components/common/Divider";

interface FormData { 
    currentPassword: string;
    newPassword:string;
    confirmPassword:string;
}
interface Props { 

}

const UserProfile = memo((props: Props) => {

    const { t, i18n } = useTranslation();

    const [isEmptyPassword, setIsEmptyPassword] = useState(false)

    const schema = useMemo(() => {
        return yup.object().shape({
          currentPassword: isEmptyPassword ? yup.string() : yup.string().required(t("field_current_password_vali_required")),
          newPassword: yup
            .string()
            .matches(VALIDATION.password, {
              message: t("field_new_password_vali_password"),
              excludeEmptyString: true,
            })
            .notOneOf(
              [yup.ref("currentPassword")],
              t("field_confirm_new_password_different_current_password")
            )
            .required(t("field_new_password_vali_required")),
          confirmPassword: yup
            .string()
            .oneOf(
              [yup.ref("newPassword")],
              t("field_confirm_new_password_vali_password_do_not_match")
            )
            .required(t("field_confirm_new_password_vali_required")),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [i18n.language, isEmptyPassword]);
    
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
        console.log(data);
        
    }
    return (
        <>
            <Container className={`px-lg-5 ${classes.containerForm}`}>
                <h3>Change password</h3>
                <p>You should use a strong password that you have not used anywhere else.</p>
                <Divider/>
                {isEmptyPassword && <p>Your account has not been set a password, please set a password.</p>}
                <Form role="form" onSubmit={handleSubmit(_onSubmit)}>
                    <InputTextFieldBorder
                        className="mb-4"
                        label="Current password"
                        name="currentPassword"
                        placeholder="Current Password"
                        type="text"
                        inputRef={register("currentPassword")}
                        errorMessage={errors.currentPassword?.message}
                    />
                    <InputTextFieldBorder
                        className="mb-4"
                        label="New password"
                        name="newPassword"
                        placeholder="New password"
                        type="text"
                        inputRef={register("newPassword")}
                        errorMessage={errors.newPassword?.message}

                    />
                    <InputTextFieldBorder
                        className="mb-4"
                        label="Confirm password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        type="text"
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