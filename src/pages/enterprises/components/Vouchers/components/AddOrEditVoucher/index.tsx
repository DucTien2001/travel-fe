import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Container } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import clsx from "clsx";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import QueryString from "query-string";
import * as yup from "yup";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { TourService } from "services/enterprise/tour";
import { VoucherService } from "services/enterprise/voucher";
import { FindAll, Voucher } from "models/enterprise/voucher";
import InputTextfield from "components/common/inputs/InputTextfield";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "components/common/texts/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";
import { reactQuillModules } from "common/general";
import InputCreatableSelect from "components/common/inputs/InputCreatableSelect";
import { AdminGetTours, ETour } from "models/enterprise";
import {
  DataPagination,
  EDiscountType,
  OptionItem,
  discountType,
} from "models/general";

import { KeyboardArrowDown } from "@mui/icons-material";

import moment from "moment";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import InputSelect from "components/common/inputs/InputSelect";
import { getDiscountType } from "utils/getOption";

export interface VoucherForm {
  startTime: Date;
  endTime: Date;
  hotelIds: OptionItem<number>[];
  tourIds: OptionItem<number>[];
  numberOfCodes: number;
  discountType: OptionItem;
  discountValue: number;
  minOrder: number;
  maxDiscount: number;
  isQuantityLimit: boolean;
}

interface Props {
  voucherId?: number;
}

// eslint-disable-next-line react/display-name
const AddOrEditVoucher = memo((props: Props) => {
  const { voucherId } = props;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  let lang;
  if (typeof window !== "undefined") {
    ({ lang } = QueryString.parse(window.location.search));
  }

  const [dataTour, setDataTour] = useState<DataPagination<ETour>>();
  const [voucher, setVoucher] = useState<Voucher>(null);
  const [dataVoucher, setDataVoucher] = useState<DataPagination<Voucher>>();
  const [anchorElMenuChooseTour, setAnchorElMenuChooseTour] =
    useState<null | HTMLElement>(null);
  const [tourSelected, setTourSelected] = useState<number[]>([]);
  const [isEmptyTourSelect, setIsEmptyTourSelect] = useState(false);

  const schema = useMemo(() => {
    return yup.object().shape({
      startTime: yup.date().required("Start time is required"),
      endTime: yup
        .date()
        .min(yup.ref("startTime"), "End time can't be before start time")
        .required("End time is required"),
      discountType: yup
        .object()
        .typeError("Discount type is required.")
        .shape({
          id: yup.number().required("Discount type is required"),
          name: yup.string().required(),
        })
        .required(),
      discountValue: yup
        .number()
        .typeError("Discount value is required.")
        .positive("Discount value must be a positive number")
        .required("Discount value is required."),
      minOder: yup
        .number()
        .typeError("Min order is required.")
        .positive("Min order must be a positive number")
        .notRequired(),
      maxDiscount: yup.number().when("discountType", {
        is: (type: OptionItem) => type?.id === EDiscountType.PERCENT,
        then: yup
          .number()
          .typeError("Max discount is required.")
          .nullable()
          .positive("Max discount must be a positive number")
          .notRequired()
          .transform((_, val) => (val !== "" ? Number(val) : null)),
        otherwise: yup.number().nullable().notRequired().default(0),
      }),
      numberOfCodes: yup.number().when(["isQuantityLimit"], {
        is: (isQuantityLimit: boolean) => !!isQuantityLimit,
        then: yup
          .number()
          .typeError("Number of codes must be number")
          .positive("Number of codes  must be a integer number")
          .required("Number of codes  is required."),
        otherwise: yup.number().nullable().notRequired().default(0),
      }),
      isQuantityLimit: yup.boolean().required("Quantity limit is required"),
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
    clearErrors,
  } = useForm<VoucherForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      discountType: discountType[0],
      isQuantityLimit: false,
    },
  });

  const clearForm = () => {
    reset({
      startTime: new Date(),
      endTime: new Date(),
      hotelIds: [],
      tourIds: [],
      discountType: discountType[0],
      discountValue: null,
      minOrder: null,
      maxDiscount: null,
      numberOfCodes: null,
      isQuantityLimit: false,
    });
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const onBack = () => {
    router.push("/enterprises/vouchers");
    clearForm();
  };

  useEffect(() => {
    if (voucherId && !isNaN(Number(voucherId))) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucherId, dispatch]);

  const fetchData = async () => {
    dispatch(setLoading(true));
    VoucherService.findOne(Number(voucherId))
      .then((res) => {
        setVoucher(res?.data);
      })
      .catch((err) => setErrorMess(err))
      .finally(() => dispatch(setLoading(false)));
  };

  const fetchVoucher = (value?: {
    take?: number;
    page?: number;
    keyword?: string;
  }) => {
    const params: FindAll = {
      take: value?.take || dataVoucher?.meta?.take || 10,
      page: value?.page || dataVoucher?.meta?.page || 1,
      keyword: null,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    VoucherService.findAll(params)
      .then((res) => {
        setDataVoucher({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  const fetchTour = (value?: {
    take?: number;
    page?: number;
    keyword?: string;
  }) => {
    const params: AdminGetTours = {
      take: value?.take || dataTour?.meta?.take || 10,
      page: value?.page || dataTour?.meta?.page || 1,
      keyword: null,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    TourService.getTours(params)
      .then((res) => {
        setDataTour({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  const handleClickMenuChooseTour = (
    voucher: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElMenuChooseTour(voucher.currentTarget);
  };

  const handleCloseMenuChooseTour = () => {
    setAnchorElMenuChooseTour(null);
  };

  const onSubmitChooseProjectTour = () => {
    handleCloseMenuChooseTour();
  };

  const onChangeChooseTour = (item: ETour) => {
    let _tourSelected = [...tourSelected];
    if (_tourSelected.includes(item.id)) {
      _tourSelected = _tourSelected.filter((it) => it !== item.id);
    } else {
      _tourSelected.push(item.id);
    }
    setTourSelected(_tourSelected);
  };

  const onSubmit = (data: VoucherForm) => {
    dispatch(setLoading(true));
    const formData = new FormData();

    formData.append("startTime", `${data.startTime}`);
    formData.append("endTime", `${data.endTime}`);
    formData.append("discountType", `${data.discountType.value}`);
    formData.append("discountValue", `${data.discountValue}`);
    if (data?.minOrder) {
      formData.append("minOrder", `${data.minOrder}`);
    } else {
      formData.append("minOrder", `${0}`);
    }
    formData.append("isQuantityLimit", `${data.isQuantityLimit}`);
    if (data?.isQuantityLimit) {
      formData.append("numberOfCodes", `${data.numberOfCodes}`);
    }
    if (data?.discountType.value === EDiscountType.PERCENT) {
      if (data?.maxDiscount === null) {
        formData.append("maxDiscount", `${0}`);
      } else {
        formData.append("maxDiscount", `${data.maxDiscount}`);
      }
    } else {
      formData.append("maxDiscount", `${0}`);
    }
    if (tourSelected.length === 0) {
      setIsEmptyTourSelect(true);
    } else {
      tourSelected?.forEach((item) => {
        formData.append(`tourIds[]`, `${item}`);
      });
    }
    data.hotelIds?.forEach((item) => {
      formData.append(`hotelIds[]`, `1`);
    });

    if (voucher) {
      VoucherService.update(voucher.id, formData)
        .then(async () => {
          dispatch(setSuccessMess("Update voucher successfully"));
          onBack();
          await fetchData();
        })
        .catch((e) => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)));
    } else {
      VoucherService.create(formData)
        .then((res) => {
          dispatch(setSuccessMess("Create voucher successfully"));
          onBack();
        })
        .catch((e) => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)));
    }
  };

  useEffect(() => {
    if (voucher) {
      reset({
        startTime: new Date(voucher?.startTime),
        endTime: new Date(voucher?.endTime),
        discountType: getDiscountType(voucher?.discountType),
        discountValue: voucher?.discountValue,
        minOrder: voucher?.minOrder,
        isQuantityLimit: voucher?.isQuantityLimit,
        numberOfCodes: voucher?.numberOfCodes,
        maxDiscount: voucher?.maxDiscount,
      });
      setTourSelected(voucher.tourIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucher]);

  useEffect(() => {
    fetchTour();
    fetchVoucher();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Container className={clsx(classes.rowHeaderBox, classes.title)}>
          {!voucherId ? <h3>Create voucher</h3> : <h3>Edit voucher</h3>}
          <Button onClick={onBack} btnType={BtnType.Primary}>
            Back
          </Button>
        </Container>
        <Container>
          <Grid
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className={classes.form}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputDatePicker
                  name={`startTime`}
                  control={control}
                  label="Start time"
                  timeConstraints={{
                    minutes: { min: 0, max: 59, step: 5 },
                  }}
                  placeholder="Select date"
                  errorMessage={errors.startTime?.message}
                  isValidDate={disablePastDt}
                />
              </Grid>
              <Grid item xs={6}>
                <InputDatePicker
                  name={`endTime`}
                  control={control}
                  label="End time"
                  timeConstraints={{
                    minutes: { min: 0, max: 59, step: 5 },
                  }}
                  placeholder="Select date"
                  errorMessage={errors.endTime?.message}
                  isValidDate={disablePastDt}
                />
              </Grid>
              <Grid item xs={6}>
                <p className={classes.titleSelect}>Select tours</p>
                <Button
                  sx={{ width: { xs: "100%", sm: "auto" }, maxHeight: "36px" }}
                  className={classes.selectTourBtn}
                  btnType={BtnType.Outlined}
                  onClick={handleClickMenuChooseTour}
                >
                  Select tours
                  <KeyboardArrowDown
                    sx={{
                      color: "var(--gray-80)",
                      marginRight: "0px !important",
                    }}
                  />
                </Button>
                {isEmptyTourSelect && (
                  <ErrorMessage>Select tours is required</ErrorMessage>
                )}
                <Menu
                  anchorEl={anchorElMenuChooseTour}
                  open={Boolean(anchorElMenuChooseTour)}
                  onClose={handleCloseMenuChooseTour}
                  sx={{ mt: 1 }}
                >
                  <Grid className={classes.menuChooseTour}>
                    {dataTour?.data.map((item, index) => (
                      <MenuItem
                        key={index}
                        classes={{
                          root: clsx(classes.rootMenuItemChooseTour),
                        }}
                        onClick={() => onChangeChooseTour(item)}
                      >
                        <Grid
                          className={clsx(classes.menuItemFlex, {
                            [classes.listFlexChecked]: tourSelected.includes(
                              item?.id
                            ),
                          })}
                        >
                          <Grid>
                            <InputCheckbox
                              checked={tourSelected.includes(item?.id)}
                              classes={{ root: classes.rootMenuCheckbox }}
                            />
                          </Grid>
                          <Grid item className={classes.listTextLeft}>
                            <p>{item.title}</p>
                          </Grid>
                        </Grid>
                      </MenuItem>
                    ))}
                  </Grid>
                  <Grid className={classes.menuChooseTourAction}>
                    <Button
                      btnType={BtnType.Outlined}
                      translation-key="common_cancel"
                      onClick={handleCloseMenuChooseTour}
                    >
                      Cancel
                    </Button>
                    <Button
                      btnType={BtnType.Primary}
                      translation-key="common_done"
                      className={classes.btnSave}
                      onClick={onSubmitChooseProjectTour}
                    >
                      Done
                    </Button>
                  </Grid>
                </Menu>
              </Grid>
              <Grid item xs={6}>
                <InputCreatableSelect
                  fullWidth
                  title="Select hotels"
                  name="hotelIds"
                  control={control}
                  selectProps={{
                    options: [],
                    placeholder: "-- Select Hotels --",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputSelect
                  fullWidth
                  title="Discount Type"
                  name="discountType"
                  control={control}
                  selectProps={{
                    options: discountType,
                    placeholder: "-- Discount type --",
                  }}
                  errorMessage={(errors.discountType as any)?.message}
                />
              </Grid>
              {watch("discountType")?.value === EDiscountType.PERCENT && (
                <Grid item xs={12} sm={6}>
                  <InputTextfield
                    title="Max discount"
                    placeholder="Ex: 100 000 VND"
                    autoComplete="off"
                    name="maxDiscount"
                    optional
                    type="number"
                    inputRef={register("maxDiscount")}
                    errorMessage={errors.maxDiscount?.message}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <InputTextfield
                  title="Discount value"
                  placeholder="Enter discount value"
                  autoComplete="off"
                  name="discountValue"
                  type="number"
                  inputRef={register("discountValue")}
                  errorMessage={errors.discountValue?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputTextfield
                  title="Min Order"
                  placeholder="Ex: 3 order"
                  autoComplete="off"
                  name="minOrder"
                  optional
                  type="number"
                  inputRef={register("minOrder")}
                  errorMessage={errors.minOrder?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  className={classes.checkBoxQuantity}
                  control={
                    <Controller
                      name="isQuantityLimit"
                      control={control}
                      render={({ field }) => (
                        <Checkbox checked={field.value} {...field} />
                      )}
                    />
                  }
                  label="Enable Limit Quantity Code"
                />
              </Grid>
              {watch("isQuantityLimit") && (
                <Grid item xs={12} sm={6}>
                  <InputTextfield
                    title="Number of Codes"
                    placeholder="Enter number of code"
                    autoComplete="off"
                    name="code"
                    type="number"
                    inputRef={register("numberOfCodes")}
                    errorMessage={errors.numberOfCodes?.message}
                  />
                </Grid>
              )}
            </Grid>
            <Grid className={classes.footer}>
              <Button
                btnType={BtnType.Primary}
                type="submit"
                className={classes.btnSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
});

export default AddOrEditVoucher;
