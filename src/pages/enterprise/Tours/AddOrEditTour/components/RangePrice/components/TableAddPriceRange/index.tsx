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
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { TourService } from "services/enterprise/tour";
import { setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";

const tableHeaders: TableHeaderLabel[] = [
  { name: "Title", label: "Title", sortable: false },
  { name: "Min Old", label: "Min Old", sortable: false },
  { name: "Max Old", label: "Max Old", sortable: false },
  { name: "Price", label: "Price", sortable: false },
  { name: "Action", label: "Action", sortable: false },
];

export interface MileStoneForm {
  priceRange: {
    title: string;
    minOld: number;
    maxOld: number;
    price: number;
  }[];
}

interface Props {
  day: Date;
  quantity: number;
  discount: number;
}

// eslint-disable-next-line react/display-name
const PopupAddMileStone = memo((props: Props) => {
  const { day, quantity, discount } = props;
  const dispatch = useDispatch();

  const { tourInformation } = useSelector(
    (state: ReducerType) => state.enterprise
  );
  const schema = useMemo(() => {
    return yup.object().shape({
      priceRange: yup.array(
        yup.object({
          title: yup.string().required("Title is required"),
          minOld: yup
            .number()
            .typeError("Min old is required")
            .required("Min old is required")
            .max(yup.ref("maxOld"), "Min old must be greater than max old"),
          maxOld: yup
            .number()
            .typeError("Max old is required")
            .required("Max old is required")
            .min(yup.ref("minOld"), "Max old must be greater than min old"),
          price: yup
            .number()
            .typeError("Price is required")
            .required("Price is required"),
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
    fields: fieldsPriceRange,
    append: appendPriceRange,
    remove: removePriceRange,
  } = useFieldArray({
    control,
    name: "priceRange",
  });

  const onAddPriceRange = () => {
    appendPriceRange({
      title: "",
      minOld: null,
      maxOld: null,
      price: null,
    });
  };

  const onDeletePriceRange = (index: number) => () => {
    removePriceRange(index);
  };

  const _onSubmit = (data: MileStoneForm) => {
    if (tourInformation) {
      dispatch(setLoading(true));
      TourService.createPriceTour({
        tourId: tourInformation?.id,
        startDate: day,
        quantity: quantity,
        discount: discount,
        prices: data.priceRange,
      })
        .then(() => {
          dispatch(setSuccessMess("Create range price tour successfully"));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  useEffect(() => {
    onAddPriceRange();
  }, [appendPriceRange]);

  return (
    <Grid component="form" onSubmit={handleSubmit(_onSubmit)}>
      <Table className={classes.table}>
        <TableHeader headers={tableHeaders}></TableHeader>
        <TableBody>
          {!!fieldsPriceRange?.length &&
            fieldsPriceRange?.map((field, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell scope="row" className={classes.tableCell}>
                  <InputLineTextField
                    name={`priceRange.${index}.title`}
                    placeholder="Enter title"
                    inputRef={register(`priceRange.${index}.title`)}
                    autoComplete="off"
                    errorMessage={errors.priceRange?.[index]?.title?.message}
                  />
                </TableCell>
                <TableCell scope="row" className={classes.tableCell}>
                  <InputLineTextField
                    name={`priceRange.${index}.minOld`}
                    placeholder="Enter min old"
                    inputRef={register(`priceRange.${index}.minOld`)}
                    autoComplete="off"
                    type="number"
                    errorMessage={errors.priceRange?.[index]?.minOld?.message}
                  />
                </TableCell>
                <TableCell scope="row" className={classes.tableCell}>
                  <InputLineTextField
                    name={`priceRange.${index}.maxOld`}
                    placeholder="Enter max old"
                    inputRef={register(`priceRange.${index}.maxOld`)}
                    autoComplete="off"
                    type="number"
                    errorMessage={errors.priceRange?.[index]?.maxOld?.message}
                  />
                </TableCell>
                <TableCell scope="row" className={classes.tableCell}>
                  <InputLineTextField
                    name={`priceRange.${index}.price`}
                    placeholder="Enter price"
                    inputRef={register(`priceRange.${index}.price`)}
                    autoComplete="off"
                    type="number"
                    errorMessage={errors.priceRange?.[index]?.price?.message}
                  />
                </TableCell>
                <TableCell
                  className="text-center"
                  component="th"
                  sx={{ width: "135px" }}
                >
                  <IconButton
                    onClick={onDeletePriceRange(index)}
                    disabled={fieldsPriceRange?.length !== 1 ? false : true}
                  >
                    <DeleteOutlineOutlined
                      sx={{ marginRight: "0.25rem" }}
                      className={classes.iconDelete}
                      color={
                        fieldsPriceRange?.length !== 1 ? "error" : "disabled"
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
              colSpan={5}
              variant="footer"
              align="center"
              scope="row"
              className={classes.boxAddRow}
              onClick={onAddPriceRange}
            >
              <AddCircle sx={{ fontSize: "16px !important" }} /> Add new range
              price
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
