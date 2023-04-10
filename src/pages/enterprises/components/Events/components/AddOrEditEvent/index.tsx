import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import clsx from "clsx";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import QueryString from "query-string";
import * as yup from "yup";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { TourService } from "services/enterprise/tour";
import { EventService } from "services/enterprise/event";
import { IEvent } from "models/enterprise/event";
import InputTextfield from "components/common/inputs/InputTextfield";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "components/common/texts/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { reactQuillModules } from "common/general";
import InputCreatableSelect from "components/common/inputs/InputCreatableSelect";
import { AdminGetTours, ETour } from "models/enterprise";
import { DataPagination, OptionItem } from "models/general";
import { useDropzone } from "react-dropzone";
import useIsMountedRef from "hooks/useIsMountedRef";
import { fData } from "utils/formatNumber";
import { CameraAlt, KeyboardArrowDown } from "@mui/icons-material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import moment from "moment";
import InputCheckbox from "components/common/inputs/InputCheckbox";
const PHOTO_SIZE = 10 * 1000000; // bytes
const FILE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export interface EventForm {
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  code: string;
  policy: string;
  hotelIds: OptionItem<number>[];
  tourIds: OptionItem<number>[];
  numberOfCodes: number;
  image: string | File;
}

interface Props {
  eventId?: number;
}

// eslint-disable-next-line react/display-name
const AddOrEditEvent = memo((props: Props) => {
  const { eventId } = props;
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  let lang;
  if (typeof window !== "undefined") {
    ({ lang } = QueryString.parse(window.location.search));
  }

  const [fileReview, setFileReview] = useState<string>("");
  const [keywordTour, setKeywordTour] = useState<string>("");
  const [dataTour, setDataTour] = useState<DataPagination<ETour>>();
  const [event, setEvent] = useState<IEvent>(null);
  const [anchorElMenuChooseTour, setAnchorElMenuChooseTour] =
    useState<null | HTMLElement>(null);
  const [tourSelected, setTourSelected] = useState<number[]>([]);

  const schema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required("Name is required"),
      description: yup.string().required("Description is required"),
      startTime: yup.date().required("Start time is required"),
      endTime: yup
        .date()
        .min(yup.ref("startTime"), "End time can't be before start time")
        .required("End time is required"),
      code: yup.string().required("Code is required"),
      policy: yup.string().required("Policy is required"),
      // hotelIds: yup
      //   .array(
      //     yup
      //       .object()
      //       .typeError("Select hotel is required.")
      //       .shape({
      //         id: yup.number().required("Select hotel is required"),
      //         name: yup.string().required(),
      //       })
      //   )
      //   .required(),
      // tourIds: yup
      //   .array(
      //     yup
      //       .object()
      //       .typeError("Select tour is required.")
      //       .shape({
      //         id: yup.number().required("Select tour is required"),
      //         name: yup.string().required(),
      //       })
      //   )
      //   .required(),
      numberOfCodes: yup
        .number()
        .typeError("Number of codes is required.")
        .positive("Number of codes must be a positive number")
        .required("Number of codes is required."),
      image: yup.mixed().required("Image is required"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setError,
    setValue,
    watch,
    clearErrors,
  } = useForm<EventForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const isValidSize = async (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result as string;
        image.onload = function () {
          const height = image.height;
          const width = image.width;
          resolve(height >= 200 && width >= 200);
        };
        image.onerror = function () {
          resolve(false);
        };
      };
      reader.onerror = function () {
        resolve(false);
      };
    });
  };

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      let file = acceptedFiles[0];
      const checkSize = file.size < PHOTO_SIZE;
      const checkType = FILE_FORMATS.includes(file.type);
      const validSize = await isValidSize(file);
      if (!validSize) {
        setError("image", {
          message: t("setup_survey_packs_popup_image_size"),
        });
        return;
      }
      if (!checkSize) {
        setError("image", {
          message: t("setup_survey_packs_popup_image_file_size", {
            size: fData(PHOTO_SIZE),
          }),
        });
        return;
      }
      if (!checkType) {
        setError("image", {
          message: t("setup_survey_packs_popup_image_type"),
        });
        return;
      }
      setValue("image", file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMountedRef]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
  });

  const clearForm = () => {
    reset({
      name: "",
      description: "",
      startTime: new Date(),
      endTime: new Date(),
      code: "",
      policy: "",
      hotelIds: [],
      tourIds: [],
      numberOfCodes: null,
      image: undefined,
    });
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const onBack = () => {
    router.push("/enterprises/events");
    clearForm();
  };

  useEffect(() => {
    if (eventId && !isNaN(Number(eventId))) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, dispatch]);

  const fetchData = async () => {
    dispatch(setLoading(true));
    EventService.findOne(Number(eventId), lang)
      .then((res) => {
        setEvent(res?.data);
      })
      .catch((err) => setErrorMess(err))
      .finally(() => dispatch(setLoading(false)));
  };

  const fetchTour = (value?: {
    take?: number;
    page?: number;
    keyword?: string;
  }) => {
    const params: AdminGetTours = {
      take: value?.take || dataTour?.meta?.take || 10,
      page: value?.page || dataTour?.meta?.page || 1,
      keyword: keywordTour,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    TourService.getTours(params)
      .then((res) => {
        setDataTour({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  const handleClickMenuChooseTour = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElMenuChooseTour(event.currentTarget);
  };

  const handleCloseMenuChooseTour = () => {
    // setCompetingToursSelected([])
    setAnchorElMenuChooseTour(null);
  };

  const onSubmitChooseProjectTour = () => {
    handleCloseMenuChooseTour();
  };

  const onChangeChooseTour = (item: ETour) => {
    let _tourSelected = [...tourSelected];
    if (_tourSelected.includes(item.id)) {
      _tourSelected = _tourSelected.filter((it) => it !== item.id);
    } else {
      _tourSelected.push(item.id);
    }
    setTourSelected(_tourSelected);
  };

  const [isEmptyTourSelect, setIsEmptyTourSelect] = useState(false);

  const onSubmit = (data: EventForm) => {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("startTime", `${data.startTime}`);
    formData.append("endTime", `${data.endTime}`);
    formData.append("code", data.code);
    formData.append("policy", `${data.policy}`);
    formData.append("numberOfCodes", `${data.numberOfCodes}`);
    if (tourSelected.length === 0) {
      setIsEmptyTourSelect(true);
    } else {
      tourSelected?.forEach((item) => {
        formData.append(`tourIds[]`, `${item}`);
      });
    }
    data.hotelIds?.forEach((item) => {
      formData.append(`hotelIds[]`, `1`);
    });
    if (data.image && typeof data.image === "object")
      formData.append("banner", data.image);
    if (event) {
      if (lang) {
        formData.append("language", lang);
      }
      EventService.update(event.id, formData)
        .then(async () => {
          dispatch(setSuccessMess("Update event successfully"));
          onBack();
          await fetchData();
        })
        .catch((e) => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)));
    } else {
      EventService.create(formData)
        .then((res) => {
          dispatch(setSuccessMess("Create event successfully"));
          onBack();
        })
        .catch((e) => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)));
    }
  };

  const image = watch("image");

  useEffect(() => {
    if (image) {
      if (typeof image === "object") {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => setFileReview(reader.result as string);
      } else {
        setFileReview(image as string);
      }
      clearErrors("image");
    } else setFileReview("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  useEffect(() => {
    if (event) {
      reset({
        image: event.banner,
        name: event.name,
        description: event.description,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime),
        code: event.code,
        policy: event.policy,
        numberOfCodes: event.numberOfCodes,
      });
      setTourSelected(event.tourIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  useEffect(() => {
    fetchTour();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Container className={clsx(classes.rowHeaderBox, classes.title)}>
          {!eventId ? <h3>Create event</h3> : <h3>Edit event</h3>}
          <Button onClick={onBack} btnType={BtnType.Primary}>
            Back
          </Button>
        </Container>
        <Container>
          <Grid
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className={classes.form}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputTextfield
                  title="Event's name"
                  placeholder="Enter event's name"
                  inputRef={register("name")}
                  autoComplete="off"
                  name="name"
                  errorMessage={errors.name?.message}
                />
              </Grid>

              <Grid item xs={6}>
                <InputDatePicker
                  name={`startTime`}
                  control={control}
                  label="Start time"
                  timeConstraints={{
                    minutes: { min: 0, max: 59, step: 5 },
                  }}
                  placeholder="Select date"
                  errorMessage={errors.startTime?.message}
                  isValidDate={disablePastDt}
                />
              </Grid>
              <Grid item xs={6}>
                <InputDatePicker
                  name={`endTime`}
                  control={control}
                  label="End time"
                  timeConstraints={{
                    minutes: { min: 0, max: 59, step: 5 },
                  }}
                  placeholder="Select date"
                  errorMessage={errors.endTime?.message}
                  isValidDate={disablePastDt}
                />
              </Grid>
              <Grid item xs={6}>
                <p className={classes.titleSelect}>Select tours</p>
                <Button
                  sx={{ width: { xs: "100%", sm: "auto" }, maxHeight: "36px" }}
                  className={classes.selectTourBtn}
                  btnType={BtnType.Outlined}
                  onClick={handleClickMenuChooseTour}
                >
                  Select tours
                  <KeyboardArrowDown
                    sx={{
                      color: "var(--gray-80)",
                      marginRight: "0px !important",
                    }}
                  />
                </Button>
                {isEmptyTourSelect && (
                  <ErrorMessage>Select tours is required</ErrorMessage>
                )}
                <Menu
                  anchorEl={anchorElMenuChooseTour}
                  open={Boolean(anchorElMenuChooseTour)}
                  onClose={handleCloseMenuChooseTour}
                  sx={{ mt: 1 }}
                >
                  <Grid className={classes.menuChooseTour}>
                    {dataTour?.data.map((item, index) => (
                      <MenuItem
                        key={index}
                        classes={{
                          root: clsx(classes.rootMenuItemChooseTour),
                        }}
                        onClick={() => onChangeChooseTour(item)}
                      >
                        <Grid
                          className={clsx(classes.menuItemFlex, {
                            [classes.listFlexChecked]: tourSelected.includes(
                              item?.id
                            ),
                          })}
                        >
                          <Grid>
                            <InputCheckbox
                              checked={tourSelected.includes(item?.id)}
                              classes={{ root: classes.rootMenuCheckbox }}
                            />
                          </Grid>
                          <Grid item className={classes.listTextLeft}>
                            <p>{item.title}</p>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ))}
                  </Grid>
                  <Grid className={classes.menuChooseTourAction}>
                    <Button
                      btnType={BtnType.Outlined}
                      translation-key="common_cancel"
                      onClick={handleCloseMenuChooseTour}
                    >
                      Cancel
                    </Button>
                    <Button
                      btnType={BtnType.Primary}
                      translation-key="common_done"
                      className={classes.btnSave}
                      onClick={onSubmitChooseProjectTour}
                    >
                      Done
                    </Button>
                  </Grid>
                </Menu>
              </Grid>
              <Grid item xs={6}>
                <InputCreatableSelect
                  fullWidth
                  title="Select hotels"
                  name="hotelIds"
                  control={control}
                  selectProps={{
                    options: [],
                    placeholder: "-- Select Hotels --",
                  }}
                  errorMessage={(errors.hotelIds as any)?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextfield
                  title="Code"
                  placeholder="Enter code "
                  autoComplete="off"
                  name="code"
                  inputRef={register("code")}
                  errorMessage={errors.code?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextfield
                  title="Number of Codes"
                  placeholder="Enter number of code"
                  autoComplete="off"
                  name="code"
                  type="number"
                  inputRef={register("numberOfCodes")}
                  errorMessage={errors.numberOfCodes?.message}
                />
              </Grid>
              <Grid xs={12} item>
                <p className={classes.titleInput}>Description</p>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      modules={reactQuillModules}
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
                <p className={classes.titleInput}>Policy</p>
                <Controller
                  name="policy"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      modules={reactQuillModules}
                      className={clsx(classes.editor, {
                        [classes.editorError]: !!errors.policy?.message,
                      })}
                      value={field.value || ""}
                      onBlur={() => field.onBlur()}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.policy?.message && (
                  <ErrorMessage>{errors.policy?.message}</ErrorMessage>
                )}
              </Grid>
              <Grid
                xs={12}
                item
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid
                  className={classes.imgUp}
                  style={{
                    border: fileReview
                      ? "1px solid rgba(28, 28, 28, 0.2)"
                      : "1px dashed rgba(28, 28, 28, 0.2)",
                    minHeight: fileReview ? 200 : "unset",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {fileReview ? (
                    <>
                      <img
                        src={fileReview}
                        className={classes.imgPreview}
                        alt="preview"
                      />
                      <IconButton
                        aria-label="upload"
                        className={classes.btnUpload}
                      >
                        <CameraAlt />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <AddPhotoAlternateOutlinedIcon
                        className={classes.imgAddPhoto}
                      />
                      <p className={classes.selectImgTitle}>Select banner</p>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.footer}>
              <Button
                btnType={BtnType.Primary}
                type="submit"
                className={classes.btnSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
});

export default AddOrEditEvent;
