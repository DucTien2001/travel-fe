import React, { useMemo, memo, useCallback, useState, useEffect } from "react";
import {
  Row,
  Form,
  Modal,
  ModalProps,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
} from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputSelect from "components/common/inputs/InputSelects";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "components/common/texts/ErrorMessage";
import { fData } from "utils/formatNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import UploadAvatar from "components/UploadAvatar";
import clsx from "clsx";
import { OptionItem } from "models/general";
import { adminTypes, User } from "models/user";
import { VALIDATION } from "configs/constants";

const FILE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const PHOTO_SIZE = 10000000000; // bytes
const MAX_IMAGES = 9;
const MIN_IMAGES = 3;
export interface TourForm {
  avatar: File | string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  adminTypeId: OptionItem;
}

interface Props extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggle: () => void;
  itemEdit?: User;
}

// eslint-disable-next-line react/display-name
const PopupAddOrEditUser = memo((props: Props) => {
  const { isOpen, toggle, onClose, itemEdit, rest } = props;

  const [images, setImages] = useState<any>([]);
  const [isError, setIsError] = useState<string>("");

  const schema = useMemo(() => {
    return yup.object().shape({
      avatar: yup.mixed(),
      firstName: yup.string().required("First name is required."),
      lastName: yup.string().required("Last name is required."),
      email: yup
        .string()
        .email("Please enter a valid email adress")
        .required("Email is required."),
      password: itemEdit
        ? yup.string()
        : yup
            .string()
            .matches(VALIDATION.password, {
              message:
                "Password must contains at least 8 characters, including at least one letter and one number and a special character.",
              excludeEmptyString: true,
            })
            .required("Password is required."),
      adminTypeId: yup.object().required("Admin type is required."),
      phone: yup
        .string()
        .matches(VALIDATION.phone, {
          message: "Please enter a valid phone number.",
          excludeEmptyString: true,
        })
        .notRequired(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
    clearErrors,
  } = useForm<TourForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const clearForm = () => {
    reset({
      avatar: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      adminTypeId: {},
    });
  };

  const _onSubmit = () => {};

  useEffect(() => {
    if (!isOpen) {
      clearForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (itemEdit) {
      reset({
        avatar: itemEdit.avatar,
        firstName: itemEdit.firstName || "",
        lastName: itemEdit.lastName || "",
        email: itemEdit.username || "",
        password: itemEdit.passWord || "",
        phone: itemEdit.phoneNumber || "",
      });
    }
  }, [reset, itemEdit]);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
        <ModalHeader toggle={toggle} className={classes.title}>
          Create user
        </ModalHeader>
        <Form
          role="form"
          onSubmit={handleSubmit(_onSubmit)}
          className={classes.form}
        >
          <ModalBody>
            <Row className={clsx(classes.boxUploadAvatar, classes.row)}>
              <div>
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <UploadAvatar
                      square
                      file={field.value}
                      errorMessage={errors.avatar?.message}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>
            </Row>
            <Row xs={6} sm={12} className={classes.row}>
              <Col>
                <InputTextFieldBorder
                  label="First name"
                  className="mr-3"
                  placeholder="Enter first name"
                  inputRef={register("firstName")}
                  errorMessage={errors.firstName?.message}
                />
              </Col>
              <Col>
                <InputTextFieldBorder
                  label="Last name"
                  placeholder="Enter last name"
                  inputRef={register("lastName")}
                  errorMessage={errors.lastName?.message}
                />
              </Col>
            </Row>
            <Row xs={6} sm={12} className={classes.row}>
              <Col>
                <InputTextFieldBorder
                  label="Email"
                  className="mr-3"
                  placeholder="Enter email"
                  inputRef={register("email")}
                  errorMessage={errors.email?.message}
                />
              </Col>
              <Col>
                <InputTextFieldBorder
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  showEyes={true}
                  inputRef={register("password")}
                  errorMessage={errors.password?.message}
                />
              </Col>
            </Row>
            <Row xs={6} sm={12} className={classes.row}>
              <Col>
                <InputTextFieldBorder
                  label="Phone"
                  className="mr-3"
                  placeholder="Enter phone"
                  inputRef={register("phone")}
                  errorMessage={errors.phone?.message}
                />
              </Col>
              <Col>
                <InputSelect
                  label="Admin type"
                  name="adminTypeId"
                  placeholder="Please choose admin type"
                  // inputRef={register("description")}
                  control={control}
                  options={adminTypes}
                  errorMessage={(errors.adminTypeId as any)?.message}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className={classes.footer}>
            <Button btnType={BtnType.Primary} type="submit">
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
});

export default PopupAddOrEditUser;
