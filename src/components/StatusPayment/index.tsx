import { Chip, ChipProps } from "@mui/material";
// import { EStatus } from 'models/general';
import { memo } from "react";
import classes from "./styles.module.scss";
import { EPaymentStatus } from "models/general";

interface StatusChipProps extends ChipProps {
  status: number;
}

const StatusChip = memo((props: StatusChipProps) => {
  const { status, ...rest } = props;
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

  return (
    <Chip
      label={getLabel()}
      color={getColor()}
      variant="outlined"
      {...rest}
      className={classes.root}
    />
  );
});

export default StatusChip;
