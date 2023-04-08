import React, { memo, useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import clsx from "clsx";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import QueryString from "query-string";
import * as yup from "yup";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/enterprise/tour";
import { EventService } from "services/enterprise/event";
import { IEvent } from "models/enterprise/event";
import InputTextfield from "components/common/inputs/InputTextfield";
import InputSelect from "components/common/inputs/InputSelect";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "components/common/texts/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { reactQuillModules } from "common/general";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export interface EventForm {
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  code: string;
  policy: string;
  hotelIds: number[];
  tourIds: number[];
  numberOfCodes: number;
  language: string;
}

interface Props {
  eventId?: number;
}

// eslint-disable-next-line react/display-name
const AddOrEditTour = memo((props: Props) => {
  const { eventId } = props;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  let lang;
  if (typeof window !== "undefined") {
    ({ lang } = QueryString.parse(window.location.search));
  }

  const [event, setEvent] = useState<IEvent>(null);
  const [imageUpload, setImageUpload] = useState<File>(null);

  const schema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required("Name is required"),
      description: yup
        .object()
        .typeError("City is required.")
        .shape({
          id: yup.number().required("City is required"),
          name: yup.string().required(),
        })
        .required(),
      startTime: yup
        .object()
        .typeError("District is required.")
        .shape({
          id: yup.number().required("District is required"),
          name: yup.string().required(),
        })
        .required(),
      endTime: yup
        .object()
        .typeError("Commune is required.")
        .shape({
          id: yup.number().required("Commune is required"),
          name: yup.string().required(),
        })
        .required(),
      code: yup.string().required("Name is required"),
      policy: yup.string().required("Name is required"),
      hotelIds: yup.string().required("Name is required"),
      tourIds: yup.string().required("Name is required"),
      numberOfCodes: yup.string().required("Name is required"),
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
  } = useForm<EventForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
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
      language: null,
    });
  };

  const onBack = () => {
    router.push("/enterprises/events");
    clearForm()
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
    data.tourIds?.forEach((item) => {
      formData.append(`tourIds[]`, `${item}`);
    });
    data.hotelIds?.forEach((item) => {
      formData.append(`hotelIds[]`, `${item}`);
    });
    if(imageUpload) {
      formData.append(`imageFile`, imageUpload);
    }
    if (event) {
      if (lang) {
        formData.append("language", lang);
      }
      EventService.update(event.id, formData)
        .then(async() => {
          dispatch(setSuccessMess("Update event successfully"));
          await fetchData()
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
          <Grid component="form" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
              <Grid item xs={6}>
                <InputDatePicker
                  name={`startTime`}
                  control={control}
                  label="Start time"
                  placeholder="Select date"
                  timeFormat={false}
                  errorMessage={errors.startTime?.message}
                  // isValidDate={disablePastDt}
                />
              </Grid>
              <Grid item xs={6}>
                <InputDatePicker
                  name={`endTime`}
                  control={control}
                  label="End time"
                  placeholder="Select date"
                  timeFormat={false}
                  errorMessage={errors.endTime?.message}
                  // isValidDate={disablePastDt}
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
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
});

export default AddOrEditTour;
