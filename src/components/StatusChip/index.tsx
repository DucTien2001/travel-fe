import { Chip, ChipProps } from "@mui/material";
// import { EStatus } from 'models/general';
import { memo } from "react";
import classes from "./styles.module.scss";

interface StatusChipProps extends ChipProps {
  status: boolean;
}

const StatusChip = memo((props: StatusChipProps) => {
  const { status, ...rest } = props;
  const getLabel = () => {
    switch (status) {
      case true:
        return "Active";
      case false:
        return "Inactive";
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
      case true:
        return "success";
      case false:
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
