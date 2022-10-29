/* eslint-disable react/display-name */
import React, {memo, useMemo, useState} from "react";
import classes from "./styles.module.scss";
import {Row, Container, Col, Form} from "reactstrap";
import {images} from "configs/images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera} from '@fortawesome/free-solid-svg-icons';
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import Button, {BtnType} from "components/common/buttons/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { VALIDATION } from "configs/constants";

interface FormData { 
    firstName: string;
    lastName:string;
    email:string;
    phone?:string;
    address?: string;
    instruction?: string;
}
interface Props { 

}

const UserProfile = memo((props: Props) => {

    const { t, i18n } = useTranslation();

    const [isEnterprise, setIsEnterprise] = useState(false);

    const schema = useMemo(() => {
      return yup.object().shape({
          firstName: yup.string().required("First name is required"),
          lastName: yup.string().required("Last name is required"),
          email: yup.string()
          .email("Please enter a valid email address")
          .required("Email is required"),
          phoneNumber: isEnterprise ? yup.string().required().matches(VALIDATION.phone, { message: 'Please enter a valid phone number.', excludeEmptyString : true })
         : yup.string().notRequired().matches(VALIDATION.phone, { message: 'Please enter a valid phone number.', excludeEmptyString: true }),
          address: isEnterprise ? yup.string() : yup.string().required("Address is required"),
          instruction: isEnterprise ? yup.string() : yup.string().required("Instruction is required"),
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [i18n.language] );
    
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
            <Row className={classes.personalInfor}>
                <div className={classes.photoContainer}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="avatar" src={images.emily.src}/>
                    <div className={classes.uploadImage}>
                        <FontAwesomeIcon icon={faCamera}/>
                    </div>
                 </div>
                <div className={classes.information}>
                    <h4>Dinh Minh Khoi</h4>
                </div>
            </Row>
            <Container className={`px-lg-5 ${classes.containerForm}`}>
                <Form role="form" onSubmit={handleSubmit(_onSubmit)}>
                    <Row xs={2} className={classes.nameWrapper}>
                        <Col>
                            <InputTextFieldBorder
                            className="mb-4"
                            label="First name"
                            name="firstName"
                            placeholder="First Name"
                            type="text"
                            inputRef={register("firstName")}
                            errorMessage={errors.firstName?.message}
                            />
                        </Col>
                        <Col>
                        <InputTextFieldBorder
                            className="mb-4"
                            label="First name"
                            name="lastName"
                            placeholder="Last Name"
                            type="text"
                            inputRef={register("lastName")}
                            errorMessage={errors.lastName?.message}
                            />
                        </Col>
                    </Row>
                    <InputTextFieldBorder
                        className="mb-4"
                        label="Email"
                        name="email"
                        placeholder="Email"
                        type="text"
                        inputRef={register("email")}
                        errorMessage={errors.email?.message}

                    />
                    <InputTextFieldBorder
                        className="mb-4"
                        label="Phone"
                        optional={true}
                        name="phone"
                        placeholder="Phone"
                        type="text"
                        inputRef={register("phone")}
                        errorMessage={errors.phone?.message}
                    />
                    {!isEnterprise && ( <InputTextFieldBorder
                        className="mb-4"
                        label="Address"
                        name="address"
                        placeholder="Address"
                        type="text"
                        inputRef={register("address")}
                        errorMessage={errors.address?.message}
                    />)}
                    {!isEnterprise && (<InputTextArea
                        label="Instruction"
                        name="instruction"
                        placeholder="Instruction"
                        type="textarea"
                        inputRef={register("instruction")}
                        errorMessage={errors.instruction?.message}
                    />)}
                    <Button btnType={BtnType.Primary} type="submit" className={classes.btnSave}>
                        Save change
                    </Button>
                </Form>
            </Container>
        </>
    );
});

export default UserProfile;