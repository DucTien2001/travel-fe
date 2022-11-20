import React, { useMemo, memo } from "react";
import { Row, Form, Modal, ModalProps, ModalHeader, ModalBody, ModalFooter, Col } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import InputTags from "components/common/inputs/InputTags";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import UploadImage from "components/UploadImage";
import { HotelService } from "services/enterprise/hotel";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { ImageService } from "services/image";
import { ReducerType } from "redux/reducers";

export interface HotelForm {
  name: string;
  description: string;
  location: string;
  contact: string;
  checkInTime: string;
  checkOutTime: string;
  tags: string[];
  isTemporarilyStopWorking: boolean;
  imagesHotel: string[];
  creator: number;
}

interface Props extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggle: () => void;
}

// eslint-disable-next-line react/display-name
const PopupAddOrEditHotel = memo((props: Props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReducerType) => state.user);
  const { isOpen, toggle, onClose, rest } = props;

  const schema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required("Name is required"),
      description: yup.string().required("Description is required"),
      location: yup.string().required("Location is required"),
      contact: yup.string().required("Contact is required"),
      checkInTime: yup.string().required("Check in time is required"),
      checkOutTime: yup.string().required("Check out time is required"),
      tags: yup.array().required("Tags is required"),
      isTemporarilyStopWorking: yup.boolean().required(),
      imagesHotel: yup.mixed().test("required", "Please select images", (value) => {
        return value && value.length;
      }),
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<HotelForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      isTemporarilyStopWorking: false,
    },
  });

  const clearForm = () => {
    reset({
      name: "",
      description: "",
      location: "",
      contact: "",
      checkInTime: "",
      checkOutTime: "",
      tags: [],
      isTemporarilyStopWorking: false,
      imagesHotel: [],
    });
  };

  const _onSubmit = async (data: HotelForm) => {
    dispatch(setLoading(true));
    const uploader = [];
    data?.imagesHotel?.map((file) => {
      const formData: any = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "my-uploads");
      formData.append("api_key", "859398113752799");
      formData.append("timestamp", Date.now() / 1000 / 0);
      uploader.push(ImageService.uploadImage(formData));
    });
    console.log(data);
    await Promise.all(uploader)
      .then((res) => {
        if (user) {
          HotelService.createHotel({
            name: data.name,
            description: data.description,
            checkInTime: data.checkInTime,
            checkOutTime: data.checkOutTime,
            location: data.location,
            contact: data.contact,
            tags: data.tags,
            images: res,
            creator: user?.id,
          })
            .then(() => {
              dispatch(setSuccessMess("Create hotel successfully"));
              // clearForm();
              // toggle();
            })
            .catch((e) => {
              dispatch(setErrorMess(e));
            });
        }
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        // onClose();
        dispatch(setLoading(false));
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
        <ModalHeader toggle={toggle} className={classes.title}>
          Create hotel
        </ModalHeader>
        <Form role="form" onSubmit={handleSubmit(_onSubmit)} className={classes.form}>
          <ModalBody>
            <Row xs={6} className={classes.row}>
              <Col>
                <InputTextFieldBorder
                  label="Name"
                  className="mr-3"
                  placeholder="Enter name"
                  inputRef={register("name")}
                  errorMessage={errors.name?.message}
                />
              </Col>
              <Col>
                <InputTextFieldBorder
                  label="Location"
                  placeholder="Enter location"
                  inputRef={register("location")}
                  errorMessage={errors.location?.message}
                />
              </Col>
            </Row>
            <Row xs={6} className={classes.row}>
              <Col>
                <InputTextFieldBorder
                  label="Check In Time"
                  className="mr-3"
                  placeholder="Enter check in"
                  inputRef={register("checkInTime")}
                  errorMessage={errors.checkInTime?.message}
                />
              </Col>
              <Col>
                <InputTextFieldBorder
                  label="Check Out Time"
                  placeholder="Enter check out"
                  inputRef={register("checkOutTime")}
                  errorMessage={errors.checkOutTime?.message}
                />
              </Col>
            </Row>
            <Row xs={6} className={classes.row}>
              <Col>
                <InputTextFieldBorder
                  label="Contact"
                  placeholder="Enter contact"
                  inputRef={register("contact")}
                  errorMessage={errors.contact?.message}
                />
              </Col>
              <Col>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <InputTags
                      {...field}
                      label="Tags"
                      name="tags"
                      placeholder="Enter tags"
                      onChange={(value: any) => {
                        return field.onChange(value);
                      }}
                      value={field.value ? field.value : []}
                      control={control}
                      errorMessage={errors.tags?.message}
                    />
                  )}
                />
              </Col>
            </Row>
            <Col>
              <InputTextArea
                label="Description"
                placeholder="Enter description"
                inputRef={register("description")}
                errorMessage={errors.description?.message}
              />
            </Col>
            <Controller
              name="imagesHotel"
              control={control}
              render={({ field }) => (
                <UploadImage
                  title="Upload your hotel images"
                  files={field.value as unknown as File[]}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={errors.imagesHotel?.message}
                />
              )}
            />
            <Row className={classes.row}>
              <Col>
                <InputCheckbox content="Temporarily stop working" inputRef={register("isTemporarilyStopWorking")} />
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
