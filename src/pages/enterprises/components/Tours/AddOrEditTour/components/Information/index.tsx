import React, { useMemo, memo, useState, useEffect } from "react";
import { Row, Col, Input } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { TourService } from "services/enterprise/tour";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { ETour } from "models/enterprise";
import { VALIDATION } from "configs/constants";
import { OptionItem } from "models/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import ErrorMessage from "components/common/texts/ErrorMessage";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import InputTextfield from "components/common/inputs/InputTextfield";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import { setTourReducer } from "redux/reducers/Enterprise/actionTypes";
import { ProvinceService } from "services/address";
import InputSelect from "components/common/inputs/InputSelect";
import QueryString from "query-string";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

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
  city: OptionItem;
  district: OptionItem;
  commune: OptionItem;
  moreLocation?: string;
  contact: string;
  description: string;
  highlight: string;
  suitablePerson: string;
  numberOfDays: number;
  numberOfNights: number;
  termsAndCondition: string;
  images?: File[];
}

interface Props {
  value?: number;
  index?: number;
  itemEdit?: ETour;
  lang?: string;
  handleNextStep?: () => void;
}

// eslint-disable-next-line react/display-name
const InformationComponent = memo((props: Props) => {
  const { value, index, itemEdit, lang, handleNextStep } = props;
  const dispatch = useDispatch();

  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [oldImages, setOldImages] = useState<any>([]);
  const [imagesDeleted, setImagesDeleted] = useState([]);

  const schema = useMemo(() => {
    return yup.object().shape({
      title: yup.string().required("Name is required"),
      city: yup
        .object()
        .typeError("City is required.")
        .shape({
          id: yup.number().required("City is required"),
          name: yup.string().required(),
        })
        .required(),
      district: yup
        .object()
        .typeError("District is required.")
        .shape({
          id: yup.number().required("District is required"),
          name: yup.string().required(),
        })
        .required(),
      commune: yup
        .object()
        .typeError("Commune is required.")
        .shape({
          id: yup.number().required("Commune is required"),
          name: yup.string().required(),
        })
        .required(),
      moreLocation: yup.string().required("Detail address is required"),
      contact: yup
        .string()
        .required("Contact is required")
        .matches(VALIDATION.phone, {
          message: "Please enter a valid phone number.",
          excludeEmptyString: true,
        }),
      description: yup.string().required("Description is required"),
      highlight: yup.string().required("Highlight is required"),
      suitablePerson: yup.string().required("Suitable person is required."),
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
      images: yup.array(yup.mixed()),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<TourForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const clearForm = () => {
    reset({
      title: "",
      city: null,
      district: null,
      commune: null,
      moreLocation: "",
      contact: "",
      description: "",
      suitablePerson: "",
      numberOfDays: null,
      numberOfNights: null,
      highlight: "",
      termsAndCondition: "",
      images: [],
    });
  };

  const [imagesUpload, setImagesUpload] = useState([]);

  const handleFile = async (e) => {
    e.stopPropagation();
    let files = e.target.files;
    for (let file of files) {
      setImagesUpload((prevState: any) => [...prevState, file]);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagesPreview((prevState: any) => [...prevState, reader.result]);
      };
    }
  };

  const handleDeleteImage = (image, index) => {
    if (oldImages.includes(image)) {
      setImagesDeleted((prevState: any) => [...prevState, image]);
    }
    setOldImages((prevState: any) =>
      prevState?.filter((item) => item !== image)
    );
    setImagesPreview((prevState: any) =>
      prevState?.filter((item) => item !== image)
    );
    setImagesUpload((prevState: any) =>
      prevState?.filter((_, i) => i !== index)
    );
  };

  const fetchProvince = () => {
    const _provinces = provinces.map((item) => {
      return {
        id: item.province_id,
        name: item.province_name,
      };
    });
    return _provinces;
  };

  const watchCity = watch("city");

  const fetchDistrict = () => {
    const _districts = districts?.map((item) => {
      return {
        id: item.district_id,
        name: item.district_name,
      };
    });
    return _districts;
  };

  const watchDistrict = watch("district");

  const fetchCommune = () => {
    const _communes = communes?.map((item) => {
      return {
        id: item.ward_id,
        name: item.ward_name,
      };
    });
    return _communes;
  };

  const _onSubmit = (data: TourForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("city[id]", `${data?.city?.id}`);
    formData.append("city[name]", data?.city?.name);
    formData.append("district[id]", `${data?.district?.id}`);
    formData.append("district[name]", data?.district?.name);
    formData.append("commune[id]", `${data?.commune?.id}`);
    formData.append("commune[name]", data?.commune?.name);
    formData.append("moreLocation", data.moreLocation);
    formData.append("contact", data.contact);
    formData.append("description", data.description);
    formData.append("suitablePerson", `${data.suitablePerson}`);
    formData.append("numberOfDays", `${data.numberOfDays}`);
    formData.append("numberOfNights", `${data.numberOfNights}`);
    formData.append("highlight", data.highlight);
    formData.append("termsAndCondition", data.termsAndCondition);
    imagesUpload.forEach((item, index) => {
      formData.append(`imageFiles${index}`, item);
    });
    dispatch(setLoading(true));
    if (itemEdit) {
      const formDataEdit = new FormData();
      formDataEdit.append("title", data.title);
      formDataEdit.append("city[id]", `${data?.city?.id}`);
      formDataEdit.append("city[name]", data?.city?.name);
      formDataEdit.append("district[id]", `${data?.district?.id}`);
      formDataEdit.append("district[name]", data?.district?.name);
      formDataEdit.append("commune[id]", `${data?.commune?.id}`);
      formDataEdit.append("commune[name]", data?.commune?.name);
      formDataEdit.append("moreLocation", data.moreLocation);
      formDataEdit.append("contact", data.contact);
      formDataEdit.append("description", data.description);
      formDataEdit.append("suitablePerson", `${data.suitablePerson}`);
      formDataEdit.append("numberOfDays", `${data.numberOfDays}`);
      formDataEdit.append("numberOfNights", `${data.numberOfNights}`);
      formDataEdit.append("highlight", data.highlight);
      formDataEdit.append("termsAndCondition", data.termsAndCondition);
      if (lang) {
        formDataEdit.append("language", lang);
      }
      imagesUpload.forEach((item, index) => {
        if (typeof item === "object") {
          formDataEdit.append(`imageFiles${index}`, item);
        }
      });
      oldImages?.forEach((item, index) => {
        if (typeof item === "string") {
          formDataEdit.append(`images[]`, item);
        }
      });
      imagesDeleted?.forEach((item, index) => {
        if (typeof item === "string") {
          formDataEdit.append(`imagesDeleted[]`, item);
        }
      });
      TourService.updateTourInformation(itemEdit?.id, formDataEdit)
        .then(() => {
          dispatch(setSuccessMess("Update tour successfully"));
          handleNextStep();
        })
        .catch((e) => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)));
    } else {
      TourService.createTour(formData)
        .then((res) => {
          dispatch(
            setTourReducer({
              id: res?.data?.id,
              title: res?.data?.title,
              city: res?.data?.city,
              district: res?.data?.district,
              commune: res?.data?.commune,
              moreLocation: res?.data?.moreLocation,
              contact: res?.data?.contact,
              description: res?.data?.description,
              highlight: res?.data?.highlight,
              suitablePerson: res?.data?.suitablePerson,
              numberOfDays: res?.data?.numberOfDays,
              numberOfNights: res?.data?.numberOfNights,
              termsAndCondition: res?.data?.termsAndCondition,
              images: res?.data?.images,
            })
          );

          dispatch(setSuccessMess("Create tour successfully"));
          handleNextStep();
        })
        .catch((e) => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)));
    }
  };

  useEffect(() => {
    if (itemEdit) {
      reset({
        title: itemEdit?.title,
        city: itemEdit?.city,
        district: itemEdit?.district,
        commune: itemEdit?.commune,
        moreLocation: itemEdit?.moreLocation,
        contact: itemEdit?.contact,
        description: itemEdit?.description,
        highlight: itemEdit?.highlight,
        suitablePerson: itemEdit?.suitablePerson,
        numberOfDays: itemEdit?.numberOfDays,
        numberOfNights: itemEdit?.numberOfNights,
        termsAndCondition: itemEdit?.termsAndCondition,
      });
      setOldImages(itemEdit?.images);
      setImagesPreview(itemEdit?.images);
      setImagesUpload(itemEdit?.images);
    }
  }, [itemEdit, reset]);

  useEffect(() => {
    if (!itemEdit) {
      clearForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemEdit]);

  useEffect(() => {
    ProvinceService.getProvince()
      .then((res) => {
        setProvinces(res?.data.results);
      })
      .catch((e) => {
        dispatch(setErrorMess("Get province fail"));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ProvinceService.getDistrict(Number(watchCity?.id))
      .then((res) => {
        setDistricts(res?.data.results);
      })
      .catch((e) => {
        dispatch(setErrorMess("Get district fail"));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCity?.id]);

  useEffect(() => {
    ProvinceService.getCommune(Number(watchDistrict?.id))
      .then((res) => {
        setCommunes(res?.data.results);
      })
      .catch((e) => {
        dispatch(setErrorMess("Get commune fail"));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchDistrict?.id]);

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
              <InputSelect
                fullWidth
                title="City"
                name="city"
                control={control}
                selectProps={{
                  options: fetchProvince(),
                  placeholder: "-- City --",
                }}
                errorMessage={(errors.city as any)?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputSelect
                fullWidth
                title="District"
                name="district"
                control={control}
                selectProps={{
                  options: fetchDistrict(),
                  placeholder: "-- District --",
                }}
                errorMessage={(errors.district as any)?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputSelect
                fullWidth
                title="Commune"
                name="commune"
                control={control}
                selectProps={{
                  options: fetchCommune(),
                  placeholder: "-- Commune --",
                }}
                errorMessage={(errors.commune as any)?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <InputTextfield
                title="Detail address"
                placeholder="Enter detail address"
                autoComplete="off"
                name="moreLocation"
                inputRef={register("moreLocation")}
                errorMessage={errors.moreLocation?.message}
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
            <Grid item xs={12}>
              <InputTextfield
                title="Suitable person"
                placeholder="Enter Suitable person"
                autoComplete="off"
                name="suitablePerson"
                multiline
                rows={3}
                inputRef={register("suitablePerson")}
                errorMessage={errors.suitablePerson?.message}
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
              <Grid container spacing={2}>
                {imagesPreview?.map((item, index) => {
                  return (
                    <Grid key={item} xs={4} className={classes.imgPreview} item>
                      <img src={item} alt="preview" />
                      <div
                        onClick={() => handleDeleteImage(item, index)}
                        title="Delete"
                        className={classes.iconDelete}
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </div>
                    </Grid>
                  );
                })}
                {!imagesPreview?.length && (
                  <Col className={classes.noImg}>
                    <h4>No photos uploaded yet</h4>
                  </Col>
                )}
              </Grid>
              <Row className={classes.footer}>
                <Button
                  btnType={BtnType.Primary}
                  type="submit"
                  className={classes.btnSave}
                >
                  Save & Next Schedule
                  <ArrowRightAltIcon />
                </Button>
              </Row>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
});

export default InformationComponent;
