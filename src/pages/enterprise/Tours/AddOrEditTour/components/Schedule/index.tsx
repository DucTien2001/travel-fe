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

import InputTextfield from "components/common/inputs/InputTextfield";
import TimePicker from "components/common/inputs/TimePicker";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { number } from "yup/lib/locale";
import Button, { BtnType } from "components/common/buttons/Button";
import TableAddMileStone from "../TableAddMileStone";
export interface ScheduleForm {
  day: {}[];
}

interface Props {
  value: number;
  index: number;
  itemEdit?: ETour;
}

// eslint-disable-next-line react/display-name
const InformationComponent = memo((props: Props) => {
  const { value, index, itemEdit } = props;

  const [openAddMileStone, setOpenAddMileStone] = useState(false);

  const schema = useMemo(() => {
    return yup.object().shape({
      day: yup.array(),
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
    fields: fieldsDay,
    append: appendDay,
    remove: removeDay,
  } = useFieldArray({
    control,
    name: "day",
  });

  const onOpenAddMileStone = () => {
    setOpenAddMileStone(true);
  };

  const onToggleAddMileStone = () => {
    setOpenAddMileStone(!openAddMileStone);
  };

  const _onSubmit = (data: ScheduleForm) => {};

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
          className={classes.root}
        >
          <h3 className={classes.title}>Tour&apos;s Schedule</h3>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <Grid className={classes.boxDateTitle}>
              <p>Day 1</p>
            </Grid>
          </Grid>
          <Grid sx={{ paddingTop: "16px" }}>
            <TableAddMileStone />
          </Grid>
          <Grid className={classes.boxAddDay}>
            <Button btnType={BtnType.Outlined}>
              <AddCircleIcon /> Click add to day
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
});

export default InformationComponent;
