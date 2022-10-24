import { memo } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FormGroup } from "reactstrap";
import { FieldError, FieldErrors, Merge } from "react-hook-form";
import Switch from "react-bootstrap-switch";

interface CustomSwitchProps {
  className?: string;
  inputRef?: any;
  value: boolean;
  onChange: () => void;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrors<any>>;
}

// eslint-disable-next-line react/display-name
const CustomSwitch = memo(
  ({
    className,
    inputRef,
    errorMessage,
    value,
    onChange,
    ...props
  }: CustomSwitchProps) => {
    return (
      <FormGroup
        className={clsx(
          classes.root,
          { "has-danger": !!errorMessage },
          className
        )}
      >
        <Switch
          value={value}
          onChange={onChange}
          {...props}
        />
        {errorMessage && (
          <span className="text-danger ml-2 mt-1 d-block"><>{errorMessage}</></span>
        )}
      </FormGroup>
    );
  }
);

export default CustomSwitch;
