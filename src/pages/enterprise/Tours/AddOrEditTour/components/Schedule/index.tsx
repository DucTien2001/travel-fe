import React, { useMemo, memo, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import * as yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch } from "react-redux";
import { TourService } from "services/enterprise/tour";
import useAuth from "hooks/useAuth";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { ETour } from "models/enterprise";

import "react-quill/dist/quill.snow.css";
import { Grid, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { number } from "yup/lib/locale";
import Button, { BtnType } from "components/common/buttons/Button";
import TableAddMileStone from "./components/TableAddMileStone";
import { ScheduleItem } from "models/tour";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import clsx from "clsx";
export interface ScheduleForm {
  schedule: {
    day: number;
  }[];
}

interface Props {
  value: number;
  index: number;
  itemEdit?: ETour;
}

// eslint-disable-next-line react/display-name
const InformationComponent = memo((props: Props) => {
  const { value, index, itemEdit } = props;

  const schema = useMemo(() => {
    return yup.object().shape({
      schedule: yup.array(
        yup.object({
          day: yup
            .number()
            .typeError("Day is required.")
            .positive("Day must be a positive number")
            .required("Day is required."),
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
    watch,
  } = useForm<ScheduleForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    fields: fieldsSchedule,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control,
    name: "schedule",
  });

  const onAddSchedule = () => {
    appendSchedule({
      day: null,
    });
  };

  const onDeleteSchedule = (index) => () => {
    removeSchedule(index);
  };

  useEffect(() => {
    onAddSchedule();
  }, [appendSchedule]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Grid className={classes.root}>
          <h3 className={classes.title}>Tour&apos;s Schedule</h3>
          {!!fieldsSchedule?.length &&
            fieldsSchedule?.map((field, index) => (
              <Grid key={index}>
                <Grid sx={{ display: "flex", alignItems: "center" }}>
                  <Grid className={classes.boxDateTitle}>
                    <p>Day {index + 1}</p>
                  </Grid>
                  <IconButton
                    onClick={onDeleteSchedule(index)}
                    disabled={fieldsSchedule?.length !== 1 ? false : true}
                  >
                    <DeleteOutlineOutlined
                      sx={{ marginRight: "0.25rem" }}
                      className={classes.iconDelete}
                      color={
                        fieldsSchedule?.length !== 1 ? "error" : "disabled"
                      }
                      fontSize="small"
                    />
                  </IconButton>
                </Grid>
                <Grid sx={{ paddingTop: "16px" }}>
                  <TableAddMileStone day={index + 1} />
                </Grid>
              </Grid>
            ))}
          <Grid className={classes.boxAddDay}>
            <Button btnType={BtnType.Outlined} onClick={onAddSchedule}>
              <AddCircleIcon /> Click add to day
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
});

export default InformationComponent;
