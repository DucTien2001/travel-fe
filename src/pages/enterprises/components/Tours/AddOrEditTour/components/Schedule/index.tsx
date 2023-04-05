import React, { useMemo, memo, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ETour } from "models/enterprise";
import "react-quill/dist/quill.snow.css";
import { Grid, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button, { BtnType } from "components/common/buttons/Button";
import TableAddMileStone from "./components/TableAddMileStone";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import _ from "lodash";
import { useSSR } from "react-i18next";
export interface ScheduleForm {
  schedule: {
    day: number;
  }[];
}

interface Props {
  value?: number;
  index?: number;
  itemEdit?: ETour;
  handleNextStep?: () => void;
}

// eslint-disable-next-line react/display-name
const ScheduleComponent = memo((props: Props) => {
  const { value, index, itemEdit, handleNextStep } = props;

  const dayCategory = useMemo(() => {
    return _.groupBy(itemEdit?.tourSchedules, "day");
  }, [itemEdit]);

  const dayCategoryArray = useMemo(() => {
    return _.toArray(dayCategory);
  }, [itemEdit]);

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

  const { reset, control } = useForm<ScheduleForm>({
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

  useEffect(() => {
    if (itemEdit) {
      reset({
        schedule: dayCategoryArray?.map((item, index) => ({
          day: index,
        })),
      });
    }
  }, [itemEdit, handleNextStep]);

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
                  <TableAddMileStone
                    day={index + 1}
                    itemEdit={itemEdit}
                    scheduleEdit={dayCategoryArray[index]}
                  />
                </Grid>
              </Grid>
            ))}
          <Grid className={classes.boxAddDay}>
            <Button btnType={BtnType.Outlined} onClick={onAddSchedule}>
              <AddCircleIcon /> Click add to day
            </Button>
          </Grid>
          <Grid className={classes.boxNextBtn}>
            <Button btnType={BtnType.Primary} onClick={handleNextStep}>
              Next Range Rice and Date
              <ArrowRightAltIcon />
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
});

export default ScheduleComponent;
