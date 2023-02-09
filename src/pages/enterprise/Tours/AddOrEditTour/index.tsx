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
  Input,
} from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputTags from "components/common/inputs/InputTags";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UploadImage from "components/UploadImage";
import UploadFile from "components/UploadFile";
import { useDispatch } from "react-redux";
import { TourService } from "services/enterprise/tour";
import useAuth from "hooks/useAuth";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { ETour } from "models/enterprise";
import axios from "axios";
import { ImageService } from "services/image";
import { getAllTours } from "redux/reducers/Enterprise/actionTypes";
import { getAllTours as getAllToursNormal } from "redux/reducers/Normal/actionTypes";
import { tagsOption, VALIDATION } from "configs/constants";
import InputSelect from "components/common/inputs/InputSelect";
import { OptionItem } from "models/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "components/common/CustomSelect";
import clsx from "clsx";
import ReactQuill from "react-quill";
import ErrorMessage from "components/common/texts/ErrorMessage";
import "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
    [{ color: [] }, { background: [] }],
  ],
};

export interface TourForm {
  name: string;
  description: string;
  businessHours: string[];
  location: string;
  price: number;
  discount?: number;
  contact: string;
  tags: OptionItem<string>[];
  isTemporarilyStopWorking: boolean;
  images?: string[] | File[];
}

interface Props {
  itemEdit?: ETour;
}

// eslint-disable-next-line react/display-name
const AddOrEditTour = memo((props: Props) => {
  const { itemEdit } = props;
  const dispatch = useDispatch();
  const { user } = useAuth();

  const schema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required("Name is required"),
      description: yup.string().required("Description is required"),
      businessHours: yup
        .mixed()
        .test("required", "Hours is required", (value) => {
          return value && value.length;
        }),
      location: yup.string().required("Location is required"),
      price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required"),
      discount: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .typeError("Discount must be a number")
        .notRequired(),
      tags: yup
        .array(
          yup.object({
            name: yup.string().required("Tags is required."),
          })
        )
        .required("Tags is required.")
        .min(1, "Tags is required."),
      contact: yup
        .string()
        .required("Contact is required")
        .matches(VALIDATION.phone, {
          message: "Please enter a valid phone number.",
          excludeEmptyString: true,
        }),
      // images: yup.mixed().test("required", "Please select images", (value) => {
      //   return value && value.length;
      // }),
      // imagesRoom: yup.array().notRequired(),
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
      businessHours: [],
      location: "",
      price: null,
      discount: null,
      tags: [],
      contact: "",
      images: [],
    });
  };

  const _onSubmit = (data: TourForm) => {
    // dispatch(setLoading(true));
    // const uploader = [];
    // data?.images?.map((file) => {
    //   const formData: any = new FormData();
    //   formData.append("file", file);
    //   formData.append("tags", "codeinfuse, medium, gist");
    //   formData.append("upload_preset", "my-uploads");
    //   formData.append("api_key", "859398113752799");
    //   formData.append("timestamp", Date.now() / 1000 / 0);
    //   uploader.push(ImageService.uploadImage(formData));
    // });
    // await Promise.all(uploader)
    //   .then((res) => {
    //     if (itemEdit) {
    //       TourService.updateTour(itemEdit?.id, {
    //         title: data.name,
    //         description: data.description,
    //         businessHours: data.businessHours,
    //         location: data.location,
    //         price: data.price,
    //         discount: data.discount,
    //         tags: data.tags.map((it) => it.name),
    //         contact: data.contact,
    //         images: res,
    //       })
    //       .then(() => {
    //         dispatch(getAllTours(user?.id));
    //         dispatch(getAllToursNormal());
    //         dispatch(setSuccessMess("Update tour successfully"));
    //       })
    //       .catch((e) => {
    //         dispatch(setErrorMess(e));
    //       });
    //     } else {
    //       if (user) {
    //         TourService.createTour({
    //           title: data.name,
    //           description: data.description,
    //           businessHours: data.businessHours,
    //           location: data.location,
    //           price: data.price,
    //           discount: data.discount,
    //           tags: data.tags.map((it) => it.name),
    //           contact: data.contact,
    //           images: res,
    //           creator: user?.id,
    //         })
    //           .then(() => {
    //             dispatch(getAllTours(user?.id));
    //             dispatch(getAllToursNormal());
    //             dispatch(setSuccessMess("Create tour successfully"));
    //           })
    //           .catch((e) => {
    //             dispatch(setErrorMess(e));
    //           });
    //       }
    //     }
    //   })
    //   .catch((e) => {
    //     dispatch(setErrorMess(e));
    //   })
    //   .finally(() => {
    //     onClose();
    //     dispatch(setLoading(false));
    //   });

    dispatch(setLoading(true));
    if (user) {
      TourService.createTour({
        title: data.name,
        description: data.description,
        businessHours: data.businessHours,
        location: data.location,
        price: data.price,
        discount: data.discount,
        tags: data.tags.map((it) => it.name),
        contact: data.contact,
        images: imagesPreview,
        creator: user?.id,
      })
        .then(() => {
          dispatch(getAllTours(user?.id));
          dispatch(getAllToursNormal());
          dispatch(setSuccessMess("Create tour successfully"));
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        });
    }
    // console.log({title: data.name,
    //   description: data.description,
    //   businessHours: data.businessHours,
    //   location: data.location,
    //   price: data.price,
    //   discount: data.discount,
    //   tags: data.tags.map((it) => it.name),
    //   contact: data.contact,
    //   images: imagesPreview,
    //   creator: user?.id})
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
        tags: itemEdit.tags.map((it) => ({ name: it })),
        contact: itemEdit.contact,
        // images: itemEdit.images,
      });
      setImagesPreview(itemEdit.images);
    }
  }, [reset, itemEdit]);

  useEffect(() => {
    if (!itemEdit) {
      clearForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemEdit]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleFile = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append("upload_preset", "abez7vqo");
      images.push(await ImageService.uploadImage(formData));
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
  };
  return (
    <>
      <div className={classes.root}>
        <Form
          role="form"
          onSubmit={handleSubmit(_onSubmit)}
          className={classes.form}
        >
          <Row className={clsx(classes.rowHeaderBox, classes.title)}>
            {!itemEdit ? <h3>Create tour</h3> : <h3>Edit tour</h3>}
          </Row>
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
              <CustomSelect
                label="Tags"
                className={classes.input}
                placeholder="Please choose the tags your tour"
                name="tags"
                control={control}
                options={tagsOption}
                isMulti
                errorMessage={errors.tags?.message}
              />
            </Col>
          </Row>
          <Row className={classes.row}>
            <Col>
              <p className={classes.titleInput}>Description</p>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    modules={modules}
                    className={clsx(classes.editor, {
                      [classes.editorError]: !!errors.description?.message,
                    })}
                    value={field.value || ""}
                    onBlur={() => field.onBlur()}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {errors.description?.message && (
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
              )}
            </Col>
          </Row>
          {/* <Controller
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
            /> */}
          {/* <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <UploadImage
                  title="Upload your tour images"
                  files={field.value as unknown as File[]}
                  onChange={(value) => field.onChange(value)}
                  errorMessage={errors.images?.message}
                />
              )}
            /> */}
          <Row className={classes.row}>
            <Col>
              <p className={classes.titleInput}>Upload images</p>
              <div className={classes.containerUploadImg}>
                <label htmlFor="file" className={classes.boxUpload}>
                  <div>
                    <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
                    {isLoading ? <h4>Uploading...</h4> : <h4>Upload images</h4>}
                  </div>
                </label>
                <Input
                  inputRef={register("images")}
                  onChange={handleFile}
                  hidden
                  type="file"
                  id="file"
                  multiple
                />
              </div>
            </Col>
          </Row>
          <Row className={classes.row}>
            <Col>
              <p className={classes.titleUpload}>Images preview</p>
              <Row>
                {imagesPreview?.map((item, index) => {
                  return (
                    <Col key={index} xs={4} className={classes.imgPreview}>
                      <img src={item} alt="preview" />
                      <div
                        onClick={() => handleDeleteImage(item)}
                        title="Delete"
                        className={classes.iconDelete}
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </div>
                    </Col>
                  );
                })}

                {!imagesPreview?.length && (
                  <Col className={classes.noImg}>
                    <h4>No photos uploaded yet</h4>
                  </Col>
                )}
              </Row>
              <Row className={classes.footer}>
                <Button
                  btnType={BtnType.Primary}
                  type="submit"
                  className={classes.btnSave}
                >
                  Save
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
});

export default AddOrEditTour;
