import { memo, useMemo } from "react";
import {
  Modal,
  Row,
  Col,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import classes from "./styles.module.scss";
import moment from "moment";
import clsx from "clsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { TourBill } from "models/tourBill";
import { fCurrency2VND, fPercent } from "utils/formatNumber";
import Button, { BtnType } from "components/common/buttons/Button";
import QRCode from "react-qr-code";
import { EBillStatus, EPaymentStatus } from "models/general";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import { Grid } from "@mui/material";
import { TourBillService } from "services/enterprise/tourBill";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  tourBillId: number;
  fetchData: () => void;
}

interface ChangeStatus {
  status: number;
}

const PopupChangeStatus = memo(
  ({ tourBillId, onClose, isOpen, fetchData }: Props) => {
    const dispatch = useDispatch();

    const schema = useMemo(() => {
      return yup.object().shape({
        status: yup.number().required(""),
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
      setValue,
      clearErrors,
    } = useForm<ChangeStatus>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });

    const _onSubmit = (data: ChangeStatus) => {
      dispatch(setLoading(true));
      TourBillService?.updateStatus(tourBillId, { status: data?.status })
        .then(() => {
          dispatch(setSuccessMess("Change status successfully"));
          fetchData();
          onClose();
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    };

    return (
      <Modal
        isOpen={isOpen}
        toggle={onClose}
        centered
        scrollable
        className={classes.modal}
      >
        <ModalHeader isOpen={isOpen} toggle={onClose} className={classes.title}>
          Change status
        </ModalHeader>
        <Grid component={"form"} onSubmit={handleSubmit(_onSubmit)}>
          <ModalBody>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <>
                  <Grid sx={{ paddingRight: "14px" }}>
                    <InputCheckbox
                      content="Reschedule"
                      checked={field.value === EBillStatus.RESCHEDULED}
                      onChange={() => {
                        setValue("status", EBillStatus.RESCHEDULED);
                      }}
                    />
                  </Grid>
                  <Grid sx={{ paddingRight: "14px" }}>
                    <InputCheckbox
                      content="Canceled"
                      checked={field.value === EBillStatus.CANCELED}
                      onChange={() => {
                        setValue("status", EBillStatus.CANCELED);
                      }}
                    />
                  </Grid>
                  <Grid sx={{ paddingRight: "14px" }}>
                    <InputCheckbox
                      content="Not contact yet"
                      checked={field.value === EBillStatus.NOT_CONTACTED_YET}
                      onChange={() => {
                        setValue("status", EBillStatus.NOT_CONTACTED_YET);
                      }}
                    />
                  </Grid>
                  <Grid sx={{ paddingRight: "14px" }}>
                    <InputCheckbox
                      content="Contacted"
                      checked={field.value === EBillStatus.CONTACTED}
                      onChange={() => {
                        setValue("status", EBillStatus.CONTACTED);
                      }}
                    />
                  </Grid>
                  <Grid sx={{ paddingRight: "14px" }}>
                    <InputCheckbox
                      content="Used"
                      checked={field.value === EBillStatus.USED}
                      onChange={() => {
                        setValue("status", EBillStatus.USED);
                      }}
                    />
                  </Grid>
                  <Grid sx={{ paddingRight: "14px" }}>
                    <InputCheckbox
                      content="Not use"
                      checked={field.value === EBillStatus.NOT_USE}
                      onChange={() => {
                        setValue("status", EBillStatus.NOT_USE);
                      }}
                    />
                  </Grid>
                </>
              )}
            />
          </ModalBody>
          <ModalFooter className={classes.btn}>
            <Button
              onClick={onClose}
              btnType={BtnType.Secondary}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button btnType={BtnType.Primary} type="submit">
              Change status
            </Button>
          </ModalFooter>
        </Grid>
      </Modal>
    );
  }
);

export default PopupChangeStatus;
