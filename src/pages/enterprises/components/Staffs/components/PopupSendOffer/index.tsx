import React, { memo, useMemo } from "react";
import {
  Modal,
  ModalProps,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputTextfield from "components/common/inputs/InputTextfield";
import { Grid } from "@mui/material";
import { StaffService } from "services/enterprise/staff";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { useDispatch } from "react-redux";
interface Props extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggle?: () => void;
  onYes?: () => void;
}

interface SendOfferForm {
  email: string;
}

// eslint-disable-next-line react/display-name
const PopupConfirmDeleteTour = memo((props: Props) => {
  const { isOpen, toggle, onClose, onYes } = props;

  const dispatch = useDispatch();

  const schema = useMemo(() => {
    return yup.object().shape({
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    reset,
  } = useForm<SendOfferForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const clearForm = () => {
    reset({
      email: "",
    });
  };

  const handleClose = () => {
    onClose();
    clearForm();
  };

  const _onSubmit = (data: SendOfferForm) => {
    dispatch(setLoading(true));
    StaffService.sendOffer({ email: data?.email })
      .then(() => {
        dispatch(setSuccessMess("Send offer successfully"));
        onClose();
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className={classes.root}>
        <Grid component="form" onSubmit={handleSubmit(_onSubmit)}>
          <ModalHeader toggle={toggle} className={classes.title}>
            CREATE STAFF
          </ModalHeader>
          <ModalBody>
            <InputTextfield
              title="Email"
              placeholder="Enter your email"
              type="email"
              inputRef={register("email")}
              errorMessage={errors.email?.message}
            />
          </ModalBody>
          <ModalFooter className={classes.footer}>
            <Button
              btnType={BtnType.Secondary}
              onClick={handleClose}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button btnType={BtnType.Primary} type="submit">
              Send
            </Button>
          </ModalFooter>
        </Grid>
      </Modal>
    </>
  );
});

export default PopupConfirmDeleteTour;
