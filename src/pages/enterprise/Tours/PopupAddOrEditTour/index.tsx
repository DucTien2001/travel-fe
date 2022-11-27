import React, { useMemo, memo, useCallback, useState, useEffect } from "react";
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
import UploadImage from "components/UploadImage";
import UploadFile from "components/UploadFile";
import { useDispatch } from "react-redux";
import { TourService } from "services/enterprise/tour";
import useAuth from "hooks/useAuth";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { ETour } from "models/enterprise";
import axios from "axios";
import { ImageService } from "services/image";
import { getAllTours } from "redux/reducers/Enterprise/actionTypes";
import { VALIDATION } from "configs/constants";

export interface TourForm {
  name: string;
  description: string;
  businessHours: string;
  location: string;
  price: number;
  discount?: number;
  contact: string;
  tags: string[];
  isTemporarilyStopWorking: boolean;
  images?: string[] | File[];
}

interface Props extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggle: () => void;
  itemEdit?: ETour;
}

// eslint-disable-next-line react/display-name
const PopupCreateTour = memo((props: Props) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { isOpen, toggle, onClose, itemEdit, rest } = props;

  const schema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required("Name is required"),
      description: yup.string().required("Description is required"),
      businessHours: yup.string().required("Hours is required"),
      location: yup.string().required("Location is required"),
      price: yup.number().typeError("Price must be a number").required("Price is required"),
      discount: yup.number().transform(value => (isNaN(value) ? undefined : value)).typeError("Discount must be a number").notRequired(),
      tags: yup.array().required("Tags is required"),
      contact: yup.string()
      .required("Contact is required")
      .matches(VALIDATION.phone, { message: 'Please enter a valid phone number.', excludeEmptyString: true }),
      isTemporarilyStopWorking: yup.boolean().required(),
      images: yup.mixed().test("required", "Please select images", (value) => {
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
  } = useForm<TourForm>({
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
      businessHours: "",
      location: "",
      price: null,
      discount: null,
      tags: [],
      contact: "",
      isTemporarilyStopWorking: false,
      images: [],
    });
  };
  
  const _onSubmit = async (data: TourForm) => {
    dispatch(setLoading(true));
    console.log("===========", data);
    const uploader = [];
    data?.images?.map((file) => {
      const formData: any = new FormData();
      formData.append("file", file);
      formData.append("tags", "codeinfuse, medium, gist");
      formData.append("upload_preset", "my-uploads");
      formData.append("api_key", "859398113752799");
      formData.append("timestamp", Date.now() / 1000 / 0);
      uploader.push(ImageService.uploadImage(formData));
    });
    await Promise.all(uploader)
      .then((res) => {
        if(itemEdit) {
          TourService.updateTour(itemEdit?.id, {
            title: itemEdit.title,
            description: itemEdit.description,
            businessHours: itemEdit.businessHours,
            location: itemEdit.location,
            price: itemEdit.price,
            discount: itemEdit.discount,
            tags: itemEdit.tags,
            contact: itemEdit.contact,
            images: itemEdit.images,
          })
          // console.log(res);
        }
        else {
        if (user) {
          TourService.createTour({
            title: data.name,
            description: data.description,
            businessHours: data.businessHours,
            location: data.location,
            price: data.price,
            discount: data.discount,
            tags: data.tags,
            contact: data.contact,
            images: res,
            creator: user?.id,
          })
            .then(() => {
              dispatch(getAllTours(user?.id))
              dispatch(setSuccessMess("Create tour successfully"));
            })
            .catch((e) => {
              dispatch(setErrorMess(e));
            });
        }
        }
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        onClose();
        dispatch(setLoading(false));
      });
  };
 
  useEffect(() => {
    if (itemEdit) {
      reset({
        name: itemEdit.title,
        description: itemEdit.description,
        businessHours: itemEdit.businessHours,
        location: itemEdit.location,
        price: itemEdit.price,
        discount: itemEdit.discount || null,
        tags: itemEdit.tags,
        contact: itemEdit.contact,
        images: itemEdit.images,
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
      <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
        <Form role="form" onSubmit={handleSubmit(_onSubmit)} className={classes.form}>
          <ModalHeader toggle={toggle} className={classes.title}>
            {!itemEdit ? <>Create tour</> : <>Edit tour</>}
          </ModalHeader>
          <ModalBody>
            <Row xs={6} sm={12} className={classes.row}>
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
            <Row xs={6} sm={12} className={classes.row}>
              <Col>
                <InputTextFieldBorder
                  label="Business hours"
                  className="mr-3"
                  placeholder="Enter business hours"
                  inputRef={register("businessHours")}
                  errorMessage={errors.businessHours?.message}
                />
              </Col>
              <Col>
                <InputTextFieldBorder
                  label="Contact"
                  className="mr-3"
                  placeholder="Enter contact"
                  inputRef={register("contact")}
                  errorMessage={errors.contact?.message}
                />
              </Col>
            </Row>
            <Row xs={6} sm={12} className={classes.row}>
              <Col>
                <InputTextFieldBorder
                  label="Price"
                  className="mr-3"
                  placeholder="Enter price"
                  inputRef={register("price")}
                  errorMessage={errors.price?.message}
                />
              </Col>
              <Col>
                <InputTextFieldBorder
                  label="Discount"
                  placeholder="Enter discount"
                  inputRef={register("discount")}
                  errorMessage={errors.discount?.message}
                />
              </Col>
            </Row>
            <Row className={classes.row}>
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
            <Row className={classes.row}>
              <Col>
                <InputTextArea
                  label="Description"
                  placeholder="Enter description"
                  inputRef={register("description")}
                  errorMessage={errors.description?.message}
                />
              </Col>
            </Row>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <UploadFile
                  title="Upload your tour images"
                  file={field.value ? field.value : []}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={errors.images?.message}
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

export default PopupCreateTour;