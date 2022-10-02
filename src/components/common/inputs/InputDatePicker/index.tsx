import clsx from "clsx";
import React, { memo } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  FieldValues,
  Merge,
} from "react-hook-form";
import { FormGroup } from "reactstrap";
import classes from "./styles.module.scss";
import DatePicker from "react-datepicker";

interface Props {
  label?: string;
  className?: string;
  placeholder?: string;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrors<any>>;
  name: string;
  control?: any;
  [key: string]: any;
}

// eslint-disable-next-line react/display-name
const CustomDatePicker = memo(
  ({ label, className, placeholder, errorMessage, name, handleChange, control, ...rest }: Props) => {
    return (
      <FormGroup
        className={clsx(
          classes.root,
          { "has-danger": !!errorMessage },
          className
        )}
      >
        {control ? (
          <>
            <Controller
              name={name}
              control={control}
              render={({ field }) => {
                return (
                <>
                  <label className={classes.label}>{label}</label>
                  <DatePicker
                    {...field}
                    className={classes.datePickerInput}
                    placeholderText={placeholder}
                    selected={field?.value}
                    onChange={(date) => field?.onChange(date)}
                    autoComplete="off"
                    fixedHeight
                    popperProps={{ strategy: "fixed" }}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    {...rest}
                  />
                </>
                );
              }}
            />
          </>
        ) : (
          <>
            <label className={classes.label}>{label}</label>
            <DatePicker
              className={classes.datePickerInput}
              placeholderText={placeholder}
              autoComplete="off"
              fixedHeight
              showYearDropdown
              scrollableYearDropdown
              {...rest}
            />
          </>
        )}
        {errorMessage && (
          <span className="text-danger ml-2 mt-1 d-block"><>{errorMessage}</></span>
        )}
      </FormGroup>
    );
  }
);

export default CustomDatePicker;
