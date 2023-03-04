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
import ReactDatetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

interface Props {
  label?: string;
  labelIcon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrors<any>>;
  name?: string;
  control?: any;
  dateFormat?: string;
  _onChange?: () => void;
  [key: string]: any;
}

// eslint-disable-next-line react/display-name
const CustomDatePicker = memo(
  ({
    label,
    labelIcon,
    className,
    placeholder,
    errorMessage,
    name,
    handleChange,
    _onChange,
    control,
    dateFormat,
    ...rest
  }: Props) => {
    return (
      <FormGroup
        className={clsx(
          classes.root,
          { [classes.danger]: !!errorMessage },
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
                  <div className={classes.form}>
                    <label className={classes.label}>{label} </label>

                    <ReactDatetime
                      {...field}
                      className={classes.datePickerInput}
                      onChange={(date) => {
                        _onChange && _onChange();
                        return field?.onChange(date);
                      }}
                      dateFormat={dateFormat || "D/M/YYYY"}
                      inputProps={{
                        className: "form-control",
                        placeholder: `${placeholder}`,
                      }}
                      {...rest}
                    />
                  </div>
                );
              }}
            />
          </>
        ) : (
          <>
            <label className={classes.label}>
              {labelIcon} {label}
            </label>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon>
            </div>
            <ReactDatetime
              className={classes.datePickerInput}
              inputProps={{
                className: "form-control",
                placeholder: `${placeholder}`,
              }}
              dateFormat="YYYY-MM"
              onChange={(date) => {
                _onChange && _onChange();
              }}
              {...rest}
            />
          </>
        )}
        {errorMessage && (
          <span className="text-danger mt-1 d-block">
            <>{errorMessage}</>
          </span>
        )}
      </FormGroup>
    );
  }
);

export default CustomDatePicker;
