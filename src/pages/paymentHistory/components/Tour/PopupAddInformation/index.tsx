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
  Table,
  Card,
  CardBody,
  CardHeader,
  Collapse,
} from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import * as yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "components/common/texts/ErrorMessage";
import { fData } from "utils/formatNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faListCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import { clsx } from "clsx";
import InputTextField from "components/common/inputs/InputTextfield";
import UploadImage from "components/UploadImage";
import { useDispatch } from "react-redux";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { ImageService } from "services/image";
import { RoomService } from "services/enterprise/room";
import { getAllHotels } from "redux/reducers/Enterprise/actionTypes";
import useAuth from "hooks/useAuth";
import InputTags from "components/common/inputs/InputTags";
import { OptionItem } from "models/general";
import { VALIDATION, tagsOption } from "configs/constants";
import InputSelect from "components/common/inputs/InputSelects";
import { Grid } from "@mui/material";
import InputTextfield from "components/common/inputs/InputTextfield";
import { TourBill } from "models/tourBill";
import { TourBillService } from "services/normal/tourBill";

export interface ParticipantForm {
  participant: {
    fullName: string;
    phoneNumber: string;
  }[];
}

interface Props extends ModalProps {
  tourBill?: TourBill;
  isOpen: boolean;
  onClose: () => void;
  fetchDataTourBill: () => void;
}

// eslint-disable-next-line react/display-name
const PopupAddOrEditHotel = memo((props: Props) => {
  const dispatch = useDispatch();
  const { isOpen, onClose, tourBill, fetchDataTourBill } = props;
  const schema = useMemo(() => {
    return yup.object().shape({
      participant: yup.array(
        yup.object({
          fullName: yup.string().required("Full name is required"),
          phoneNumber: yup
            .string()
            .required("Phone is required")
            .matches(VALIDATION.phone, {
              message: "Please enter a valid phone number.",
              excludeEmptyString: true,
            }),
        })
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ParticipantForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participant",
  });

  const onAddParticipant = () => {
    append({
      fullName: "",
      phoneNumber: "",
    });
  };

  const onRemoveParticipant = (index: number) => {
    remove(index);
  };

  const clearForm = () => {
    reset({
      participant: [],
    });
  };

  const _onSubmit = async (data: ParticipantForm) => {
    dispatch(setLoading(true));
    TourBillService.updateTourBill(tourBill?.id, {
      participantsInfo: data?.participant?.map((item) => ({
        fullName: item?.fullName,
        phoneNumber: item?.phoneNumber,
      })),
    })
      .then(() => {
        onClose();
        fetchDataTourBill();
        dispatch(setSuccessMess("Update participant information successfully"));
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    onAddParticipant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array?.isArray(tourBill?.participantsInfo)) {
      reset({
        participant: tourBill?.participantsInfo?.map((item) => ({
          fullName: item.fullName,
          phoneNumber: item.phoneNumber,
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourBill]);

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose} className={classes.root}>
        <ModalHeader toggle={onClose} className={classes.title}>
          Participant Information
        </ModalHeader>
        <Form
          role="form"
          onSubmit={handleSubmit(_onSubmit)}
          className={classes.form}
        >
          <ModalBody>
            <Row className={clsx(classes.boxTitleRoomNumber, classes.row)}>
              <Col>
                <p>Booking information:</p>
              </Col>
            </Row>
            <Grid spacing={2} container>
              <Grid item xs={6}>
                <InputTextfield
                  value={`${tourBill?.lastName} ${tourBill?.firstName}`}
                  title="Full name"
                  placeholder="Enter your full name"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextfield
                  value={`${tourBill?.phoneNumber}`}
                  title="Phone number"
                  placeholder="Enter your phone number"
                  disabled
                />
              </Grid>
            </Grid>
            {fields?.map((field, index) => (
              <>
                <Row className={clsx(classes.boxTitleRoomNumber, classes.row)}>
                  <Col>
                    <p>Participant {index + 1} :</p>
                  </Col>
                  {fields?.length > 1 && (
                    <Col className={classes.boxDeleteRoom}>
                      <div onClick={() => onRemoveParticipant(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    </Col>
                  )}
                </Row>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  key={index}
                >
                  <Grid item xs={6}>
                    <InputTextfield
                      title="Full name"
                      placeholder="Enter your full name"
                      inputRef={register(`participant.${index}.fullName`)}
                      errorMessage={
                        errors.participant &&
                        errors.participant[index]?.fullName?.message
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputTextfield
                      title="Phone number"
                      placeholder="Enter your phone number"
                      inputRef={register(`participant.${index}.phoneNumber`)}
                      errorMessage={
                        errors.participant &&
                        errors.participant[index]?.phoneNumber?.message
                      }
                    />
                  </Grid>
                </Grid>
              </>
            ))}
            <Row className={classes.row}>
              <Col className={classes.boxClickAdd} onClick={onAddParticipant}>
                <FontAwesomeIcon icon={faListCheck} />
                Click add to participant
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

export default PopupAddOrEditHotel;
