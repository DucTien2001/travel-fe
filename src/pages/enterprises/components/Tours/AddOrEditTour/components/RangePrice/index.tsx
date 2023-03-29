import React, { useMemo, memo, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import * as yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
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
import Button, { BtnType } from "components/common/buttons/Button";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import moment from "moment";
import InputTextfield from "components/common/inputs/InputTextfield";
import TableAddPriceRange from "./components/TableAddPriceRange";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export interface SaleForm {
  sale: {
    startDate: Date;
    quantity: number;
    discount?: number;
  }[];
}

interface Props {
  value?: number;
  index?: number;
  itemEdit?: ETour;
  handleNextStep?: () => void;
}

// eslint-disable-next-line react/display-name
const RangePriceComponent = memo((props: Props) => {
  const { value, index, itemEdit, handleNextStep } = props;

  const [datePrice, setDatePrice] = useState(new Date());
  const [discount, setDiscount] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const schema = useMemo(() => {
    return yup.object().shape({
      sale: yup.array(
        yup.object({
          startDate: yup.date().required("Day is required"),
          quantity: yup
            .number()
            .typeError("Quantity is required")
            .required("Quantity is required"),
          discount: yup
            .number()
            .typeError("Discount is required")
            .notRequired(),
        })
      ),
      dayDate: yup.date().required("Day is required"),
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
  } = useForm<SaleForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    fields: fieldsSale,
    append: appendSale,
    remove: removeSale,
  } = useFieldArray({
    control,
    name: "sale",
  });

  const onAddSale = () => {
    appendSale({
      startDate: null,
      quantity: null,
      discount: null,
    });
  };

  const onDeleteSale = (index) => () => {
    removeSale(index);
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const clearForm = () => {
    reset({
      sale: [],
    });
  };

  useEffect(() => {
    onAddSale();
  }, [appendSale]);

  useEffect(() => {
    if (itemEdit) {
      clearForm();
    }
  });

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Grid className={classes.root}>
          <h3 className={classes.title}>Range Price and Date</h3>
          {!!fieldsSale?.length &&
            fieldsSale?.map((field, index) => (
              <Grid key={index}>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Grid>
                    <Controller
                      name={`sale.${index}.startDate`}
                      control={control}
                      render={({ field }) => (
                        <InputDatePicker
                          label="Date"
                          placeholder="Select date"
                          timeFormat={false}
                          errorMessage={
                            errors.sale?.[index]?.startDate?.message
                          }
                          onChange={(date) => {
                            setDatePrice(date?._d);
                            field.onChange(date);
                          }}
                          isValidDate={disablePastDt}
                        />
                      )}
                    />
                  </Grid>
                  <IconButton
                    sx={{ marginLeft: "24px" }}
                    onClick={onDeleteSale(index)}
                    disabled={fieldsSale?.length !== 1 ? false : true}
                  >
                    <DeleteOutlineOutlined
                      sx={{ marginRight: "0.25rem" }}
                      className={classes.iconDelete}
                      color={fieldsSale?.length !== 1 ? "error" : "disabled"}
                      fontSize="small"
                    />
                  </IconButton>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <InputTextfield
                      title="Total ticket"
                      placeholder="Enter total ticket"
                      autoComplete="off"
                      name="quantity"
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      inputRef={register(`sale.${index}.quantity`)}
                      errorMessage={errors.sale?.[index]?.quantity?.message}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <InputTextfield
                      title="Discount"
                      placeholder="Enter discount"
                      autoComplete="off"
                      name="discount"
                      onChange={(e) => {
                        setDiscount(e.target.value);
                      }}
                      inputRef={register(`sale.${index}.discount`)}
                      errorMessage={errors.sale?.[index]?.discount?.message}
                    />
                  </Grid>
                </Grid>
                <Grid sx={{ paddingTop: "16px" }}>
                  <TableAddPriceRange
                    day={datePrice}
                    quantity={quantity}
                    discount={discount}
                  />
                </Grid>
              </Grid>
            ))}
          <Grid className={classes.boxAddDay}>
            <Button btnType={BtnType.Outlined} onClick={onAddSale}>
              <AddCircleIcon /> Click add to price day
            </Button>
          </Grid>
          <Grid className={classes.boxNextBtn}>
            <Button btnType={BtnType.Primary} onClick={handleNextStep}>
              Done Set Up
              <ArrowRightAltIcon />
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
});

export default RangePriceComponent;
