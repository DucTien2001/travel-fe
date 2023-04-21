import { memo, useEffect, useMemo, useState } from "react";
import "aos/dist/aos.css";
import { Grid } from "@mui/material";
import InputTextfield from "components/common/inputs/InputTextfield";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlassArrowRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./styles.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Stars from "components/Stars";
import Aos from "aos";
import "aos/dist/aos.css";
import { useMediaQuery, useTheme } from "@mui/material";
import { clsx } from "clsx";
import { Col } from "reactstrap";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Button, { BtnType } from "components/common/buttons/Button";

interface FormSearch {
  location?: string;
  startDate?: Date;
  endDate?: Date;
}

// eslint-disable-next-line react/display-name
const HotelSearch = memo(() => {
  const schema = useMemo(() => {
    return yup.object().shape({
      location: yup.string().required("Content search is required"),
      startDate: yup
        .date()
        .max(yup.ref("endDate"), "Departure date can't be after return date")
        .required("Start datetime is required"),
      endDate: yup
        .date()
        .min(yup.ref("startDate"), "Return date can't be before departure date")
        .required("End datetime is required"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    watch,
  } = useForm<FormSearch>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const _onSubmit = (data: FormSearch) => {
    console.log(data);
  };

  return (
    <>
      <Grid component="form" onSubmit={handleSubmit(_onSubmit)}>
        <Grid className={classes.boxItem}>
          <p className={classes.titleInput}>Hotel</p>
          <InputTextfield
            className={classes.inputSearchLocation}
            placeholder="Search tour"
            name="location"
            startAdornment={<FontAwesomeIcon icon={faLocationDot} />}
            inputRef={"location"}
            errorMessage={errors.location?.message}
          />
        </Grid>
        <Grid container className={classes.boxDate}>
          <Grid xs={5} item className={classes.boxItem}>
            <p className={classes.titleInput}>Start Time</p>
            <InputDatePicker
              className={classes.inputSearchDate}
              placeholder="Check-in"
              name="startDate"
              dateFormat="DD/MM/YYYY"
              timeFormat={false}
              inputRef={"startDate"}
              errorMessage={errors.startDate?.message}
            />
          </Grid>
          <Grid xs={5} item className={classes.boxItem}>
            <p className={classes.titleInput}>Start Time</p>
            <InputDatePicker
              className={classes.inputSearchDate}
              placeholder="Check-out"
              name="endDate"
              dateFormat="DD/MM/YYYY"
              timeFormat={false}
              inputRef={"endDate"}
              errorMessage={errors.endDate?.message}
            />
          </Grid>
          <Grid xs={2} item className={classes.boxItem}>
            <Button btnType={BtnType.Secondary} type="submit">
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>Search hotel
            </Button>
          </Grid>
        </Grid>
        <Grid sx={{ paddingTop: "14px" }}></Grid>
      </Grid>
    </>
  );
});

export default HotelSearch;
