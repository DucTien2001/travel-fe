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
import { faCircleXmark, faListCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import { clsx } from "clsx";
import InputTextField from "components/common/inputs/InputTextField";
import UploadImage from "components/UploadImage";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { ImageService } from "services/image";
import { RoomService } from "services/enterprise/room";
import { EditRoomInformation } from "models/room";

const FILE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const PHOTO_SIZE = 10000000000; // bytes
const MAX_IMAGES = 9;
const MIN_IMAGES = 3;
export interface RoomForm {
    title: string;
    description: string;
    imagesRoom: string[];
    tags: string[];
    discount: number;
    numberOfBed: number;
    numberOfRoom: number;
}

interface Props extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemEdit: EditRoomInformation;
}

// eslint-disable-next-line react/display-name
const PopupEditRoomInformation = memo((props: Props) => {
  const dispatch = useDispatch();
  const { isOpen, onClose, itemEdit } = props;

  const schema = useMemo(() => {
    return yup.object().shape({
      title: yup.string().required("Name is required"),
      description: yup.string().required("Name is required"),
      tags: yup.string().required("Name is required"),
      discount: yup.number().required("Name is required"),
      numberOfBed: yup.number().required("Name is required"),
      numberOfRoom: yup.number().required("Name is required"),
      imagesRoom: yup.mixed().test("required", "Please select images", (value) => {
        return value && value.length;
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<RoomForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const clearForm = () => {
    reset({
      title: "",
      description: "",
      tags: [],
      numberOfBed: null,
      numberOfRoom: null,
      imagesRoom: [],
      discount: null,
    })
  }
  const _onSubmit = async (data: RoomForm) => {
    // dispatch(setLoading(true));
    // const arrRequest = [];
    // await data?.room.map(async (item) => {
    //   const uploader = [];
    //   await item?.imagesRoom?.map(async (file) => {
    //     const formData: any = new FormData();
    //     formData.append("file", file);
    //     formData.append("tags", "codeinfuse, medium, gist");
    //     formData.append("upload_preset", "my-uploads");
    //     formData.append("api_key", "859398113752799");
    //     formData.append("timestamp", Date.now() / 1000 / 0);
    //     uploader.push(ImageService.uploadImage(formData));
    //   });

    //   await Promise.all(uploader).then((images) => {
    //     const roomData = {
    //       title: item?.title,
    //       description: item?.description,
    //       tags: item.tags,
    //       images: images,
    //       hotelId: hotelId,
    //       discount: item?.discount,
    //       numberOfBed: item?.numberOfRoom,
    //       numberOfRoom: item?.numberOfBed,
    //     };

    //     // arrRequest.push(RoomService.createRoom(roomData));
    //   });
    // });
    // Promise.all(arrRequest)
    //   .then(() => {
    //     dispatch(setSuccessMess("Create room(s) successfully"));
    //   })
    //   .catch((e) => {
    //     dispatch(setErrorMess(e));
    //   })
    //   .finally(() => {
    //     onClose();
    //     clearForm();
    //     dispatch(setLoading(false));
    //   });
  };

  useEffect(() => {
    if (itemEdit) {
      reset({
        title: itemEdit.title,
        description: itemEdit.description,
        tags: itemEdit.tags,
        numberOfBed: itemEdit.numberOfBed,
        numberOfRoom: itemEdit.numberOfRoom,
        imagesRoom: itemEdit.images,
        discount: itemEdit.discount || null,
      })
    }
  }, [reset, itemEdit])

    useEffect(() => {
    if (!isOpen && !itemEdit) {
      clearForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, itemEdit])
  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose} className={classes.root}>
        <ModalHeader toggle={onClose} className={classes.title}>
          Edit room
        </ModalHeader>
        <Form role="form" onSubmit={handleSubmit(_onSubmit)} className={classes.form}>
          <ModalBody>
                  <Row className={classes.row}>
                    <Col>
                      <InputTextFieldBorder
                        label="Title"
                        className="mr-3"
                        placeholder="Enter title"
                        inputRef={register("title")}
                        errorMessage={errors.title?.message}
                      />
                    </Col>
                  </Row>
                  <Row className={classes.row}>
                    <Col>
                      <InputTextFieldBorder
                        label="Description"
                        className="mr-3"
                        placeholder="Enter description"
                        inputRef={register("description")}
                        errorMessage={errors.description?.message}
                      />
                    </Col>
                  </Row>
                  <Row className={classes.row}>
                    <Col>
                      <InputTextFieldBorder
                        label="Tags"
                        className="mr-3"
                        placeholder="Enter tags"
                        inputRef={register("tags")}
                        errorMessage={errors.tags?.message}
                      />
                    </Col>
                  </Row>
                  <Row className={classes.row}>
                    <Col>
                      <InputTextFieldBorder
                        label="Number of bed"
                        className="mr-3"
                        placeholder="Enter number of bed"
                        inputRef={register("numberOfBed")}
                        errorMessage={errors.numberOfBed?.message}
                      />
                    </Col>
                  </Row>
                  <Row className={classes.row}>
                    <Col>
                      <InputTextFieldBorder
                        label="Number of room"
                        className="mr-3"
                        placeholder="Enter number of room"
                        inputRef={register("numberOfRoom")}
                        errorMessage={errors.numberOfRoom?.message}
                      />
                    </Col>
                  </Row>
                  <Row className={classes.row}>
                    <Col>
                      <InputTextFieldBorder
                        label="Discount"
                        className="mr-3"
                        placeholder="Enter discount"
                        inputRef={register("discount")}
                        errorMessage={errors.discount?.message}
                      />
                    </Col>
                  </Row>
                  {/* row images */}
                  <Controller
                    name={"imagesRoom"}
                    control={control}
                    render={({ field }) => (
                      <UploadImage
                        title="Upload your hotel images"
                        files={field.value as unknown as File[]}
                        onChange={(value) => field.onChange(value)}
                        errorMessage={errors.imagesRoom?.message}
                      />
                    )}
                  />
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

export default PopupEditRoomInformation;
