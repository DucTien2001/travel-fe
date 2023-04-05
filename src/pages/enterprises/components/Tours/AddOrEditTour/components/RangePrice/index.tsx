import React, { useMemo, memo, useEffect, useState } from "react";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import * as yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
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
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import InputSelect from "components/common/inputs/InputSelect";
import { OptionItem, currencyType } from "models/general";
import { TourService } from "services/enterprise/tour";
import { ReducerType } from "redux/reducers";
import { TourOnSaleService } from "services/enterprise/tourOnSale";

export interface SaleForm {
  sale: {
    id?: number;
    startDate: Date;
    quantity: number;
    discount?: number;
    childrenAgeMin: number;
    childrenAgeMax: number;
    childrenPrice: number;
    adultPrice: number;
    currency?: OptionItem;
  }[];
}

interface Props {
  value?: number;
  index?: number;
  tour?: ETour;
  lang?: string;
  handleNextStep?: () => void;
}

// eslint-disable-next-line react/display-name
const RangePriceComponent = memo((props: Props) => {
  const { value, index, tour, lang, handleNextStep } = props;

  const dispatch = useDispatch();
  const { tourInformation } = useSelector(
    (state: ReducerType) => state.enterprise
  );

  const schema = useMemo(() => {
    return yup.object().shape({
      sale: yup.array(
        yup.object({
          id: yup.number().empty().notRequired(),
          startDate: yup.date().required("Day is required"),
          quantity: yup
            .number()
            .typeError("Quantity is required")
            .required("Quantity is required"),
          discount: yup
            .number()
            .typeError("Discount is required")
            .notRequired(),
          childrenAgeMin: yup
            .number()
            .typeError("Children age min is required.")
            .positive("Children age min must be a positive number")
            .required("Children age min is required."),
          childrenAgeMax: yup
            .number()
            .typeError("Children age max is required.")
            .positive("Children age max  must be a positive number")
            .min(
              yup.ref("childrenAgeMin"),
              "Children age max must be rather than children age min"
            )
            .required("Children age max  is required."),
          childrenPrice: yup
            .number()
            .typeError("Children price is required.")
            .positive("Children price  must be a positive number")
            .required("Children price  is required."),
          adultPrice: yup
            .number()
            .typeError("Adult price is required.")
            .positive("Adult price must be a positive number")
            .required("Adult price is required."),
          currency: yup
            .object()
            .shape({
              id: yup.number().required("Currency is required"),
              name: yup.string().required("Currency is required"),
              value: yup.string().required("Currency is required"),
            })
            .required(),
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
    watch,
    control,
  } = useForm<SaleForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };
  const {
    fields: fieldsSale,
    append: appendSale,
    remove: removeSale,
  } = useFieldArray({
    control,
    name: "sale",
    keyName: "fieldID",
  });

  const initSale = () => {
    appendSale({
      startDate: null,
      quantity: null,
      discount: null,
      childrenAgeMin: null,
      childrenAgeMax: null,
      childrenPrice: null,
      adultPrice: null,
      currency: currencyType[0],
    });
  };
  const clearForm = () => {
    reset({
      sale: [],
    });
    initSale();
  };
  const onAddSale = () => {
    appendSale({
      startDate: null,
      quantity: null,
      discount: null,
      childrenAgeMin: null,
      childrenAgeMax: null,
      childrenPrice: null,
      adultPrice: null,
      currency: currencyType[0],
    });
  };
  const onDeleteSale = (index) => () => {
    removeSale(index);
  };

  const _onSubmit = (data: SaleForm) => {
    console.log(
      data.sale.map((item) => ({
        tourId: tourInformation?.id ? tourInformation?.id : tour?.id,
        id: item?.id,
        discount: item?.discount,
        quantity: item?.quantity,
        startDate: item?.startDate,
        childrenAgeMin: item?.childrenAgeMin,
        childrenAgeMax: item?.childrenAgeMax,
        childrenPrice: item?.childrenPrice,
        adultPrice: item?.adultPrice,
        currency: item?.currency?.value,
      })),
      "-------"
    );
    dispatch(setLoading(true));
    TourOnSaleService.createOrUpdatePriceTour({
      sale: data.sale.map((item) => ({
        tourId: tourInformation?.id ? tourInformation?.id : tour?.id,
        id: item?.id,
        discount: item?.discount,
        quantity: item?.quantity,
        startDate: item?.startDate,
        childrenAgeMin: item?.childrenAgeMin,
        childrenAgeMax: item?.childrenAgeMax,
        childrenPrice: item?.childrenPrice,
        adultPrice: item?.adultPrice,
        currency: item?.currency?.value,
      })),
    })
      .then(() => {
        dispatch(setSuccessMess("Create price of tour successfully"));
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  fieldsSale.forEach((item, index) => {
    const watch22 = watch(`sale.${index}.currency`);
    console.log(watch22);
  });

  // useEffect(() => {
  //   if (tour) {
  //     reset({
  //       sale: tour?.tourOnSales?.map((item) => ({
  //         discount: item.discount,
  //         quantity: item.quantity,
  //         startDate: item.startDate,
  //         childrenAgeMin: item.childrenAgeMax,
  //         childrenPrice: item.childrenPrice,
  //         adultPrice: item.adultPrice,
  //         // currency: itemEdit?.tourOnSales[0]?.currency,
  //       })),
  //     });
  //   }
  // }, [tour, reset]);

  useEffect(() => {
    if (!tour) {
      onAddSale();
    }
  }, [appendSale]);

  useEffect(() => {
    if (tour) {
      clearForm();
    }
  }, [tour]);

  return (
    <Grid
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      component="form"
      onSubmit={handleSubmit(_onSubmit)}
    >
      {value === index && (
        <Grid className={classes.root}>
          <h3 className={classes.title}>Range Price and Date</h3>
          {!!fieldsSale?.length &&
            fieldsSale?.map((field, index) => (
              <Grid key={index} sx={{ paddingTop: "32px" }}>
                <Grid className={classes.boxTitleItem}>
                  <Grid className={classes.titleItem}>
                    <p>Price date available {index + 1}</p>
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
                <Grid
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  container
                >
                  <Grid xs={2} sm={4} md={4} item>
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
                            field.onChange(date);
                          }}
                          isValidDate={disablePastDt}
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={2} sm={4} md={4} item>
                    <InputSelect
                      fullWidth
                      title={"Currency"}
                      name="currency"
                      control={control}
                      selectProps={{
                        options: currencyType,
                        placeholder: "--Currency--",
                      }}
                      errorMessage={errors.sale?.[index]?.currency?.message}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}></Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputTextfield
                      title="Total ticket"
                      placeholder="Enter total ticket"
                      autoComplete="off"
                      name="quantity"
                      type="number"
                      inputRef={register(`sale.${index}.quantity`)}
                      errorMessage={errors.sale?.[index]?.quantity?.message}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputTextfield
                      title="Discount"
                      placeholder="Enter discount"
                      autoComplete="off"
                      name="discount"
                      type="number"
                      inputRef={register(`sale.${index}.discount`)}
                      errorMessage={errors.sale?.[index]?.discount?.message}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputTextfield
                      title="Price for adult"
                      placeholder="Enter price of adult"
                      autoComplete="off"
                      name="adultPrice"
                      type="number"
                      inputRef={register(`sale.${index}.adultPrice`)}
                      errorMessage={errors.sale?.[index]?.adultPrice?.message}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputTextfield
                      title="Children age min"
                      placeholder="Enter children age min"
                      autoComplete="off"
                      name="childrenAgeMin"
                      type="number"
                      inputRef={register(`sale.${index}.childrenAgeMin`)}
                      errorMessage={
                        errors.sale?.[index]?.childrenAgeMin?.message
                      }
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputTextfield
                      title="Children age max"
                      placeholder="Enter children age max"
                      autoComplete="off"
                      name="childrenAgeMax"
                      type="number"
                      inputRef={register(`sale.${index}.childrenAgeMax`)}
                      errorMessage={
                        errors.sale?.[index]?.childrenAgeMax?.message
                      }
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputTextfield
                      title="Price for children"
                      placeholder="Enter price of children"
                      autoComplete="off"
                      name="childrenPrice"
                      type="number"
                      inputRef={register(`sale.${index}.childrenPrice`)}
                      errorMessage={
                        errors.sale?.[index]?.childrenPrice?.message
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          <Grid className={classes.boxAddDay}>
            <Button btnType={BtnType.Outlined} onClick={onAddSale}>
              <AddCircleIcon /> Click add to price day
            </Button>
          </Grid>
          <Grid className={classes.boxNextBtn}>
            <Button btnType={BtnType.Primary} type="submit">
              Done Set Up
              <ArrowRightAltIcon />
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
});

export default RangePriceComponent;
