import React, { useMemo, memo, useCallback, useState, useEffect } from "react";
import { Row, Form, Col, Input } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputTags from "components/common/inputs/InputTags";
import InputSelect from "components/common/inputs/InputSelect";
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
import { languagesType, OptionItem } from "models/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCamera,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "components/common/CustomSelect";
import clsx from "clsx";
import ErrorMessage from "components/common/texts/ErrorMessage";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { EActiveNav } from "pages/enterprise";
import InputTextfield from "components/common/inputs/InputTextfield";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import InputCreatableSelect from "components/common/inputs/InputCreatableSelect";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
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
  title: string;
  city: string;
  district: string;
  commune: string;
  moreLocation?: string;
  contact: string;
  description: string;
  highlight: string;
  suitablePerson: OptionItem<string>[];
  quantity: number;
  numberOfDays: number;
  numberOfNights: number;
  termsAndCondition: string;
  images?: File[];
}

interface Props {
  value: number;
  index: number;
  itemEdit?: ETour;
}

// eslint-disable-next-line react/display-name
const InformationComponent = memo((props: Props) => {
  const { value, index, itemEdit } = props;
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidValue, setIsValidValue] = useState(false);

  const schema = useMemo(() => {
    return yup.object().shape({
      title: yup.string().required("Name is required"),
      city: yup.string().required("City  is required"),
      district: yup.string().required("District is required"),
      commune: yup.string().required("Commune is required"),
      moreLocation: yup.string().required("More location is required"),
      contact: yup
        .string()
        .required("Contact is required")
        .matches(VALIDATION.phone, {
          message: "Please enter a valid phone number.",
          excludeEmptyString: true,
        }),
      description: yup.string().required("Description is required"),
      highlight: yup.string().required("Highlight is required"),
      suitablePerson: yup
        .array(
          yup.object({
            name: yup.string().required("Suitable person is required."),
          })
        )
        .required("Suitable person is required."),
      quantity: yup
        .number()
        .typeError("Quantity is required.")
        .positive("Quantity must be a positive number")
        .required("Quantity is required."),
      numberOfDays: yup
        .number()
        .typeError("Number of days is required.")
        .positive("Number of days  must be a positive number")
        .required("Number of days  is required."),
      numberOfNights: yup
        .number()
        .typeError("Number of nights  is required.")
        .positive("Number of nights  must be a positive number")
        .required("Number of nights  is required."),
      termsAndCondition: yup
        .string()
        .required("Terms and Condition is required"),
      images: yup.array(
        yup.mixed()
      ),
      // imagesRoom: yup.array().notRequired(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    control,
    watch,
  } = useForm<TourForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const clearForm = () => {
    reset({
      title: "",
      city: "",
      district: "",
      commune: "",
      moreLocation: "",
      contact: "",
      description: "",
      suitablePerson: [],
      quantity: null,
      numberOfDays: null,
      numberOfNights: null,
      highlight: "",
      termsAndCondition: "",
      images: [],
    });
  };

  const handleFile = async (e) => {
    e.stopPropagation();
    let files = e.target.files;
    const _image = getValues("images")
    setValue("images", [..._image, files[0]])
    for (let file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagesPreview((prevState: any) => [...prevState, reader.result]);
      };
    }
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
  };

  const _onSubmit = (data: TourForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("city", data.city);
    formData.append("district", data.district);
    formData.append("commune", data.commune);
    formData.append("moreLocation", data.moreLocation);
    formData.append("contact", data.contact);
    formData.append("description", data.description);
    formData.append("suitablePerson", `${data.suitablePerson}`);
    formData.append("quantity", `${data.quantity}`);
    formData.append("numberOfDays", `${data.numberOfDays}`);
    formData.append("numberOfNights", `${data.numberOfNights}`);
    formData.append("highlight", data.highlight);
    formData.append("termsAndCondition", data.termsAndCondition);
    data?.images?.forEach((item, index) => {
      formData.append(`images${index}`, item);
    })
    // formData.append("user", `${user}`);
    TourService.createTour(formData)
      .then(() => {
        dispatch(setSuccessMess("Create tour successfully"));
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  // useEffect(() => {
  //   if (itemEdit) {
  //     reset({
  //       name: itemEdit.title,
  //       description: itemEdit.description,
  //       businessHours: itemEdit.businessHours,
  //       location: itemEdit.location,
  //       price: itemEdit.price,
  //       discount: itemEdit.discount || null,
  //       tags: itemEdit.tags.map((it) => ({ name: it })),
  //       contact: itemEdit.contact,
  //       // images: itemEdit.images,
  //     });
  //     setImagesPreview(itemEdit.images);
  //   }
  // }, [reset, itemEdit]);

  useEffect(() => {
    if (!itemEdit) {
      clearForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemEdit]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Grid
          component="form"
          onSubmit={handleSubmit(_onSubmit)}
          className={classes.form}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputTextfield
                title="Tour's name"
                placeholder="Enter tour's name"
                inputRef={register("title")}
                autoComplete="off"
                name="title"
                errorMessage={errors.title?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextfield
                title="Contact"
                placeholder="Enter contact"
                autoComplete="off"
                name="contact"
                inputRef={register("contact")}
                errorMessage={errors.contact?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextfield
                title="City"
                placeholder="Enter city"
                autoComplete="off"
                name="city"
                inputRef={register("city")}
                errorMessage={errors.city?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextfield
                title="District"
                placeholder="Enter district"
                name="district"
                inputRef={register("district")}
                errorMessage={errors.district?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextfield
                title="Commune"
                autoComplete="off"
                placeholder="Enter commune"
                name="commune"
                inputRef={register("commune")}
                errorMessage={errors.commune?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextfield
                title="More location"
                placeholder="Enter more location"
                autoComplete="off"
                name="moreLocation"
                inputRef={register("moreLocation")}
                errorMessage={errors.moreLocation?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputCreatableSelect
                title="Suitable person"
                name="suitablePerson"
                control={control}
                selectProps={{
                  options: [],
                  isClearable: true,
                  isMulti: true,
                  placeholder: "Select suitable person",
                }}
                errorMessage={errors.suitablePerson?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextfield
                title="Quantity ticket"
                placeholder="Enter quantity ticket"
                autoComplete="off"
                name="quantity"
                inputRef={register("quantity")}
                errorMessage={errors.quantity?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextfield
                title="Number of days"
                placeholder="Enter number of days"
                autoComplete="off"
                name="numberOfDays"
                inputRef={register("numberOfDays")}
                errorMessage={errors.numberOfDays?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextfield
                title="Number of nights"
                placeholder="Enter number of nights"
                autoComplete="off"
                name="numberOfNights"
                inputRef={register("numberOfNights")}
                errorMessage={errors.numberOfNights?.message}
              />
            </Grid>
            <Grid xs={12} item>
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
            </Grid>
            <Grid xs={12} item>
              <p className={classes.titleInput}>Highlight</p>
              <Controller
                name="highlight"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    modules={modules}
                    className={clsx(classes.editor, {
                      [classes.editorError]: !!errors.highlight?.message,
                    })}
                    value={field.value || ""}
                    onBlur={() => field.onBlur()}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {errors.highlight?.message && (
                <ErrorMessage>{errors.highlight?.message}</ErrorMessage>
              )}
            </Grid>
            <Grid xs={12} item>
              <p className={classes.titleInput}>Terms and condition</p>
              <Controller
                name="termsAndCondition"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    modules={modules}
                    className={clsx(classes.editor, {
                      [classes.editorError]:
                        !!errors.termsAndCondition?.message,
                    })}
                    value={field.value || ""}
                    onBlur={() => field.onBlur()}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {errors.termsAndCondition?.message && (
                <ErrorMessage>{errors.termsAndCondition?.message}</ErrorMessage>
              )}
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <p className={classes.titleInput}>Images preview</p>
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
            </Grid>
          </Grid>

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
        </Grid>
      )}
    </div>
  );
});

export default InformationComponent;
