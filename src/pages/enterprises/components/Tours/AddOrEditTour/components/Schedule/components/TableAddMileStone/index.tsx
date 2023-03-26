import React, { useMemo, memo, useEffect } from "react";
import { ModalProps } from "reactstrap";
import classes from "./styles.module.scss";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InputTimePicker from "components/common/inputs/TimePicker";
import Button, { BtnType } from "components/common/buttons/Button";
import TableHeader from "components/Table/TableHeader";
import { TableHeaderLabel } from "models/general";
import { AddCircle, DeleteOutlineOutlined } from "@mui/icons-material";
import InputLineTextField from "components/common/inputs/InputLineTextfield";
import moment from "moment";
import yup from "configs/yup.custom";
import { useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { TourService } from "services/enterprise/tour";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { useDispatch } from "react-redux";

const tableHeaders: TableHeaderLabel[] = [
  { name: "From", label: "From", sortable: false },
  { name: "To", label: "To", sortable: false },
  { name: "Content", label: "Content", sortable: false },
  { name: "Action", label: "Action", sortable: false },
];

export interface MileStoneForm {
  mileStone: {
    startTime: Date;
    endTime: Date;
    description: string;
  }[];
}

interface Props {
  day: number;
}

// eslint-disable-next-line react/display-name
const PopupAddMileStone = memo((props: Props) => {
  const { day } = props;
  const dispatch = useDispatch();

  const { tourInformation } = useSelector(
    (state: ReducerType) => state.enterprise
  );

  const schema = useMemo(() => {
    const min = moment().startOf("day").toDate();
    const max = moment().startOf("day").toDate();
    return yup.object().shape({
      mileStone: yup.array(
        yup.object({
          startTime: yup
            .date()
            .typeError("Start time is required")
            .startTime({
              lessThan: function (params: any) {
                return `Start time must be less than End Time`;
              },
              between: function (params: any) {
                return `Start time must be less than ${params.greaterThan}`;
              },
            })
            .min(
              min,
              `Start time must be greater than or equal to ${moment(min).format(
                "mm:ss"
              )}`
            )
            .required("Start time is required"),
          endTime: yup
            .date()
            .typeError("End time is required")
            // .max(yup.ref("startTime"), `End time must be greater than ${startTime}`)
            .endTime({
              moreThan: function (params: any) {
                return `End time must be greater than Start Time`;
              },
              between: function (params: any) {
                return `End time must be greater than ${params.lessThan}`;
              },
            })
            .required("End time is required"),
          description: yup.string().required("Content is required"),
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
  } = useForm<MileStoneForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    fields: fieldsMileStone,
    append: appendMileStone,
    remove: removeMileStone,
  } = useFieldArray({
    control,
    name: "mileStone",
  });

  const onAddMileStone = () => {
    appendMileStone({
      startTime: null,
      endTime: null,
      description: "",
    });
  };

  const onDeleteMileStone = (index: number) => () => {
    removeMileStone(index);
  };

  const _onSubmit = (data: MileStoneForm) => {
    if (tourInformation) {
      dispatch(setLoading(true));
      TourService.createScheduleTour({
        tourId: tourInformation?.id,
        day: day,
        schedule: data.mileStone,
      })
        .then(() => {
          dispatch(setSuccessMess("Create schedule tour successfully"));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  useEffect(() => {
    onAddMileStone();
  }, [appendMileStone]);

  return (
    <Grid component="form" onSubmit={handleSubmit(_onSubmit)}>
      <Table className={classes.table}>
        <TableHeader headers={tableHeaders}></TableHeader>
        <TableBody>
          {!!fieldsMileStone?.length &&
            fieldsMileStone?.map((field, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell
                  scope="row"
                  className={classes.tableCell}
                  sx={{ width: "135px" }}
                >
                  <Controller
                    name={`mileStone.${index}.startTime`}
                    control={control}
                    render={({ field }) => (
                      <InputTimePicker
                        value={field.value as any}
                        onChange={field.onChange}
                        inputRef={register(`mileStone.${index}.startTime`)}
                        errorMessage={
                          errors.mileStone?.[index]?.startTime?.message
                        }
                      />
                    )}
                  />
                </TableCell>
                <TableCell
                  scope="row"
                  className={classes.tableCell}
                  sx={{ width: "135px" }}
                >
                  <Controller
                    name={`mileStone.${index}.endTime`}
                    control={control}
                    render={({ field }) => (
                      <InputTimePicker
                        value={field.value as any}
                        onChange={field.onChange}
                        inputRef={register(`mileStone.${index}.endTime`)}
                        errorMessage={
                          errors.mileStone?.[index]?.endTime?.message
                        }
                      />
                    )}
                  />
                </TableCell>
                <TableCell scope="row" className={classes.tableCell}>
                  <InputLineTextField
                    placeholder="Enter description"
                    inputRef={register(`mileStone.${index}.description`)}
                    errorMessage={
                      errors.mileStone?.[index]?.description?.message
                    }
                  />
                </TableCell>
                <TableCell
                  className="text-center"
                  component="th"
                  sx={{ width: "135px" }}
                >
                  <IconButton
                    onClick={onDeleteMileStone(index)}
                    disabled={fieldsMileStone?.length !== 1 ? false : true}
                  >
                    <DeleteOutlineOutlined
                      sx={{ marginRight: "0.25rem" }}
                      className={classes.iconDelete}
                      color={
                        fieldsMileStone?.length !== 1 ? "error" : "disabled"
                      }
                      fontSize="small"
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          <TableRow
            // onClick={onShowAddRow}
            className="action-row"
            sx={{ cursor: "pointer" }}
          >
            <TableCell
              colSpan={4}
              variant="footer"
              align="center"
              scope="row"
              className={classes.boxAddRow}
              onClick={onAddMileStone}
            >
              <AddCircle sx={{ fontSize: "16px !important" }} /> Add new
              milestone
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Grid className={classes.btnControl}>
        <Button btnType={BtnType.Primary} type="submit">
          Save
        </Button>
        <Button btnType={BtnType.Outlined}>Edit</Button>
      </Grid>
    </Grid>
  );
});

export default PopupAddMileStone;
