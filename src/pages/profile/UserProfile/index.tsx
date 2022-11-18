/* eslint-disable react/display-name */
import React, {memo, useEffect, useMemo, useState} from "react";
import classes from "./styles.module.scss";
import {Row, Container, Col, Form} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera} from '@fortawesome/free-solid-svg-icons';
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import Button, {BtnType} from "components/common/buttons/Button";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { VALIDATION } from "configs/constants";
import UseAuth from "hooks/useAuth";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { UserService } from "services/user";
import {images} from "configs/images";
import UploadAvatar from "components/UploadAvatar";
import { ImageService } from "services/image";


interface FormUser { 
    avatar?: string;
    firstName: string;
    lastName:string;
    email:string;
    phoneNumber?:string;
    address?: string;
}
interface Props { 

}

const UserProfile = memo((props: Props) => {

    const { t, i18n } = useTranslation();
    const { user } = UseAuth();
    const dispatch = useDispatch();
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
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [i18n.language] );
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        } = useForm<FormUser>({
          resolver: yupResolver(schema),
          mode: "onChange",
    });

    const _onSubmit = async (data: FormUser) => {
        dispatch(setLoading(true));
        let avatar;
        const formData: any = new FormData();
        formData.append("file", data.avatar);
        formData.append("tags", "codeinfuse, medium, gist");
        formData.append("upload_preset", "my-uploads");
        formData.append("api_key", "859398113752799");
        formData.append("timestamp", Date.now() / 1000 / 0);
        console.log(formData)
        ImageService.uploadImage(formData)
        .then((res) => {
            console.log(res)
            if(user) {
                UserService.updateUserProfile(user.id, {
                    avatar: res,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,    
                })
                .then(() => {
                    dispatch(setSuccessMess("Update profile successfully"))
                }) 
                .catch((err) => dispatch(setErrorMess(err)))
                .finally(() => dispatch(setLoading(false)));
            }
        })
        .catch((e) => {
            dispatch(setErrorMess(e));
          })
        .finally(() => {
            dispatch(setLoading(false));
        });
    }

    // useEffect(() => {
    //     const subscription = watch((value, { name, type }) => {
    //         if (name === "avatar") {
    //             if (typeof value.avatar === 'object') {
    //                 const form = new FormData()
    //                 form.append('avatar', value.avatar)
    //                 UserService.updateAvatar(form)
    //                     .then(() => {
    //                         dispatch(getMe())
    //                     })
    //                     .catch((e) => dispatch(setErrorMess(e)))
    //                     .finally(() => dispatch(setLoading(false)))
    //             }
    //         }
    //     })
    //     return () => subscription.unsubscribe()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [watch])

    useEffect(() => {
        if(user) {
            UserService.getUserProfile(user?.id)
            .then((res) => {
                reset({
                    avatar: res.avatar,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    email: res.email,
                    phoneNumber: res.phoneNumber,
                    address: res.address,                   
                })
            })
            .catch((err) => dispatch(setErrorMess(err)))
            .finally(() => dispatch(setLoading(false)));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, dispatch])

    return (
        <>
            <Row className={classes.personalInfor}>
                <div className={classes.photoContainer}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field }) => <UploadAvatar
                            file={field.value}
                            errorMessage={errors.avatar?.message}
                            onChange={(value) => field.onChange(value)}
                            className={classes.avatar}
                        />}
                    />
                    <div className={classes.uploadImage}>
                        <FontAwesomeIcon icon={faCamera}/>
                    </div>
                 </div>
                <div className={classes.information}>
                    <h4>{user?.firstName} {user?.lastName}</h4>
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
                        disabled
                    />
                    <InputTextFieldBorder
                        className="mb-4"
                        label="Phone"
                        optional={true}
                        name="phone"
                        placeholder="Phone"
                        type="text"
                        inputRef={register("phoneNumber")}
                        errorMessage={errors.phoneNumber?.message}
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
                    <Button btnType={BtnType.Primary} type="submit" className={classes.btnSave}>
                        Save change
                    </Button>
                </Form>
            </Container>
        </>
    );
});

export default UserProfile;