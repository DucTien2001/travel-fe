import { Chip, ChipProps } from "@mui/material";
// import { EStatus } from 'models/general';
import { memo } from "react";
import classes from "./styles.module.scss";
import { EBillStatus, EPaymentStatus } from "models/general";

interface StatusChipProps extends ChipProps {
  status: number;
  type?: boolean;
}

const StatusChip = memo((props: StatusChipProps) => {
  const { status, type, ...rest } = props;
  const getLabel = () => {
    switch (status) {
      case EPaymentStatus.PAID:
        return "PAID";
      case EPaymentStatus.NOT_PAID:
        return "NOT PAID";
      case EPaymentStatus.CANCEL:
        return "CANCEL";
      case EPaymentStatus.FAILED:
        return "FAILED";
    }
  };

  const getLabelType = () => {
    switch (status) {
      case EBillStatus.RESCHEDULED:
        return "RESCHEDULE";
      case EBillStatus.CANCELED:
        return "CANCELED";
      case EBillStatus.NOT_CONTACTED_YET:
        return "NOT CONTACT YET";
      case EBillStatus.CONTACTED:
        return "CONTACTED";
      case EBillStatus.USED:
        return "USED";
      case EBillStatus.NOT_USE:
        return "NOTE USE";
    }
  };

  const getColor = ():
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning" => {
    switch (status) {
      case EPaymentStatus.PAID:
        return "success";
      case EPaymentStatus.NOT_PAID:
        return "warning";
      case EPaymentStatus.CANCEL:
        return "error";
      case EPaymentStatus.FAILED:
        return "error";
    }
  };

  const getColorType = ():
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning" => {
    switch (status) {
      case EBillStatus.RESCHEDULED:
        return "info";
      case EBillStatus.CANCELED:
        return "error";
      case EBillStatus.NOT_CONTACTED_YET:
        return "warning";
      case EBillStatus.CONTACTED:
        return "success";
      case EBillStatus.USED:
        return "success";
      case EBillStatus.NOT_USE:
        return "error";
    }
  };

  return (
    <Chip
      label={type ? getLabelType() : getLabel()}
      color={type ? getColorType() : getColor()}
      variant="outlined"
      {...rest}
      className={classes.root}
    />
  );
});

export default StatusChip;
