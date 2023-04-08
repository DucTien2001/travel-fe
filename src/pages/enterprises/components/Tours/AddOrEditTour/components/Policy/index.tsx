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
import { EServiceType, OptionItem, policyType } from "models/general";
import { ReducerType } from "redux/reducers";
import { PolicyService } from "services/enterprise/policy";

export interface PolicyForm {
  policy: {
    id?: number;
    serviceType: number;
    policyType: { id: number; name: string };
    dayRange: number;
    moneyRate: number;
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
const PolicyComponent = memo((props: Props) => {
  const { value, index, tour, lang, handleNextStep } = props;

  const dispatch = useDispatch();
  const { tourInformation } = useSelector(
    (state: ReducerType) => state.enterprise
  );

  const schema = useMemo(() => {
    return yup.object().shape({
      policy: yup.array(
        yup.object({
          id: yup.number().empty().notRequired(),
          serviceType: yup
            .number()
            .typeError("Service type is required")
            .notRequired(),
          dayRange: yup
            .number()
            .typeError("Day range is required")
            .positive("Day range  must be a positive number")
            .required("Day range min is required."),
          moneyRate: yup
            .number()
            .typeError("Money rate min is required.")
            .positive("Money rate must be a positive number")
            .min(0, "Money rate must be more than 0")
            .max(100, "Money rate must be less than 100")
            .required("Money rate min is required."),
          policyType: yup
            .object()
            .shape({
              id: yup.number().required("Policy type is required"),
              name: yup.string().required("Policy type is required"),
            })
            .required("Policy type is required"),
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
  } = useForm<PolicyForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    fields: fieldsPolicy,
    append: appendPolicy,
    remove: removePolicy,
  } = useFieldArray({
    control,
    name: "policy",
    keyName: "fieldID",
  });

  const initPolicy = () => {
    appendPolicy({
      serviceType: EServiceType.TOUR,
      dayRange: null,
      moneyRate: null,
      policyType: policyType[0],
    });
  };
  const clearForm = () => {
    reset({
      policy: [],
    });
    initPolicy();
  };
  const onAddPolicy = () => {
    appendPolicy({
      serviceType: EServiceType.TOUR,
      dayRange: null,
      moneyRate: null,
      policyType: policyType[0],
    });
  };
  const onDeletePolicy = (index) => () => {
    removePolicy(index);
  };

  const onGetAllPolicy = () => {
    PolicyService.getAllPolicy({
      serviceType: EServiceType.TOUR,
      serviceId: tour?.id,
    })
      .then((res) => {
        if (res?.success) {
          reset({
            policy: res?.data?.map((item) => ({
              id: item?.id,
              serviceType: item?.serviceType,
              dayRange: item?.dayRange,
              moneyRate: item?.moneyRate,
              policyType: item?.policyType?.id,
            })),
          });
        }
      })
      .catch((err) => setErrorMess(err))
      .finally(() => dispatch(setLoading(false)));
  };

  const _onSubmit = (data: PolicyForm) => {
    dispatch(setLoading(true));
    PolicyService.createOrUpdatePolicy(
      data.policy.map((item) => ({
        id: item?.id,
        serviceId: tourInformation?.id ? tourInformation?.id : tour?.id,
        serviceType: EServiceType.TOUR,
        dayRange: item?.dayRange,
        moneyRate: item?.moneyRate,
        policyType: item?.policyType?.id,
      }))
    )
      .then(() => {
        dispatch(setSuccessMess("Create policy successfully"));
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    if (tour) {
      PolicyService.getAllPolicy({
        serviceType: EServiceType.TOUR,
        serviceId: tour?.id,
      })
        .then((res) => {
          if (res?.success) {
            reset({
              policy: res?.data?.map((item) => ({
                id: item?.id,
                serviceType: item?.serviceType,
                dayRange: item?.dayRange,
                moneyRate: item?.moneyRate,
                policyType: item?.policyType?.id,
              })),
            });
          }
        })
        .catch((err) => setErrorMess(err))
        .finally(() => dispatch(setLoading(false)));
    }
    // reset({
    //   policy: tour?.tourOnSales?.map((item) => ({
    //     id: item.id,
    //     discount: item.discount,
    //     quantity: item.quantity,
    //     startDate: new Date(item.startDate),
    //     childrenAgeMin: item.childrenAgeMin,
    //     childrenAgeMax: item.childrenAgeMax,
    //     childrenPrice: item.childrenPrice,
    //     adultPrice: item.adultPrice,
    //     currency: getCurrency(item?.currency),
    //   })),
    // });
  }, [tour]);

  useEffect(() => {
    if (!tour) {
      onAddPolicy();
    }
  }, [appendPolicy]);

  useEffect(() => {
    if (!tour) {
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
          <h3 className={classes.title}>Set up Policy</h3>
          {!!fieldsPolicy?.length &&
            fieldsPolicy?.map((field, index) => (
              <Grid key={index} sx={{ paddingTop: "32px" }}>
                <Grid className={classes.boxTitleItem}>
                  <Grid className={classes.titleItem}>
                    <p>Policy {index + 1}</p>
                  </Grid>

                  <IconButton
                    sx={{ marginLeft: "24px" }}
                    onClick={onDeletePolicy(index)}
                    disabled={fieldsPolicy?.length !== 1 ? false : true}
                  >
                    <DeleteOutlineOutlined
                      sx={{ marginRight: "0.25rem" }}
                      className={classes.iconDelete}
                      color={fieldsPolicy?.length !== 1 ? "error" : "disabled"}
                      fontSize="small"
                    />
                  </IconButton>
                </Grid>
                <Grid
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  container
                >
                  <Grid item xs={2} sm={4} md={4}>
                    <InputTextfield
                      title="Day range"
                      placeholder="Ex: 3"
                      autoComplete="off"
                      type="number"
                      inputRef={register(`policy.${index}.dayRange`)}
                      errorMessage={errors.policy?.[index]?.dayRange?.message}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputTextfield
                      title="Money rate"
                      placeholder="Ex: 50%"
                      autoComplete="off"
                      type="number"
                      inputRef={register(`policy.${index}.moneyRate`)}
                      errorMessage={errors.policy?.[index]?.moneyRate?.message}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={4}>
                    <InputSelect
                      fullWidth
                      title={"Policy type"}
                      name={`policy.${index}.policyType`}
                      control={control}
                      selectProps={{
                        options: policyType,
                        placeholder: "-- Policy type --",
                      }}
                      errorMessage={errors.policy?.[index]?.policyType?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          <Grid className={classes.boxAddDay}>
            <Button btnType={BtnType.Outlined} onClick={onAddPolicy}>
              <AddCircleIcon /> Click add to policy
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

export default PolicyComponent;
