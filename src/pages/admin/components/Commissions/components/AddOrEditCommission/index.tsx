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
import { DeleteOutlineOutlined, Grid3x3 } from "@mui/icons-material";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import moment from "moment";
import InputTextfield from "components/common/inputs/InputTextfield";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import InputSelect from "components/common/inputs/InputSelect";
import {
  EServicePolicyType,
  EServiceType,
  OptionItem,
  policyType,
  serviceType,
} from "models/general";
import { ReducerType } from "redux/reducers";
import { PolicyService } from "services/enterprise/policy";
import { getPolicyType, getServiceType } from "utils/getOption";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { useRouter } from "next/router";
import { Container } from "reactstrap";
import clsx from "clsx";
import { CommissionService } from "services/admin/commission";
import { Commission } from "models/admin/commission";
// import { getPolicyType } from "utils/getOption";

export interface CommissionForm {
  serviceType: { id: number; name: string; value: number };
  minPrice: number;
  maxPrice: number;
  rate: number;
}

interface Props {
  commissionId?: number;
}

// eslint-disable-next-line react/display-name
const AddOrEditCommission = memo((props: Props) => {
  const { commissionId } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const [commission, setCommission] = useState<Commission>(null);

  const schema = useMemo(() => {
    return yup.object().shape({
      policy: yup.array(
        yup.object({
          serviceType: yup
            .object()
            .shape({
              id: yup.number().required("Service type is required"),
              name: yup.string().required("Service type is required"),
              value: yup.number().required("Service type is required"),
            })
            .required("Policy type is required"),
          minPrice: yup
            .number()
            .typeError("Min price is required")
            .positive("Min price must be a positive number")
            .required("Min price is required"),
          maxPrice: yup
            .number()
            .integer()
            .typeError("Max price is required.")
            .positive("Max price  must be a positive number")
            .min(yup.ref("minPrice"), "Max price must be rather than min price")
            .required("Max price  is required"),
          rate: yup
            .number()
            .integer()
            .typeError("Service type is required")
            .required("Rate is required"),
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
  } = useForm<CommissionForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      serviceType: serviceType[0],
    },
  });

  const clearForm = () => {
    reset({
      serviceType: serviceType[0],
      maxPrice: null,
      minPrice: null,
      rate: null,
    });
  };

  const _onSubmit = (data: CommissionForm) => {
    dispatch(setLoading(true));
    if (commission) {
      CommissionService.update(commission?.id, {
        minPrice: data?.minPrice,
        maxPrice: data?.maxPrice,
        rate: data?.rate,
      })
        .then(() => {
          dispatch(setSuccessMess("Update commission successfully"));
          router.push("/admin/commissions");
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      CommissionService.create({
        minPrice: data?.minPrice,
        maxPrice: data?.maxPrice,
        rate: data?.rate,
        serviceType: data?.serviceType.value,
      })
        .then(() => {
          dispatch(setSuccessMess("Create commission successfully"));
          router.push("/admin/commissions");
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  const onBack = () => {
    router.push("/admin/commissions");
    clearForm();
  };

  useEffect(() => {
    if (commissionId) {
      dispatch(setLoading(true));
      CommissionService.findOne(commissionId)
        .then((res) => {
          setCommission(res?.data);
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [commissionId]);

  useEffect(() => {
    reset({
      minPrice: commission?.minPrice,
      maxPrice: commission?.maxPrice,
      rate: commission?.rate,
      serviceType: getServiceType(commission?.serviceType),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commission]);

  return (
    <Grid className={classes.root}>
      <Container className={clsx(classes.rowHeaderBox, classes.title)}>
        {!commissionId ? <h3>Create commission</h3> : <h3>Edit commission</h3>}
        <Button onClick={onBack} btnType={BtnType.Primary}>
          Back
        </Button>
      </Container>
      <Container>
        <Grid component="form" onSubmit={handleSubmit(_onSubmit)}>
          <Grid sx={{ paddingTop: "32px" }}>
            <Grid
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              container
            >
              <Grid item xs={6}>
                <InputTextfield
                  title="Min price"
                  placeholder="Ex: 1,000,000"
                  autoComplete="off"
                  type="float"
                  inputRef={register("minPrice")}
                  errorMessage={errors.minPrice?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextfield
                  title="Money rate"
                  placeholder="Ex: 3,000,000"
                  autoComplete="off"
                  type="float"
                  inputRef={register("maxPrice")}
                  errorMessage={errors.maxPrice?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <InputTextfield
                  title="Rate"
                  placeholder="0.10"
                  autoComplete="off"
                  type="float"
                  inputRef={register("rate")}
                  errorMessage={errors.rate?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <InputSelect
                  fullWidth
                  title={"Service type"}
                  name={`serviceType`}
                  control={control}
                  selectProps={{
                    options: serviceType,
                    placeholder: "-- Service type --",
                  }}
                  errorMessage={errors.serviceType?.message}
                />
              </Grid>
            </Grid>
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
    </Grid>
  );
});

export default AddOrEditCommission;
